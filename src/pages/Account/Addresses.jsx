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
import {AddAddress} from "../../components/AddAddress.jsx";
import {EditAddress} from "../../components/EditAddress.jsx";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


const secondaryNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: UserCircleIcon, current: false },
    { name: 'Orders', href: '/orders', icon: CubeIcon, current: false },
    { name: 'Group Orders', href: '/group-orders', icon: RectangleGroupIcon, current: false },
    { name: 'Payments', href: '/payments', icon: CreditCardIcon, current: false },
    { name: 'Addresses', href: '/address', icon: MapPinIcon, current: true },
    { name: 'Account', href: '/account', icon: UserCircleIcon, current: false },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Addresses() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const [showModal, setShowModal] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
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

    const handleEditAddress = (address) => {
        setEditingAddress(address);
        setShowEditModal(true);
    };

    const handleAddAddress = () => {
        setShowModal(true);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${server}/address/${user.id}`); // Replace with your API endpoint
                setUsers(response.data.address);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);


    const handleSubmitAddress = async (newAddressData) => {
        try {
            const response = await axios.post(`${server}/address/${user.id}`, newAddressData); // Adjust API endpoint

            // Close the modal
            setShowModal(false);

            // Refresh the users data
            const updatedUsersResponse = await axios.get(`${server}/address/${user.id}`);
            setUsers(updatedUsersResponse.data.address);

        } catch (error) {
            console.error('Error adding address:', error);
            // Handle error, e.g., display an error message to the user
        }
    };


    const handleDeleteAddress = async (usersId) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            try {
                await axios.delete(`${server}/user/${user.id}/address/${usersId}`);
                // Refresh the address list after successful deletion
                const updatedUsersResponse = await axios.get(`${server}/address/${user.id}`);
                setUsers(updatedUsersResponse.data.address);
            } catch (error) {
                console.error('Error deleting address:', error);
                // Handle error, e.g., display an error message to the user
            }
        }
    };


    const handleUpdateAddress = async (updatedAddressData, usersId) => {
        try {
            await axios.put(`${server}/address/${user.id}/${usersId}`, updatedAddressData);
            setShowEditModal(false);

            // Refresh the address list after successful update
            const updatedUsersResponse = await axios.get(`${server}/address/${user.id}`);
            setUsers(updatedUsersResponse.data.address);
        } catch (error) {
            console.error('Error updating address:', error);
            // Handle error, e.g., display an error message to the user
        }
    };

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
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Addresses</h1>

                            </div>
                            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                <button
                                    type="button"
                                    onClick={handleAddAddress} // Show the modal on click
                                    className="block rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                >
                                    Add Address
                                </button>

                                {/* Modal */}
                                {showModal && (
                                    <div className="fixed inset-0 z-10 overflow-y-auto"> {/* Modal backdrop */}
                                        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                                            <div
                                                className="fixed inset-0 transition-opacity"
                                                aria-hidden="true"
                                                onClick={() => setShowModal(false)} // Close modal on backdrop click
                                            >
                                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                            </div>

                                            <span className="hidden sm:inline-block sm:align-middle sm:h-full" aria-hidden="true">&#8203;</span>
                                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                                <AddAddress onSubmit={handleSubmitAddress} /> {/* Pass the submit handler */}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-8 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead>
                                        <tr>
                                            <th scope="col"
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                Address
                                            </th>
                                            <th scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                City
                                            </th>
                                            <th scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Postal Code
                                            </th>
                                            <th scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Status
                                            </th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                        {users.map((person) => (
                                            <tr key={person.id}>
                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                    <div className="text-gray-900">{person.address}</div>
                                                    <div className="mt-1 text-gray-500">{person.street}</div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                    <div className="text-gray-900">{person.city}</div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{person.zip_code}</td>
                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                  <span
                                                      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${person.is_default === 1
                                                          ? 'bg-green-50 text-green-700 ring-green-600/20'
                                                          : 'bg-orange-50 text-orange-700 ring-orange-600/20'}`}>
                                                    {person.is_default === 1 ? 'Main' : 'Not Main'}
                                                  </span>
                                                </td>
                                                <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                    <button
                                                        onClick={() => handleEditAddress(person)}
                                                        className="text-primary hover:text-secondary mr-2" // Add some margin
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteAddress(person.id)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>

                                        {showEditModal && (
                                            <div className="fixed inset-0 z-10 overflow-y-auto">
                                                <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                                                    <div
                                                        className="fixed inset-0 transition-opacity"
                                                        aria-hidden="true"
                                                        onClick={() => setShowEditModal(false)} // Close EDIT modal on backdrop click
                                                    >
                                                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                                    </div>

                                                    <span className="hidden sm:inline-block sm:align-middle sm:h-full" aria-hidden="true">&#8203;</span>
                                                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                                        <EditAddress
                                                            initialAddress={editingAddress}
                                                            onSubmit={(updatedAddressData) => handleUpdateAddress(updatedAddressData, editingAddress.id)} // Pass usersId here
                                                            onCancel={() => setShowEditModal(false)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
