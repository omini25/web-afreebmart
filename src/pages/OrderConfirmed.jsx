import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import axios from "axios";
import {server} from "../Server.js";
import {assetServer} from "../assetServer.js";
import {toast} from "react-toastify";

export default function OrderConfirmed() {
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('order_id');
    const sessionId = queryParams.get('session_id');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if localStorage.isLoggedIn is true
        if (localStorage.getItem('isLoggedIn') === 'false') {
            // Redirect to /dashboard
            navigate('/login');
            // Show a toast notification
            toast.warning('You need to login to access the page');
        }
    }, [navigate]);

    useEffect(() => {
        if (sessionId) {
            localStorage.removeItem('cart');
            toast.success('Order Successfully Placed'); // Optional: Display a success message
        }
    }, [sessionId, toast]);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`${server}/orders/${orderId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch order details');
                }
                const data = await response.data.order;
                setOrderDetails(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrderDetails();
        }
    }, [orderId]);

    if (loading) {
        return <div className="flex items-center justify-center h-screen">
            <div className="animate-pulse rounded-lg bg-gray-200 p-4">
                <div className="h-4 bg-gray-300 rounded-full w-48 mb-4"></div>
                <div className="h-2 bg-gray-300 rounded-full w-32 mb-4"></div>
                <div className="h-2 bg-gray-300 rounded-full w-24 mb-4"></div>
                <div className="h-2 bg-gray-300 rounded-full w-16 mb-4"></div>
            </div>
        </div>;
    }

    if (error) {
        navigate('/orders');
        return null;
    }

    if (!orderDetails) {
        return <div>No order details found.</div>;
    }

    return (
        <>
            <Header/>
            <main className="bg-white px-4 pb-24 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:py-32">
                <div className="mx-auto max-w-3xl">
                    <div className="max-w-xl">
                        <h1 className="text-base font-medium text-indigo-600">Thank you!</h1>
                        <p className="mt-2 text-4xl font-bold tracking-tight">It's on the way!</p>
                        <p className="mt-2 text-base text-gray-500">Your order #{orderDetails.id} has shipped and will be with you soon.</p>

                        {/*<dl className="mt-12 text-sm font-medium">*/}
                        {/*    <dt className="text-gray-900">Tracking number</dt>*/}
                        {/*    <dd className="mt-2 text-indigo-600">{orderDetails.trackingNumber}</dd>*/}
                        {/*</dl>*/}
                    </div>

                    <section aria-labelledby="order-heading" className="mt-10 border-t border-gray-200">
                        <h2 id="order-heading" className="sr-only">Your order</h2>

                        <h3 className="sr-only">Items</h3>
                        {orderDetails.map((product) => (
                            <div key={product.id} className="flex space-x-6 border-b border-gray-200 py-10">

                                <img  src={`${assetServer}/images/products/${product.image}`}
                                    alt={product.product_name}
                                    className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
                                />
                                <div className="flex flex-auto flex-col">
                                    <div>
                                        <h4 className="font-medium text-gray-900">
                                            <a href={product.href}>{product.product_name}</a>
                                        </h4>
                                        <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                                    </div>
                                    <div className="mt-6 flex flex-1 items-end">
                                        <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                                            <div className="flex">
                                                <dt className="font-medium text-gray-900">Quantity</dt>
                                                <dd className="ml-2 text-gray-700">{product.quantity}</dd>
                                            </div>
                                            <div className="flex pl-4 sm:pl-6">
                                                <dt className="font-medium text-gray-900">Price</dt>
                                                <dd className="ml-2 text-gray-700">${product.totoal_price.toFixed(2)}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/*<div className="sm:ml-40 sm:pl-6">*/}
                        {/*    <h3 className="sr-only">Your information</h3>*/}

                        {/*    <h4 className="sr-only">Addresses</h4>*/}
                        {/*    <dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">*/}
                        {/*        <div>*/}
                        {/*            <dt className="font-medium text-gray-900">Shipping address</dt>*/}
                        {/*            <dd className="mt-2 text-gray-700">*/}
                        {/*                <address className="not-italic">*/}
                        {/*                    <span className="block">{orderDetails.shippingAddress.name}</span>*/}
                        {/*                </address>*/}
                        {/*            </dd>*/}
                        {/*        </div>*/}
                        {/*        <div>*/}
                        {/*            <dt className="font-medium text-gray-900">Billing address</dt>*/}
                        {/*            <dd className="mt-2 text-gray-700">*/}
                        {/*                <address className="not-italic">*/}
                        {/*                    <span className="block">{orderDetails.billingAddress.name}</span>*/}
                        {/*                    <span className="block">{orderDetails.billingAddress.street}</span>*/}
                        {/*                    <span className="block">{orderDetails.billingAddress.city}, {orderDetails.billingAddress.state} {orderDetails.billingAddress.zip}</span>*/}
                        {/*                </address>*/}
                        {/*            </dd>*/}
                        {/*        </div>*/}
                        {/*    </dl>*/}

                        {/*    <h4 className="sr-only">Payment</h4>*/}
                        {/*    <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-10 text-sm">*/}
                        {/*        <div>*/}
                        {/*            <dt className="font-medium text-gray-900">Payment method</dt>*/}
                        {/*            <dd className="mt-2 text-gray-700">*/}
                        {/*                <p>{orderDetails.paymentMethod.type}</p>*/}
                        {/*                <p>{orderDetails.paymentMethod.card}</p>*/}
                        {/*                <p>*/}
                        {/*                    <span aria-hidden="true">••••</span>*/}
                        {/*                    <span className="sr-only">Ending in </span>{orderDetails.paymentMethod.last4}*/}
                        {/*                </p>*/}
                        {/*            </dd>*/}
                        {/*        </div>*/}
                        {/*        <div>*/}
                        {/*            <dt className="font-medium text-gray-900">Shipping method</dt>*/}
                        {/*            <dd className="mt-2 text-gray-700">*/}
                        {/*                <p>{orderDetails.shippingMethod.name}</p>*/}
                        {/*                <p>{orderDetails.shippingMethod.description}</p>*/}
                        {/*            </dd>*/}
                        {/*        </div>*/}
                        {/*    </dl>*/}

                        {/*    <h3 className="sr-only">Summary</h3>*/}

                        {/*    <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">*/}
                        {/*        <div className="flex justify-between">*/}
                        {/*            <dt className="font-medium text-gray-900">Subtotal</dt>*/}
                        {/*            <dd className="text-gray-700">${orderDetails.subtotal.toFixed(2)}</dd>*/}
                        {/*        </div>*/}
                        {/*        /!*{orderDetails.discount && (*!/*/}
                        {/*        /!*    <div className="flex justify-between">*!/*/}
                        {/*        /!*        <dt className="flex font-medium text-gray-900">*!/*/}
                        {/*        /!*            Discount*!/*/}
                        {/*        /!*            <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">*!/*/}
                        {/*        /!*                {orderDetails.discount.code}*!/*/}
                        {/*        /!*            </span>*!/*/}
                        {/*        /!*        </dt>*!/*/}
                        {/*        /!*        <dd className="text-gray-700">-${orderDetails.discount.amount.toFixed(2)} ({orderDetails.discount.percentage}%)</dd>*!/*/}
                        {/*        /!*    </div>*!/*/}
                        {/*        /!*)}*!/*/}
                        {/*        /!*<div className="flex justify-between">*!/*/}
                        {/*        /!*    <dt className="font-medium text-gray-900">Shipping</dt>*!/*/}
                        {/*        /!*    <dd className="text-gray-700">${orderDetails.shippingCost.toFixed(2)}</dd>*!/*/}
                        {/*        /!*</div>*!/*/}
                        {/*        <div className="flex justify-between">*/}
                        {/*            <dt className="font-medium text-gray-900">Total</dt>*/}
                        {/*            <dd className="text-gray-900">${orderDetails.total.toFixed(2)}</dd>*/}
                        {/*        </div>*/}
                        {/*    </dl>*/}
                        {/*</div>*/}
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}