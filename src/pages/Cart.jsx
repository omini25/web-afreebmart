import Header from "../components/Header.jsx";
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useState, useEffect } from 'react'; // Import useState and useEffect
import { useShoppingHooks } from '../redux/useShoppingHooks'; // Import useShoppingHooks

export default function Cart() {
    const navigate = useNavigate(); // Initialize useNavigate
    const { removeProductFromCart } = useShoppingHooks(); // Get removeProductFromCart from useShoppingHooks

    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || []); // Get cart items from localStorage
    const [orderSummary, setOrderSummary] = useState(JSON.parse(localStorage.getItem('orderSummary')) || {}); // Get order summary from localStorage

    const handleCheckout = () => {
        // Pass cartItems and orderSummary to the checkout page
        navigate('/checkout', { state: { cartItems, orderSummary } });
    };

    // Calculate the total price, tax estimate, and total order amount
    const [totalPrice, setTotalPrice] = useState(0);
    const [taxEstimate, setTaxEstimate] = useState(0);
    const [totalOrderAmount, setTotalOrderAmount] = useState(0);

    // Function to handle quantity change
    const handleQuantityChange = (productIdx, newQuantity) => {
        // Update the cart items in state
        const updatedCartItems = [...cartItems];
        updatedCartItems[productIdx].quantity = newQuantity;
        setCartItems(updatedCartItems);

        // Update the cart in localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };

    // Function to handle product removal
    const handleRemoveProduct = (productId) => {
        removeProductFromCart(productId); // Call the redux action to remove from cart
        // Update cartItems in state by finding the index of the product to remove
        const updatedCartItems = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCartItems);
    };

    console.log(cartItems);

    // Update total price, tax estimate, and total order amount in real-time
    useEffect(() => {
        const calculateTotals = () => {
            const newTotalPrice = cartItems.reduce((total, product) => {
                return total + parseFloat(product.price.replace('$', '')) * product.quantity;
            }, 0);
            const newTaxEstimate = (newTotalPrice * 0.05).toFixed(2);
            const newTotalOrderAmount = newTotalPrice + parseFloat(newTaxEstimate) + 5.99;

            setTotalPrice(newTotalPrice);
            setTaxEstimate(newTaxEstimate);
            setTotalOrderAmount(newTotalOrderAmount);
        };

        calculateTotals();
    }, [cartItems]); // Re-calculate when cartItems changes

    return (
        <>
            <Header/>

            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
                    <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                        <section aria-labelledby="cart-heading" className="lg:col-span-7">
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>

                            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                                {cartItems.map((product, productIdx) => (
                                    <li key={product.id} className="flex py-6 sm:py-10">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-sm">
                                                            <a href={product.href}
                                                               className="font-medium text-gray-700 hover:text-gray-800">
                                                                {product.name}
                                                            </a>
                                                        </h3>
                                                    </div>
                                                    <div className="mt-1 flex text-sm">
                                                        <p className="text-gray-500">{product.color}</p>
                                                        {product.size ? (
                                                            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{product.size}</p>
                                                        ) : null}
                                                    </div>
                                                    <p className="mt-1 text-sm font-medium text-gray-900">${product.price}</p>
                                                </div>

                                                <div className="mt-4 sm:mt-0 sm:pr-9">
                                                    <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                                                        Quantity, {product.name}
                                                    </label>
                                                    <div className="flex items-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleQuantityChange(productIdx, product.quantity - 1)}
                                                            disabled={product.quantity <= 1}
                                                            className="bg-gray-200 px-2 py-1 rounded-l-md"
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="number"
                                                            id={`quantity-${productIdx}`}
                                                            name={`quantity-${productIdx}`}
                                                            value={product.quantity}
                                                            onChange={(e) => handleQuantityChange(productIdx, parseInt(e.target.value, 10))}
                                                            min="1"
                                                            className="w-16 text-center border border-gray-300 rounded-md px-2 py-1"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => handleQuantityChange(productIdx, product.quantity + 1)}
                                                            className="bg-gray-200 px-2 py-1 rounded-r-md"
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    <div className="absolute right-0 top-0">
                                                        <button type="button"
                                                                onClick={() => handleRemoveProduct(product.id)} // Call handleRemoveProduct on click
                                                                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                                                            <span className="sr-only">Remove</span>
                                                            <XMarkIcon className="h-5 w-5" aria-hidden="true"/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                                                {product.inStock ? (
                                                    <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500"
                                                               aria-hidden="true"/>
                                                ) : (
                                                    <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300"
                                                               aria-hidden="true"/>
                                                )}

                                                <span>{product.inStock ? 'In stock' : `Ships in ${product.leadTime}`}</span>
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Order summary */}
                        <section
                            aria-labelledby="summary-heading"
                            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                        >
                            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                                Order summary
                            </h2>

                            <dl className="mt-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm text-gray-600">Subtotal</dt>
                                    <dd className="text-sm font-medium text-gray-900">${totalPrice.toFixed(2)}</dd> {/* Display the calculated total price */}
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <dt className="flex items-center text-sm text-gray-600">
                                        <span>Shipping estimate</span>
                                        <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Learn more about how shipping is calculated</span>
                                            <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true"/>
                                        </a>
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900">$5.99</dd>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <dt className="flex text-sm text-gray-600">
                                        <span>Tax estimate</span>
                                        <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Learn more about how tax is calculated</span>
                                            <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true"/>
                                        </a>
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900">${taxEstimate}</dd> {/* Display the calculated tax estimate */}
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <dt className="text-base font-medium text-gray-900">Order total</dt>
                                    <dd className="text-base font-medium text-gray-900">${totalOrderAmount.toFixed(2)}</dd> {/* Display the calculated total order amount */}
                                </div>
                            </dl>

                            <div className="mt-6">
                                <button
                                    type="button" // Change to button type
                                    onClick={handleCheckout} // Add onClick handler
                                    className="w-full rounded-md border border-transparent bg-primary px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                >
                                    Proceed To Checkout
                                </button>
                            </div>
                        </section>
                    </form>
                </div>
            </div>

        </>
    )
}