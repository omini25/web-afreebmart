import {Fragment, useEffect, useState} from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
    CreditCardIcon,
    CubeIcon,
    MapPinIcon, RectangleGroupIcon,
    UserCircleIcon,
    EllipsisVerticalIcon
} from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import Header from "../../components/Header.jsx";
import axios from "axios";
import {server} from "../../Server.js";
import {assetServer} from "../../assetServer.js";
import {Link} from "react-router-dom";
import {useShoppingHooks} from "../../redux/useShoppingHooks.js";
import {toast} from "react-toastify";


const secondaryNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: UserCircleIcon, current: false },
    { name: 'Orders', href: '/orders', icon: CubeIcon, current: true },
    { name: 'Group Orders', href: '/group-orders', icon: RectangleGroupIcon, current: false },
    { name: 'Payments', href: '/payments', icon: CreditCardIcon, current: false },
    { name: 'Addresses', href: '/address', icon: MapPinIcon, current: false },
    { name: 'Account', href: '/account', icon: UserCircleIcon, current: false },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const { addProductToCart } = useShoppingHooks();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios(`${server}/order/${user.id}`);
                const data = response.data.orders;
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
            setIsLoading(false);
        };

        fetchOrders();
    }, []);

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

    const handleBuyAgain = async (productName) => {
        try {
            // 1. Fetch product details by name (you'll need an API endpoint for this)
            const response = await axios.get(`${server}/product/${productName}`);
            const product = response.data.product;

            // 2. Add product to cart using the fetched details
            addProductToCart({
                id: product.id,
                name: product.product_name,
                price: product.price,
                quantity: 1,
                image: `${assetServer}/images/products/${product.image}`,
            });

            // 3. Optional: Display a success message to the user
            toast.success(`${product.product_name} added to cart!`);
        } catch (error) {
            console.error('Error adding product to cart:', error);
            // Handle error appropriately (e.g., display an error message to the user)
        }
    };



    return (
        <>
            <Header />


            <div className="mx-auto max-w-7xl pt-4 lg:flex lg:gap-x-16 lg:px-8">
                <aside
                    className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
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

                <main className="py-24">
                    <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
                        <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order
                                history</h1>
                        </div>
                    </div>

                    <section aria-labelledby="recent-heading" className="mt-16">
                        <h2 id="recent-heading" className="sr-only">
                            Recent orders
                        </h2>
                        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
                            <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
                                {orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                                    >
                                        <h3 className="sr-only">
                                            Order placed on <time
                                            dateTime={order.created_at}>{order.created_at}</time>
                                        </h3>

                                        <div
                                            className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                                            <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                                                <div>
                                                    <dt className="font-medium text-gray-900">Id</dt>
                                                    <dd className="mt-1 text-gray-500">#{order.id}</dd>
                                                </div>
                                                <div className="hidden sm:block">
                                                    <dt className="font-medium text-gray-900">Date placed</dt>
                                                    <dd className="mt-1 text-gray-500">
                                                        <time
                                                            dateTime={order.createdDatetime}>{new Date(order.created_at).toLocaleDateString('en-US', {
                                                            month: 'numeric',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}</time>
                                                    </dd>
                                                </div>
                                                <div>
                                                    <dt className="font-medium text-gray-900">Total amount</dt>
                                                    <dd className="mt-1 font-medium text-gray-900">${order.total_price}</dd>
                                                </div>
                                            </dl>

                                            <Menu as="div" className="relative flex justify-end lg:hidden">
                                                <div className="flex items-center">
                                                    <Menu.Button
                                                        className="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
                                                        <span
                                                            className="sr-only">Options for order {order.id}</span>
                                                        <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true"/>
                                                    </Menu.Button>
                                                </div>

                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items
                                                        className="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className="py-1">
                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <a
                                                                        href={`/order/${order.id}`}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        View Details
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                            {/*<Menu.Item>*/}
                                                            {/*    {({active}) => (*/}
                                                            {/*        <a*/}
                                                            {/*            href={`/tracking-order/${order.id}`}*/}
                                                            {/*            className={classNames(*/}
                                                            {/*                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',*/}
                                                            {/*                'block px-4 py-2 text-sm'*/}
                                                            {/*            )}*/}
                                                            {/*        >*/}
                                                            {/*            Track Order*/}
                                                            {/*        </a>*/}
                                                            {/*    )}*/}
                                                            {/*</Menu.Item>*/}
                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>

                                            <div
                                                className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                                                <a
                                                    href={`/order/${order.id}`}
                                                    className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                                                >
                                                    <span>View Order Details</span>
                                                    <span className="sr-only">{order.id}</span>
                                                </a>

                                                {/*<a*/}
                                                {/*    href={`/tracking-order/${order.id}`}*/}
                                                {/*    className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"*/}
                                                {/*>*/}
                                                {/*    <span>Track Order</span>*/}
                                                {/*    <span className="sr-only">for order {order.id}</span>*/}
                                                {/*</a>*/}
                                            </div>
                                        </div>

                                        {/* Products */}
                                        <h4 className="sr-only">Items</h4>
                                        <ul role="list" className="divide-y divide-gray-200">
                                            {/*{order.products.map((product) => (*/}
                                            <li className="p-4 sm:p-6">
                                                <div className="flex items-center sm:items-start">
                                                    <div
                                                        className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                                                            <img
                                                                src={`${assetServer}/images/products/${order.image}`}
                                                                alt={order.product_name}
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>
                                                        <div className="ml-6 flex-1 text-sm">
                                                            <div
                                                                className="font-medium text-gray-900 sm:flex sm:justify-between">
                                                                <h5>{order.product_name}</h5>
                                                                <p className="mt-2 sm:mt-0">${order.price}</p>
                                                            </div>
                                                            <p className="hidden text-gray-500 sm:mt-2 sm:block">{order.description}</p>
                                                        </div>
                                                    </div>

                                                    <div className="mt-6 sm:flex sm:justify-between">
                                                        <div className="flex items-center">
                                                            <CheckCircleIcon className="h-5 w-5 text-green-500"
                                                                             aria-hidden="true"/>
                                                            <p className="ml-2 text-sm font-medium text-gray-500">
                                                                Delivered on <time
                                                                dateTime={order.deliveredDatetime}>{order.deliveredDate}</time>
                                                            </p>
                                                        </div>

                                                        <div
                                                            className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
                                                            <div className="flex flex-1 justify-center">
                                                                <Link to={`/product/${(order.product_name)}`}
                                                                      className="whitespace-nowrap text-primary hover:text-secondary">
                                                                    View Product
                                                                </Link>

                                                            </div>
                                                            <div className="flex flex-1 justify-center pl-4">
                                                                <button
                                                                    onClick={() => handleBuyAgain(order.product_name)}
                                                                    className="whitespace-nowrap text-primary hover:text-secondary"
                                                                >
                                                                    Buy Again
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            {/*))}*/}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    )
}
