import {Fragment, useEffect, useState} from 'react'
import {
    ChatBubbleBottomCenterIcon,
    CreditCardIcon,
    CubeIcon,
    MapPinIcon, RectangleGroupIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline'
import Header from "../../components/Header.jsx";
import {server} from "../../Server.js";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {assetServer} from "../../assetServer.js";
import {toast} from "react-toastify";


const secondaryNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: UserCircleIcon, current: false },
    { name: 'Orders', href: '/orders', icon: CubeIcon, current: true },
    { name: 'Group Orders', href: '/group-orders', icon: RectangleGroupIcon, current: false },
    { name: 'Messages', href: '/messages', icon: ChatBubbleBottomCenterIcon, current: false },
    { name: 'Payments', href: '/payments', icon: CreditCardIcon, current: false },
    { name: 'Addresses', href: '/address', icon: MapPinIcon, current: false },
    { name: 'Account', href: '/account', icon: UserCircleIcon, current: false },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function OrderDetails( ) { // Accept orderId as a prop
    const [orderDetails, setOrderDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {orderId} = useParams(); // Access the orderId from the URL params
    const navigate = useNavigate();

    useEffect(() => {
        // Check if localStorage.isLoggedIn is true
        if (localStorage.getItem('isLoggedIn') === 'false') {
            // Redirect to /dashboard
            navigate('/login');
            // Show a toast notification
            toast.warning('You need to login to access the page');
        }
    }, []);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`${server}/orders/${orderId}`);
                setOrderDetails(response.data.order);
            } catch (error) {
                console.error('Error fetching order details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    console.log(orderDetails)


    if (isLoading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-pulse rounded-lg bg-gray-200 p-4">
                <div className="h-4 bg-gray-300 rounded-full w-48 mb-4"></div>
                <div className="h-2 bg-gray-300 rounded-full w-32 mb-4"></div>
                <div className="h-2 bg-gray-300 rounded-full w-24 mb-4"></div>
                <div className="h-2 bg-gray-300 rounded-full w-16 mb-4"></div>
            </div>
        </div>
    );

    if (!orderDetails) {
        return <div>Order not found.</div>;
    }


    return (
        <>
            <Header />

            <div className="mx-auto max-w-7xl pt-4 lg:flex lg:gap-x-16 lg:px-8">
                <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
                    <nav className="flex-none px-4 sm:px-6 lg:px-0">
                        <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
                            {secondaryNavigation.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? 'bg-gray-50 text-primary'
                                                : 'text-gray-700 hover:text-primary hover:bg-gray-50',
                                            'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold'
                                        )}
                                    >
                                        <item.icon
                                            className={classNames(
                                                item.current ? 'text-primary' : 'text-gray-400 group-hover:text-primary',
                                                'h-6 w-6 shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">{orderDetails.quantity} {''} {orderDetails.product_name} Order
                        Details</h1>

                    <div className="mt-2 border-b border-gray-200 pb-5 text-sm sm:flex sm:justify-between">
                        <dl className="flex">
                            <dt className="text-gray-500">Order id</dt>
                            <dd className="font-medium text-gray-900">{''}#{orderDetails.id}</dd>
                            <dt>
                                <span className="sr-only">Date</span>
                                <span className="mx-2 text-gray-400" aria-hidden="true">
                                    &middot;
                                </span>
                            </dt>
                            <dd className="font-medium text-gray-900">
                                <time dateTime="2021-03-22">
                                    {new Date(orderDetails.created_at).toLocaleDateString('en-US', {
                                        month: 'numeric',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </time>
                            </dd>
                        </dl>
                        {/*<div className="mt-4 sm:mt-0">*/}
                        {/*    <a href="#" className="font-medium text-primary hover:text-secondary">*/}
                        {/*        View invoice*/}
                        {/*        <span aria-hidden="true"> &rarr;</span>*/}
                        {/*    </a>*/}
                        {/*</div>*/}
                    </div>


                    <section aria-labelledby="products-heading" className="mt-8">
                        <h2 id="products-heading" className="sr-only">
                            Product purchased
                        </h2>

                        <div className="space-y-24">
                            {orderDetails.order_items ? (
                                JSON.parse(orderDetails.order_items).map((item, index) => (
                                    <div key={index}
                                         className="grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-8">
                                        <div className="sm:col-span-4 md:col-span-5 md:row-span-2 md:row-end-2">
                                            <div
                                                className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-50">
                                                <img
                                                    src={`${assetServer}/images/products/${item.image}`}
                                                    alt={item.product_name}
                                                    className="object-cover object-center"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                                            <h3 className="text-lg font-medium text-gray-900">
                                                <a href="#">{item.quantity} {item.product_name}</a>
                                            </h3>
                                            <p className="mt-1 font-medium text-gray-900">${(item.price)}</p>
                                            <p className="mt-3 text-gray-500">{item.description}</p>
                                        </div>
                                        <div className="sm:col-span-12 md:col-span-7">
                                            <dl className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                                                <div>
                                                    <dt className="font-medium text-gray-900">Delivery address</dt>
                                                    <dd className="mt-3 text-gray-500">
                                                        <span className="block">{orderDetails.shipping_address}</span>
                                                    </dd>
                                                </div>
                                                <div>
                                                    <dt className="font-medium text-gray-900">Shipping updates</dt>
                                                    <dd className="mt-3 space-y-3 text-gray-500">
                                                        {/*<p>{orderDetails.email}</p>*/}
                                                        <p>{orderDetails.user_phone}</p>
                                                        {/*<button type="button"*/}
                                                        {/*        className="font-medium text-primary hover:text-secondary">*/}
                                                        {/*    Edit*/}
                                                        {/*</button>*/}
                                                    </dd>
                                                </div>
                                            </dl>
                                            <p className="mt-6 font-medium text-gray-900 md:mt-10">
                                                Updated on <time dateTime="2021-03-22">
                                                {new Date(orderDetails.updated_at).toLocaleDateString('en-US', {
                                                    month: 'numeric',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                })}
                                            </time>
                                            </p>
                                            <div className="mt-6">
                                                <div className="overflow-hidden rounded-full bg-gray-200">
                                                    <div
                                                        className={`h-2 rounded-full ${
                                                            orderDetails.status === 'Cancelled' ? 'bg-red-500' : 'bg-primary'
                                                        }`}
                                                        style={{
                                                            width:
                                                                orderDetails.status === 'cancelled'
                                                                    ? '100%' // Full width for cancelled
                                                                    : orderDetails.status === 'completed'
                                                                        ? '100%' // Full width for delivered
                                                                        : orderDetails.status === 'processing'
                                                                            ? '66.66%' // Approximately 2/3 for shipped
                                                                            :
                                                                            orderDetails.status === 'Awaiting Vendor Processing' ||
                                                                            orderDetails.status === 'pending'
                                                                                ? '33.33%' // Approximately 1/3 for processing stages
                                                                                : '12.5%', // Initial 1/8 width for Order placed
                                                        }}
                                                    />
                                                </div>
                                                <div
                                                    className="mt-6 hidden grid-cols-4 font-medium text-gray-600 sm:grid">
                                                    <div className="text-primary">Order placed</div>
                                                    <div
                                                        className={classNames(
                                                            orderDetails.status === 'Awaiting Vendor Processing' ||
                                                            orderDetails.status === 'pending'
                                                                ? 'text-primary'
                                                                : '',
                                                            'text-center'
                                                        )}
                                                    >
                                                        Processing
                                                    </div>
                                                    <div
                                                        className={classNames(
                                                            orderDetails.status === 'processing' ? 'text-primary' : '',
                                                            'text-center'
                                                        )}
                                                    >
                                                        Shipped
                                                    </div>
                                                    <div
                                                        className={classNames(
                                                            orderDetails.status === 'completed' ? 'text-primary' : '',
                                                            'text-right'
                                                        )}
                                                    >
                                                        Delivered
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                // ... your existing code for single product order ...
                                <div
                                    className="grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
                                >
                                    <div className="sm:col-span-4 md:col-span-5 md:row-span-2 md:row-end-2">
                                        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-50">
                                            <img
                                                src={`${assetServer}/images/products/${orderDetails.image}`}
                                                alt={orderDetails.product_name}
                                                className="object-cover object-center"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                                        <h3 className="text-lg font-medium text-gray-900">
                                            <a href="#">{orderDetails.quantity} {orderDetails.product_name}</a>
                                        </h3>
                                        <p className="mt-1 font-medium text-gray-900">${orderDetails.total_price}</p>
                                        <p className="mt-3 text-gray-500">{orderDetails.description}</p>
                                    </div>
                                    <div className="sm:col-span-12 md:col-span-7">
                                        <dl className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                                            <div>
                                                <dt className="font-medium text-gray-900">Delivery address</dt>
                                                <dd className="mt-3 text-gray-500">
                                                    <span className="block">{orderDetails.shipping_address}</span>
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="font-medium text-gray-900">Shipping updates</dt>
                                                <dd className="mt-3 space-y-3 text-gray-500">
                                                    {/*<p>{orderDetails.email}</p>*/}
                                                    <p>{orderDetails.user_phone}</p>
                                                    {/*<button type="button"*/}
                                                    {/*        className="font-medium text-primary hover:text-secondary">*/}
                                                    {/*    Edit*/}
                                                    {/*</button>*/}
                                                </dd>
                                            </div>
                                        </dl>
                                        <p className="mt-6 font-medium text-gray-900 md:mt-10">
                                            Updated on <time dateTime="2021-03-22">
                                            {new Date(orderDetails.updated_at).toLocaleDateString('en-US', {
                                                month: 'numeric',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </time>
                                        </p>
                                        <div className="mt-6">
                                            <div className="overflow-hidden rounded-full bg-gray-200">
                                                <div
                                                    className={`h-2 rounded-full ${
                                                        orderDetails.status === 'Cancelled' ? 'bg-red-500' : 'bg-primary'
                                                    }`}
                                                    style={{
                                                        width:
                                                            orderDetails.status === 'cancelled'
                                                                ? '100%' // Full width for cancelled
                                                                : orderDetails.status === 'completed'
                                                                    ? '100%' // Full width for delivered
                                                                    : orderDetails.status === 'processing'
                                                                        ? '66.66%' // Approximately 2/3 for shipped
                                                                        :
                                                                        orderDetails.status === 'Awaiting Vendor Processing' ||
                                                                        orderDetails.status === 'pending'
                                                                            ? '33.33%' // Approximately 1/3 for processing stages
                                                                            : '12.5%', // Initial 1/8 width for Order placed
                                                    }}
                                                />
                                            </div>
                                            <div className="mt-6 hidden grid-cols-4 font-medium text-gray-600 sm:grid">
                                                <div className="text-primary">Order placed</div>
                                                <div
                                                    className={classNames(
                                                        orderDetails.status === 'Awaiting Vendor Processing' ||
                                                        orderDetails.status === 'pending'
                                                            ? 'text-primary'
                                                            : '',
                                                        'text-center'
                                                    )}
                                                >
                                                    Processing
                                                </div>
                                                <div
                                                    className={classNames(
                                                        orderDetails.status === 'processing' ? 'text-primary' : '',
                                                        'text-center'
                                                    )}
                                                >
                                                    Shipped
                                                </div>
                                                <div
                                                    className={classNames(
                                                        orderDetails.status === 'completed' ? 'text-primary' : '',
                                                        'text-right'
                                                    )}
                                                >
                                                    Delivered
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                </main>
            </div>
        </>
    )
}
