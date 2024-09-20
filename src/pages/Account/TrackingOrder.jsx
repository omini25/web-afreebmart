import {Fragment, useEffect, useState} from 'react'
import {
    ChatBubbleBottomCenterIcon,
    CreditCardIcon,
    CubeIcon,
    MapPinIcon, RectangleGroupIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline'
import Header from "../../components/Header.jsx";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


const secondaryNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: UserCircleIcon, current: false },
    { name: 'Orders', href: '/orders', icon: CubeIcon, current: false },
    { name: 'Group Orders', href: '/group-orders', icon: RectangleGroupIcon, current: true },
    { name: 'Messages', href: '/messages', icon: ChatBubbleBottomCenterIcon, current: false },
    { name: 'Payments', href: '/payments', icon: CreditCardIcon, current: false },
    { name: 'Addresses', href: '/address', icon: MapPinIcon, current: false },
    { name: 'Account', href: '/account', icon: UserCircleIcon, current: false },
]

const products = [
    {
        id: 1,
        name: 'Distant Mountains Artwork Tee',
        price: '$36.00',
        description: 'You awake in a new, mysterious land. Mist hangs low along the distant mountains. What does it mean?',
        address: ['Floyd Miles', '7363 Cynthia Pass', 'Toronto, ON N3Y 4H8'],
        email: 'f•••@example.com',
        phone: '1•••••••••40',
        href: '#',
        status: 'Processing',
        step: 1,
        date: 'March 24, 2021',
        datetime: '2021-03-24',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/confirmation-page-04-product-01.jpg',
        imageAlt: 'Off-white t-shirt with circular dot illustration on the front of mountain ridges that fade.',
    },
    // More products...
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function TrackingOrder() {
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
                                                ? 'bg-gray-50 text-indigo-600'
                                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                            'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold'
                                        )}
                                    >
                                        <item.icon
                                            className={classNames(
                                                item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
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
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Order Details</h1>

                    <div className="mt-2 border-b border-gray-200 pb-5 text-sm sm:flex sm:justify-between">
                        <dl className="flex">
                            <dt className="text-gray-500">Order number&nbsp;</dt>
                            <dd className="font-medium text-gray-900">W086438695</dd>
                            <dt>
                                <span className="sr-only">Date</span>
                                <span className="mx-2 text-gray-400" aria-hidden="true">
                &middot;
              </span>
                            </dt>
                            <dd className="font-medium text-gray-900">
                                <time dateTime="2021-03-22">March 22, 2021</time>
                            </dd>
                        </dl>
                        <div className="mt-4 sm:mt-0">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                View invoice
                                <span aria-hidden="true"> &rarr;</span>
                            </a>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="mt-8">
                        <h2 id="products-heading" className="sr-only">
                            Products purchased
                        </h2>

                        <div className="space-y-24">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
                                >
                                    <div className="sm:col-span-4 md:col-span-5 md:row-span-2 md:row-end-2">
                                        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-50">
                                            <img src={product.imageSrc} alt={product.imageAlt}
                                                 className="object-cover object-center"/>
                                        </div>
                                    </div>
                                    <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                                        <h3 className="text-lg font-medium text-gray-900">
                                            <a href={product.href}>{product.name}</a>
                                        </h3>
                                        <p className="mt-1 font-medium text-gray-900">{product.price}</p>
                                        <p className="mt-3 text-gray-500">{product.description}</p>
                                    </div>
                                    <div className="sm:col-span-12 md:col-span-7">
                                        <dl className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                                            <div>
                                                <dt className="font-medium text-gray-900">Delivery address</dt>
                                                <dd className="mt-3 text-gray-500">
                                                    <span className="block">{product.address[0]}</span>
                                                    <span className="block">{product.address[1]}</span>
                                                    <span className="block">{product.address[2]}</span>
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="font-medium text-gray-900">Shipping updates</dt>
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
                                        <p className="mt-6 font-medium text-gray-900 md:mt-10">
                                            {product.status} on <time dateTime={product.datetime}>{product.date}</time>
                                        </p>
                                        <div className="mt-6">
                                            <div className="overflow-hidden rounded-full bg-gray-200">
                                                <div
                                                    className="h-2 rounded-full bg-indigo-600"
                                                    style={{width: `calc((${product.step} * 2 + 1) / 8 * 100%)`}}
                                                />
                                            </div>
                                            <div className="mt-6 hidden grid-cols-4 font-medium text-gray-600 sm:grid">
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
                    </section>

                </main>
            </div>
        </>
    )
}
