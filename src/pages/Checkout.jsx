import React, { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {Link, useNavigate} from "react-router-dom";
import {server} from "../Server.js";
import {assetServer} from "../assetServer.js";

const stripePromise = loadStripe('pk_test_51K4bVzCT7v0Ax3ZCQUKpDk4gTPZ6UuWcJlMpNULOujrGRhsEL4IPAdeZ7KwDXIFEcJ5sLTxm3r2DMCUaQYWbLl2W00W13HDVPl');

export default function Checkout() {
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [newAddress, setNewAddress] = useState({ country: 'USA', address: '', street: '', city: '', state: '', zip_code: '' });
    const [sameAsBilling, setSameAsBilling] = useState(true);
    const [billingAddress, setBillingAddress] = useState(null);
    // const [selectedCountry, setSelectedCountry] = useState('');
    const [country, setCountry] = useState('');
    const [tip, setTip] = useState(0);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState({ code: '', amount: 0 });
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((total, product) => total + parseFloat(product.price) * product.quantity, 0).toFixed(2);
    const taxes = (subtotal * 0.05).toFixed(2);
    const shipping = 4.99;
    const total = cartItems.length > 0
        ? (parseFloat(subtotal) + parseFloat(taxes) + shipping + parseFloat(tip) - discount.amount).toFixed(2)
        : '0.00';

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'false') {
            navigate('/login');
            toast.warning('You need to login to access the page');
        }
    }, []);


    // Update cart items in real-time
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
    }, []);

    const handleRemoveFromCart = (productId) => {
        // Update cartItems state by filtering out the product with the matching ID
        const updatedCartItems = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCartItems);

        // Update localStorage with the new cartItems array
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get(`${server}/address/${user.id}`);
                setAddresses(response.data.address);
                const defaultAddr = response.data.address.find(addr => addr.is_default === 1);
                setSelectedAddress(defaultAddr);
            } catch (error) {
                console.error('Failed to fetch addresses:', error);
                toast.error('Failed to load addresses. Please try again.');
            }
        };
        fetchAddresses();
    }, [user.id]);

    const handleAddressSelect = (address) => {
        setSelectedAddress(address);
        if (sameAsBilling) {
            setBillingAddress(address);
        }
    };

    const handleAddAddress = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${server}/address/${user.id}`, newAddress);
            setAddresses([...addresses, response.data]);
            setSelectedAddress(response.data);
            setShowAddressForm(false);
            toast.success('Address added successfully!');
            window.location.reload();
            // setNewAddress({ country: 'USA', address: '', street: '', city: '', state: '', zip_code: '' });

        } catch (error) {
            console.error('Failed to add address:', error);
            toast.error('Failed to add address. Please try again.');
        }
    };

    const handleTipChange = (event) => {
        const tipAmount = parseFloat(event.target.value) || 0;
        setTip(tipAmount);
    };

    const applyCoupon = async (couponCode, cartItems, userId) => {
        try {
            // Call external API to get coupon details
            const response = await axios.get(`${server}/users/coupons/${couponCode}`);
            const couponData = response.data;

            if (!couponData) {
                toast.error('Not a valid coupon');
                return { isValid: false, discount: 0 };
            }

            const currentDate = new Date();
            const startDate = new Date(couponData.start_date);
            const endDate = new Date(couponData.end_date);

            // Check if the coupon is within the valid date range
            if (currentDate < startDate || currentDate > endDate) {
                toast.error('Coupon is not valid at this time');
                return { isValid: false, discount: 0 };
            }

            // Check if the coupon has expired based on quantity
            if (couponData.quantity === 0) {
                toast.error('Coupon has expired');
                return { isValid: false, discount: 0 };
            }

            // Check if the coupon is active
            if (couponData.status !== 'active') {
                toast.error('Coupon has expired');
                return { isValid: false, discount: 0 };
            }

            // Check customer limit
            if (couponData.customer_limit && couponData.users.length >= couponData.customer_limit) {
                if (couponData.users.includes(userId)) {
                    toast.error('You have already used this coupon');
                    return { isValid: false, discount: 0 };
                }
                toast.error('Coupon usage limit has been reached');
                return { isValid: false, discount: 0 };
            }

            // Calculate discount
            let totalDiscount = 0;
            cartItems.forEach(item => {
                if (couponData.vendor_id === null || item.vendor_id === couponData.vendor_id) {
                    let itemDiscount = 0;
                    if (couponData.discount_type === 'percentage') {
                        itemDiscount = item.price * (couponData.discount / 100);
                    } else if (couponData.discount_type === 'fixed') {
                        itemDiscount = couponData.discount;
                    }
                    totalDiscount += itemDiscount * item.quantity;
                }
            });

            return { isValid: true, discount: totalDiscount };
        } catch (error) {
            console.error('Error applying coupon:', error);
            toast.error('Error applying coupon. Please try again.');
            return { isValid: false, discount: 0 };
        }
    };

    const handleCouponSubmit = async (event) => {
        event.preventDefault();
        if (!selectedAddress) {
            toast.error('Please select a shipping address before proceeding to payment.');
            return;
        }
        try {
            const result = await applyCoupon(couponCode, cartItems, user.id);
            if (result.isValid) {
                setDiscount({ code: couponCode, amount: result.discount });

                // Send POST request to reduce coupon quantity
                try {
                    const response = await axios.post(`${server}/users/coupons/${couponCode}/reduce/${user.id}`);

                    if (response.status === 200) {
                        toast.success('Coupon applied successfully!');
                    } else {
                        toast.warning('Coupon applied, but there was an issue updating its usage.');
                    }
                } catch (reductionError) {
                    console.error('Failed to reduce coupon quantity:', reductionError);
                    if (reductionError.response && reductionError.response.status === 400) {
                        toast.error('Coupon has expired.');
                    } else if (reductionError.response && reductionError.response.status === 404) {
                        toast.error('Coupon not found.');
                    } else {
                        toast.warning('Coupon applied, but there was an issue updating its usage.');
                    }
                }
            }
        } catch (error) {
            console.error('Failed to apply coupon:', error);
            toast.error('Failed to apply coupon. Please try again.');
        }
    };

    const handleCheckout = async (event) => {
        event.preventDefault();
        try {
            const productDetails = cartItems.map((item) => ({
                name: item.product_name,
                totalPrice: item.price,
                quantity: item.quantity,
            }));

            const stripe = await stripePromise;

            const response = await axios.post(`${server}/create-checkout-session`, {
                productDetails,
                user_id: user.id,
                tip: parseFloat(tip).toFixed(2),
                discount: parseFloat(discount.amount).toFixed(2),
                discountCode: discount.code,
                taxes: parseFloat(taxes).toFixed(2),
                shipping_address: selectedAddress,
            });

            const { id: sessionId } = response.data;

            if (sessionId) {
                const result = await stripe.redirectToCheckout({
                    sessionId,
                });
                if (result.error) {
                    toast.error(result.error.message);
                }
            } else {
                toast.error('Failed to create a checkout session.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            toast.error('An error occurred during the payment process.');
        }
    };


    return (
        <>
            <Header />
            <main className="lg:flex lg:min-h-full lg:flex-row-reverse lg:overflow-hidden">

                <h1 className="sr-only">Checkout</h1>

                {/* Mobile order summary */}
                <section aria-labelledby="order-heading" className="bg-gray-50 px-4 py-6 sm:px-6 lg:hidden">
                    <Disclosure as="div" className="mx-auto max-w-lg">
                        {({open}) => (
                            <>
                                <div className="flex items-center justify-between">
                                    <h2 id="order-heading" className="text-lg font-medium text-gray-900">
                                        Your Order
                                    </h2>
                                    <Disclosure.Button className="font-medium text-primary hover:text-secondary">
                                        {open ? <span>Hide full summary</span> : <span>Show full summary</span>}
                                    </Disclosure.Button>
                                </div>

                                <Disclosure.Panel>
                                    <ul role="list" className="divide-y divide-gray-200 border-b border-gray-200">
                                        {cartItems.map((product) => (
                                            <li key={product.id} className="flex space-x-6 py-6">
                                                <img
                                                    src={`${assetServer}/images/products/${product.image}`}
                                                    alt={product.product_name}
                                                    className="h-40 w-40 flex-none rounded-md bg-gray-200 object-cover object-center"
                                                />
                                                <div className="flex flex-col justify-between space-y-4">
                                                    <div className="space-y-1 text-sm font-medium">
                                                        <h3 className="text-gray-900 font-semibold">{product.product_name}</h3>
                                                        <p className="text-primary">${product.price}</p>
                                                        <p className="text-gray-500">{product.color}</p>
                                                        <p className="text-gray-500">{product.size}</p>
                                                    </div>
                                                    <div className="flex space-x-4">
                                                        <Link to="/cart">
                                                            <button type="button"
                                                                    className="text-sm font-medium text-btnprimary hover:text-primary">
                                                                Edit
                                                            </button>
                                                        </Link>
                                                        <div className="flex border-l border-gray-300 pl-4">

                                                            <button
                                                                type="button"
                                                                className="text-sm font-medium text-btnprimary hover:text-primary"
                                                                onClick={() => handleRemoveFromCart(product.id)} // Add onClick handler
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <form className="mt-10">
                                        <label htmlFor="discount-code-mobile"
                                               className="block text-sm font-medium text-gray-700">
                                            Discount code
                                        </label>
                                        <div className="mt-1 flex space-x-4">
                                            <input
                                                type="text"
                                                id="discount-code-mobile"
                                                name="discount-code-mobile"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                            />
                                            <button
                                                type="submit"
                                                className="rounded-md bg-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    </form>

                                    <form className="mt-10">
                                        <label htmlFor="tip-mobile"
                                               className="block text-sm font-medium text-gray-700">
                                            Delivery Tip
                                        </label>
                                        <div className="mt-1 flex space-x-4">
                                            <input
                                                type="text"
                                                id="tip-code-mobile"
                                                name="tip"
                                                value={tip}
                                                onChange={handleTipChange}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                            />
                                            <button
                                                type="submit"
                                                className="rounded-md bg-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </form>

                                    <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
                                        <div className="flex justify-between">
                                            <dt>Subtotal</dt>
                                            <dd className="text-gray-900">${subtotal}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="flex">
                                                Discount
                                                <span
                                                    className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">
                                                  {discount.code}
                                                </span>
                                            </dt>
                                            <dd className="text-gray-900">-{discount.amount}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt>Taxes</dt>
                                            <dd className="text-gray-900">${taxes}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt>Shipping</dt>
                                            <dd className="text-gray-900">{cartItems.length > 0 ? '$' + shipping : '$0.00'}</dd>
                                        </div>
                                    </dl>
                                </Disclosure.Panel>

                                <p className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6 text-sm font-medium text-gray-900">
                                    <span className="text-base">Total</span>
                                    <span className="text-base">${total}</span>
                                </p>
                            </>
                        )}
                    </Disclosure>
                </section>

                {/* Order summary */}
                <section aria-labelledby="summary-heading"
                         className="hidden w-full max-w-xl flex-col bg-gray-50 lg:flex overflow-hidden">
                    <h2 id="summary-heading" className="sr-only">
                        Order summary
                    </h2>

                    <ul role="list" className="flex-auto divide-y divide-gray-200 overflow-y-auto px-6">
                        {cartItems.map((product) => (
                            <li key={product.id} className="flex space-x-6 py-6">
                                <img
                                    src={`${assetServer}/images/products/${product.image}`}
                                    alt={product.name}
                                    className="h-40 w-40 flex-none rounded-md bg-gray-200 object-cover object-center"
                                />
                                <div className="flex flex-col justify-between space-y-4">
                                    <div className="space-y-1 ">
                                        <h3 className="text-gray-900 text-lg font-bold">{product.product_name}</h3>
                                        <p className="text-gray-900 text-sm font-medium">Price: ${product.price}</p>
                                        <p className="text-gray-500">Quantity: {product.quantity}</p>
                                        <p className="text-gray-500">{product.size}</p>
                                    </div>
                                    <div className="flex space-x-4">
                                        <Link to="/cart">
                                            <button type="button"
                                                    className="text-sm font-medium text-btnprimary hover:text-primary">
                                                Edit
                                            </button>
                                        </Link>
                                        <div className="flex border-l border-gray-300 pl-4">
                                            <button
                                                type="button"
                                                className="text-sm font-medium text-btnprimary hover:text-primary"
                                                onClick={() => handleRemoveFromCart(product.id)} // Add onClick handler
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="sticky bottom-0 flex-none border-t border-gray-200 bg-gray-50 p-6">
                        <form onSubmit={handleCouponSubmit}>
                            <label htmlFor="discount-code" className="block text-sm font-medium text-gray-700">
                                Discount code
                            </label>
                            <div className="mt-1 flex space-x-4">
                                <input
                                    type="text"
                                    id="discount-code"
                                    name="discount-code"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                />
                                <button
                                    type="submit"
                                    className="rounded-md bg-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50"
                                >
                                    Apply
                                </button>
                            </div>
                        </form>

                        <form>
                            <label htmlFor="tip" className="block text-sm font-medium text-gray-700 mt-5">
                                Delivery Tip
                            </label>
                            <div className="mt-1 flex space-x-4">
                                <input
                                    type="number"
                                    id="tip"
                                    name="tip"
                                    value={tip}
                                    onChange={handleTipChange}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                />
                            </div>
                        </form>

                        <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
                            <div className="flex justify-between">
                                <dt>Subtotal</dt>
                                <dd className="text-gray-900">${subtotal}</dd>
                            </div>
                            {discount.amount > 0 && (
                                <div className="flex justify-between">
                                    <dt className="flex">
                                        Discount
                                        <span
                                            className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">
                                        {discount.code}
                                    </span>
                                    </dt>
                                    <dd className="text-gray-900">-${discount.amount.toFixed(2)}</dd>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <dt>Taxes</dt>
                                <dd className="text-gray-900">${taxes}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt>Shipping</dt>
                                <dd className="text-gray-900">{cartItems.length > 0 ? '$' + shipping : '$0.00'}</dd>
                            </div>
                            <div className="flex justify-between">
                            <dt>Tip</dt>
                                <dd className="text-gray-900">${tip.toFixed(2)}</dd>
                            </div>
                            <div
                                className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                                <dt className="text-base">Total</dt>
                                <dd className="text-base">${total}</dd>
                            </div>
                        </dl>

                    </div>
                </section>


                {/* Checkout form */}
                <section aria-labelledby="payment-heading"
                         className="flex-auto overflow-y-auto px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 ">
                    <div className="mx-auto max-w-lg">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h2>

                        {addresses.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {addresses.map((address) => (
                                    <div
                                        key={address.id}
                                        className={`border p-4 rounded-md cursor-pointer ${selectedAddress?.id === address.id ? 'border-blue-500' : 'border-gray-300'}`}
                                        onClick={() => handleAddressSelect(address)}
                                    >
                                        <p>{address.address}, {address.street}</p>
                                        <p>{address.city}, {address.state} {address.zip_code}</p>
                                        <p>{address.country}</p>
                                        {address.is_default === 1 &&
                                            <span className="text-sm text-primary">Main Address</span>}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No addresses found.</p>
                        )}

                        <button
                            className="mt-4 text-primary hover:text-secondary"
                            onClick={() => setShowAddressForm(!showAddressForm)}
                        >
                            {showAddressForm ? 'Cancel' : 'Add New Address'}
                        </button>

                        {showAddressForm && (
                            <form onSubmit={handleAddAddress} className="mt-4 space-y-4">
                                {/*<select*/}
                                {/*    value={selectedCountry}*/}
                                {/*    onChange={(e) => setSelectedCountry(e.target.value)}*/}
                                {/*    className="w-full p-2 border rounded"*/}
                                {/*    required*/}
                                {/*>*/}
                                {/*    <option value="">Select Country</option>*/}
                                {/*    <option value="USA">United States</option>*/}
                                {/*    <option value="Canada">Canada</option>*/}
                                {/*</select>*/}
                                <input
                                    id="country"
                                    name="country"
                                    type="text"
                                    value="USA"
                                    readOnly
                                    className="w-full p-2 border rounded bg-gray-100"
                                />

                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    value={newAddress.address}
                                    onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="street"
                                    placeholder="Street"
                                    value={newAddress.street}
                                    onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={newAddress.city}
                                    onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    value={newAddress.state}
                                    onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="zip_code"
                                    placeholder="Zip Code"
                                    value={newAddress.zip_code}
                                    onChange={(e) => setNewAddress({...newAddress, zip_code: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                <button type="submit"
                                        className="w-full bg-btnprimary text-white p-2 rounded hover:bg-secondary">
                                    Add Address
                                </button>
                            </form>
                        )}

                        <div className="mt-6 flex items-center">
                            <input
                                id="same-as-shipping"
                                name="same-as-shipping"
                                type="checkbox"
                                checked={sameAsBilling}
                                onChange={() => setSameAsBilling(!sameAsBilling)}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-blue-500"
                            />
                            <label htmlFor="same-as-shipping" className="ml-2 text-sm text-gray-900">
                                Billing address is the same as shipping address
                            </label>
                        </div>

                        {!sameAsBilling && (
                            <div className="mt-4">
                                {/* Add billing address selection/form here */}
                                <form className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-900">Billing Address</h3>

                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            // value={billingAddress.fullName}
                                            // onChange={handleChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            // value={billingAddress.address}
                                            // onChange={handleChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            // value={billingAddress.city}
                                            // onChange={handleChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            id="state"
                                            name="state"
                                            // value={billingAddress.state}
                                            // onChange={handleChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                                            ZIP Code
                                        </label>
                                        <input
                                            type="text"
                                            id="zipCode"
                                            name="zipCode"
                                            // value={billingAddress.zipCode}
                                            // onChange={handleChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            id="country"
                                            name="country"
                                            value="USA"
                                            readOnly
                                            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    {/*<button*/}
                                    {/*    type="submit"*/}
                                    {/*    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"*/}
                                    {/*>*/}
                                    {/*    Save Billing Address*/}
                                    {/*</button>*/}
                                </form>
                            </div>
                        )}

                        <button
                            onClick={handleCheckout}
                            disabled={!selectedAddress}
                            className={`mt-6 w-full rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                selectedAddress
                                    ? 'bg-btnprimary hover:bg-secondary'
                                    : 'bg-gray-300 cursor-not-allowed'
                            }`}
                        >
                            {selectedAddress ? `Proceed to Payment of  $${total}` : 'Select an address to proceed'}
                        </button>
                    </div>
                </section>
            </main>

            <Footer/>
        </>
    )
}
