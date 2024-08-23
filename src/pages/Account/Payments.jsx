import {
    CreditCardIcon,
    CubeIcon,
    MapPinIcon, RectangleGroupIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline'
import Header from "../../components/Header.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {server} from "../../Server.js";
import {Link} from "react-router-dom";


const secondaryNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: UserCircleIcon, current: false },
    { name: 'Orders', href: '/orders', icon: CubeIcon, current: false },
    { name: 'Group Orders', href: '/group-orders', icon: RectangleGroupIcon, current: false },
    { name: 'Payments', href: '/payments', icon: CreditCardIcon, current: true },
    { name: 'Addresses', href: '/address', icon: MapPinIcon, current: false },
    { name: 'Account', href: '/account', icon: UserCircleIcon, current: false },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Payments() {
    const [plans, setPlans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user')) || {};


    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get(`${server}/user/payments/${user.id}`); // Replace with your API endpoint
                setPlans(response.data);
            } catch (error) {
                console.error('Error fetching plans:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlans();
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
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                    Payments
                                </h1>
                            </div>
                        </div>
                        <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                <tr>
                                    <th scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Payment Id
                                    </th>
                                    <th
                                        scope="col"
                                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                                    >
                                        Product
                                    </th>
                                    <th
                                        scope="col"
                                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                                    >
                                        Amount
                                    </th>
                                    <th
                                        scope="col"
                                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                                    >
                                        Status
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Date
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Select</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {plans.map((plan, planIdx) => (
                                    <tr key={plan.id}>
                                        <td
                                            className={classNames(
                                                planIdx === 0 ? '' : 'border-t border-transparent',
                                                'relative py-4 pl-4 pr-3 text-sm sm:pl-6'
                                            )}
                                        >
                                            <div className="font-medium text-gray-900">
                                                #{plan.id}
                                                {plan.isCurrent ?
                                                    <span className="ml-1 text-primary">(Current Plan)</span> : null}
                                            </div>

                                        </td>
                                        <td
                                            className={classNames(
                                                planIdx === 0 ? '' : 'border-t border-gray-200',
                                                'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                                            )}
                                        >
                                            {plan.product_name}
                                        </td>
                                        <td
                                            className={classNames(
                                                planIdx === 0 ? '' : 'border-t border-gray-200',
                                                'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                                            )}
                                        >
                                            ${plan.total_cost}
                                        </td>
                                        <td
                                            className={
                                                'border-t border-gray-200 hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                                            }
                                        >
                                            {plan.payment_status}
                                        </td>
                                        <td
                                            className={'border-t border-gray-200 px-3 py-3.5 text-sm text-gray-500'
                                            }
                                        >
                                            <div className="sm:hidden">{new Date(plan.created_at).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</div>
                                            <div className="hidden sm:block">{new Date(plan.created_at).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</div>
                                        </td>
                                        <td
                                            className={classNames(
                                                planIdx === 0 ? '' : 'border-t border-transparent',
                                                'relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'
                                            )}
                                        >
                                            <Link to={`/invoice/${plan.id}`}>
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                                                    disabled={plan.isCurrent}
                                                >
                                                    Invoice <span className="sr-only">, {plan.id}</span>
                                                </button>
                                            </Link>
                                            {planIdx !== 0 ? <div
                                                className="absolute -top-px left-0 right-6 h-px bg-gray-200"/> : null}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
