import {Fragment, useEffect, useState} from 'react'
import {
    ChatBubbleBottomCenterIcon,
    CreditCardIcon,
    CubeIcon,
    MapPinIcon, RectangleGroupIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline'

import Header from "../../components/Header.jsx";
import axios from "axios";
import {server} from "../../Server.js";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";




const secondaryNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: UserCircleIcon, current: true },
    { name: 'Orders', href: '/orders', icon: CubeIcon, current: false },
    { name: 'Group Orders', href: '/group-orders', icon: RectangleGroupIcon, current: false },
    { name: 'Messages', href: '/messages', icon: ChatBubbleBottomCenterIcon, current: false },
    { name: 'Payments', href: '/payments', icon: CreditCardIcon, current: false },
    { name: 'Addresses', href: '/address', icon: MapPinIcon, current: false },
    { name: 'Account', href: '/account', icon: UserCircleIcon, current: false },
]


const statuses = {
    Paid: 'text-green-700 bg-green-50 ring-green-600/20',
    Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
    Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
}



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
    const [recentOrders, setRecentOrders] = useState([]);
    const user = JSON.parse(localStorage.getItem('user')) || {};
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

    const stats = [
        { name: 'Orders', value: recentOrders.length, change: '+4.75%', changeType: 'positive' },
        { name: 'Group Orders', value: recentOrders.filter(order => order.group === 1).length || 0, change: '+54.02%', changeType: 'negative' },
        { name: 'Completed Orders', value: recentOrders.filter(order => order.status === 'completed').length, change: '-1.39%', changeType: 'positive' },
    ]

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios(`${server}/order/${user.id}`);
                const data = response.data.orders;
                setRecentOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    console.log(recentOrders)


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
                    <div className="relative isolate overflow-hidden">

                        {/* Stats */}
                        <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
                            <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:px-2 xl:px-0">
                                {stats.map((stat, statIdx) => (
                                    <div
                                        key={stat.name}
                                        className={classNames(
                                            statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
                                            'flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8'
                                        )}
                                    >
                                        <dt className="text-sm font-medium leading-6 text-gray-500">{stat.name}</dt>
                                        {/*<dd*/}
                                        {/*    className={classNames(*/}
                                        {/*        stat.changeType === 'negative' ? 'text-rose-600' : 'text-gray-700',*/}
                                        {/*        'text-xs font-medium'*/}
                                        {/*    )}*/}
                                        {/*>*/}
                                        {/*    {stat.change}*/}
                                        {/*</dd>*/}
                                        <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                                            {stat.value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        <div
                            className="absolute left-0 top-full -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-ml-96 sm:-mt-10 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50"
                            aria-hidden="true"
                        >
                            <div
                                className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
                                style={{
                                    clipPath:
                                        'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',
                                }}
                            />
                        </div>
                    </div>

                    <div className="space-y-16 py-16 xl:space-y-20">
                        {/* Recent activity table */}
                        <div>

                            <div className=" overflow-hidden border-t border-gray-100">
                                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                                        <table className="w-full text-left">
                                            <tbody>

                                                    <tr className="text-sm leading-6 text-gray-900">
                                                        <th scope="colgroup" colSpan={3}
                                                            className="relative isolate py-2 font-semibold">
                                                            <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
                                                                Recent activity
                                                            </h2>
                                                            <div
                                                                className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50"/>
                                                            <div
                                                                className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50"/>
                                                        </th>
                                                    </tr>
                                                    {recentOrders
                                                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort by date descending
                                                        .slice(0, 5) // Take only the first 5 orders
                                                        .map((order) => (
                                                            order.order_items ? (
                                                                JSON.parse(order.order_items).map((item, index) => (
                                                                    <tr key={index}>
                                                                        <td className="relative py-5 pr-6">
                                                                            <div className="flex gap-x-6">
                                                                                <CubeIcon
                                                                                    className="hidden h-6 w-5 flex-none text-gray-400 sm:block"
                                                                                    aria-hidden="true"
                                                                                />
                                                                                <div className="flex-auto">
                                                                                    <div className="flex items-start gap-x-3">
                                                                                        <div className="text-sm font-medium leading-6 text-gray-900">
                                                                                            ${Math.round(item.total_price * 100) / 100}
                                                                                        </div>
                                                                                        <div
                                                                                            className={classNames(
                                                                                                statuses[order.status],
                                                                                                'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
                                                                                            )}
                                                                                        >
                                                                                            {order.status}
                                                                                        </div>
                                                                                    </div>
                                                                                    <p className="text-xs leading-5 text-gray-500">
                                                                                        {new Date(order.created_at).toLocaleDateString('en-US', {
                                                                                            month: 'numeric',
                                                                                            day: 'numeric',
                                                                                            year: 'numeric'
                                                                                        })}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                                                                            <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                                                                        </td>
                                                                        <td className="hidden py-5 pr-6 sm:table-cell">
                                                                            <div className="text-sm leading-6 text-gray-900">
                                                                                {item.quantity} {item.product_name}
                                                                            </div>
                                                                            <div className="mt-1 text-xs leading-5 text-gray-500">
                                                                                {order.shipping_address}
                                                                            </div>
                                                                        </td>
                                                                        <td className="py-5 text-right">
                                                                            <div className="flex justify-end">
                                                                                <a
                                                                                    href={`/order/${order.id}`}
                                                                                    className="text-sm font-medium leading-6 text-primary hover:text-secondary"
                                                                                >
                                                                                    <span className="hidden sm:inline">Order Details</span>
                                                                                    <span className="sr-only">, Order #{order.id}</span>
                                                                                </a>
                                                                            </div>
                                                                            <div className="mt-1 text-xs leading-5 text-gray-500">
                                                                                <span className="text-gray-900">#{order.id}-{item.product_id}</span>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            ) : (
                                                                <tr key={order.id}>
                                                                    <td className="relative py-5 pr-6">
                                                                        <div className="flex gap-x-6">
                                                                            <CubeIcon
                                                                                className="hidden h-6 w-5 flex-none text-gray-400 sm:block"
                                                                                aria-hidden="true"
                                                                            />
                                                                            <div className="flex-auto">
                                                                                <div className="flex items-start gap-x-3">
                                                                                    <div className="text-sm font-medium leading-6 text-gray-900">
                                                                                        ${order.total_price}
                                                                                    </div>
                                                                                    <div
                                                                                        className={classNames(
                                                                                            statuses[order.status],
                                                                                            'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
                                                                                        )}
                                                                                    >
                                                                                        {order.status}
                                                                                    </div>
                                                                                </div>
                                                                                <p className="text-xs leading-5 text-gray-500">
                                                                                    {new Date(order.created_at).toLocaleDateString('en-US', {
                                                                                        month: 'numeric',
                                                                                        day: 'numeric',
                                                                                        year: 'numeric'
                                                                                    })}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                                                                        <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                                                                    </td>
                                                                    <td className="hidden py-5 pr-6 sm:table-cell">
                                                                        <div className="text-sm leading-6 text-gray-900">
                                                                            {order.quantity} {order.product_name}
                                                                        </div>
                                                                        <div className="mt-1 text-xs leading-5 text-gray-500">
                                                                            {order.shipping_address}
                                                                        </div>
                                                                    </td>
                                                                    <td className="py-5 text-right">
                                                                        <div className="flex justify-end">
                                                                            <a
                                                                                href={`/order/${order.id}`}
                                                                                className="text-sm font-medium leading-6 text-primary hover:text-secondary"
                                                                            >
                                                                                <span className="hidden sm:inline">Order Details</span>
                                                                                <span className="sr-only">, Order #{order.id}</span>
                                                                            </a>
                                                                        </div>
                                                                        <div className="mt-1 text-xs leading-5 text-gray-500">
                                                                            <span className="text-gray-900">#{order.id}</span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        ))
                                                    }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </>
    )
}
