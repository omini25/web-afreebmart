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
    { name: 'Orders', href: '/orders', icon: CubeIcon, current: false },
    { name: 'Group Orders', href: '/group-orders', icon: RectangleGroupIcon, current: true },
    { name: 'Payments', href: '/payments', icon: CreditCardIcon, current: false },
    { name: 'Addresses', href: '/address', icon: MapPinIcon, current: false },
    { name: 'Account', href: '/account', icon: UserCircleIcon, current: false },
]

const products = [
    {
        id: 1,
        name: 'Nomad Tumbler',
        description:
            'This durable and portable insulated tumbler will keep your beverage at the perfect temperature during your next adventure.',
        href: '#',
        price: '35.00',
        status: 'Preparing to ship',
        step: 1,
        date: 'March 24, 2021',
        datetime: '2021-03-24',
        address: ['Floyd Miles', '7363 Cynthia Pass', 'Toronto, ON N3Y 4H8'],
        email: 'f•••@example.com',
        phone: '1•••••••••40',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/confirmation-page-03-product-01.jpg',
        imageAlt: 'Insulated bottle with white base and black snap lid.',
    },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function GroupOrders() {
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

                    <div className="bg-white">
                        <div className="mx-auto max-w-2xl pt-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                            <div
                                className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
                                <div className="flex sm:items-baseline sm:space-x-4">
                                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order
                                        #54879</h1>
                                    <a href="#"
                                       className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:block">
                                        View invoice
                                        <span aria-hidden="true"> &rarr;</span>
                                    </a>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Order placed{' '}
                                    <time dateTime="2021-03-22" className="font-medium text-gray-900">
                                        March 22, 2021
                                    </time>
                                </p>
                                <a href="#"
                                   className="text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:hidden">
                                    View invoice
                                    <span aria-hidden="true"> &rarr;</span>
                                </a>
                            </div>

                            {/* Products */}
                            <div className="mt-6">
                                <h2 className="sr-only">Products purchased</h2>

                                <div className="space-y-8">
                                    {products.map((product) => (
                                        <div
                                            key={product.id}
                                            className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                                        >
                                            <div
                                                className="px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                                                <div className="sm:flex lg:col-span-7">
                                                    <div
                                                        className="aspect-h-1 aspect-w-1 w-full flex-shrink-0 overflow-hidden rounded-lg sm:aspect-none sm:h-40 sm:w-40">
                                                        <img
                                                            src={product.imageSrc}
                                                            alt={product.imageAlt}
                                                            className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                                                        />
                                                    </div>

                                                    <div className="mt-6 sm:ml-6 sm:mt-0">
                                                        <h3 className="text-base font-medium text-gray-900">
                                                            <a href={product.href}>{product.name}</a>
                                                        </h3>
                                                        <p className="mt-2 text-sm font-medium text-gray-900">${product.price}</p>
                                                        <p className="mt-3 text-sm text-gray-500">{product.description}</p>
                                                    </div>
                                                </div>

                                                <div className="mt-6 lg:col-span-5 lg:mt-0">
                                                    <dl className="grid grid-cols-2 gap-x-6 text-sm">
                                                        <div>
                                                            <dt className="font-medium text-gray-900">Delivery address
                                                            </dt>
                                                            <dd className="mt-3 text-gray-500">
                                                                <span className="block">{product.address[0]}</span>
                                                                <span className="block">{product.address[1]}</span>
                                                                <span className="block">{product.address[2]}</span>
                                                            </dd>
                                                        </div>
                                                        <div>
                                                            <dt className="font-medium text-gray-900">Shipping updates
                                                            </dt>
                                                            <dd className="mt-3 space-y-3 text-gray-500">
                                                                <p>{product.email}</p>
                                                                <p>{product.phone}</p>
                                                                <button type="button"
                                                                        className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                    Edit
                                                                </button>
                                                            </dd>
                                                        </div>
                                                    </dl>
                                                </div>
                                            </div>

                                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6 lg:p-8">
                                                <h4 className="sr-only">Status</h4>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {product.status} on <time
                                                    dateTime={product.datetime}>{product.date}</time>
                                                </p>
                                                <div className="mt-6" aria-hidden="true">
                                                    <div className="overflow-hidden rounded-full bg-gray-200">
                                                        <div
                                                            className="h-2 rounded-full bg-indigo-600"
                                                            style={{width: `calc((${product.step} * 2 + 1) / 8 * 100%)`}}
                                                        />
                                                    </div>
                                                    <div
                                                        className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
                                                        <div className="text-indigo-600">Order placed</div>
                                                        <div
                                                            className={classNames(product.step > 0 ? 'text-indigo-600' : '', 'text-center')}>
                                                            Processing
                                                        </div>
                                                        <div
                                                            className={classNames(product.step > 1 ? 'text-indigo-600' : '', 'text-center')}>
                                                            Shipped
                                                        </div>
                                                        <div
                                                            className={classNames(product.step > 2 ? 'text-indigo-600' : '', 'text-right')}>
                                                            Delivered
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>


                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}





