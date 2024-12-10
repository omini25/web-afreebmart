import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
    CreditCardIcon,
    CubeIcon,
    MapPinIcon, RectangleGroupIcon,
    UserCircleIcon,
    EllipsisVerticalIcon, ChatBubbleBottomCenterIcon, ShoppingCartIcon
} from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import Header from "../../components/Header.jsx";
import axios from "axios";
import { server } from "../../Server.js";
import { assetServer } from "../../assetServer.js";
import {Link, useNavigate} from "react-router-dom";
import { useShoppingHooks } from "../../redux/useShoppingHooks.js";
import { toast } from "react-toastify";
import { Dialog } from '@headlessui/react'


const secondaryNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: UserCircleIcon, current: false },
    { name: 'Orders', href: '/orders', icon: CubeIcon, current: false },
    { name: 'Group Orders', href: '/group-orders', icon: RectangleGroupIcon, current: true },
    { name: 'Messages', href: '/messages', icon: ChatBubbleBottomCenterIcon, current: false },
    { name: 'Payments', href: '/payments', icon: CreditCardIcon, current: false },
    { name: 'Addresses', href: '/address', icon: MapPinIcon, current: false },
    { name: 'Account', href: '/account', icon: UserCircleIcon, current: false },
]



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function GroupOrders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const { addProductToCart } = useShoppingHooks();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    // New state variables for modals
    const [createGroupOpen, setCreateGroupOpen] = useState(false);
    const [joinGroupOpen, setJoinGroupOpen] = useState(false);
    const [addUsersOpen, setAddUsersOpen] = useState(false);
    const [deleteGroupOpen, setDeleteGroupOpen] = useState(false);
    const [selectedGroupId, setSelectedGroupId] = useState(null);

    // New state variables for form inputs
    const [newGroupName, setNewGroupName] = useState('');
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [products, setProducts] = useState([]);
    const [joinGroupId, setJoinGroupId] = useState('');
    const [addUserEmail, setAddUserEmail] = useState('');

    useEffect(() => {
        // Check if localStorage.isLoggedIn is true
        if (localStorage.getItem('isLoggedIn') === 'false') {
            // Redirect to /dashboard
            navigate('/login');
            // Show a toast notification
            toast.warning('You need to login to access the page');
        }
    }, [navigate]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${server}/user/group/${user.id}`);
            const data = response.data.groups;
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${server}/group-products`);
                setProducts(response.data.group_products);
            } catch (error) {
                console.error('Error fetching products:', error);
                // Handle error appropriately (e.g., display an error message)
            }
        };

        fetchProducts();
    }, []);

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${server}/user/create-group/${user.id}`, {
                groupName: newGroupName,
                userId: user.id,
                productId: selectedProductId, // Send selected product ID
            });
            setCreateGroupOpen(false);
            setNewGroupName('');
            setSelectedProductId(null); // Reset selected product
            toast.success('Group created successfully!');
            fetchOrders();
        } catch (error) {
            console.error('Error creating group:', error);
            toast.error('Failed to create group');
        }
    };

    const handleJoinGroup = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${server}/user/join/${joinGroupId}/${user.id}`); // Pass as URL parameters
            setJoinGroupOpen(false);
            setJoinGroupId('');
            toast.success('Joined group successfully!');
            fetchOrders();
        } catch (error) {
            console.error('Error joining group:', error);
            toast.error('Failed to join group');
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${server}/add-user-to-group-by-email`, { groupId: selectedGroupId, email: addUserEmail });
            setAddUsersOpen(false);
            setAddUserEmail('');
            toast.success('User added successfully!');
            fetchOrders();
        } catch (error) {
            console.error('Error adding user:', error);
            toast.error('Failed to add user');
        }
    };

    const handleDeleteGroup = async (groupId) => {
        try {
            await axios.delete(`${server}/user/group/${groupId}`);
            setDeleteGroupOpen(false);
            toast.success('Group deleted successfully!');
            fetchOrders();
        } catch (error) {
            console.error('Error deleting group:', error);
            toast.error('Failed to delete group');
        }
    };

    // Calculate current items for the page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = orders
        .sort((a, b) => new Date(b.group.created_at) - new Date(a.group.created_at)) // Sort by date descending
        .slice(indexOfFirstItem, indexOfLastItem);

    // Pagination controls
    const totalPages = Math.ceil(orders.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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

    const handleAddToCart = async (productName) => {
        try {
            const response = await axios.get(`${server}/product/${productName}`);
            const product = response.data.product;

            addProductToCart({
                id: product.id,
                name: product.product_name,
                price: product.group_price,
                quantity: 1,
                image: `${assetServer}/images/products/${product.image}`,
            });

            toast.success(`${product.product_name} added to cart!`);
        } catch (error) {
            console.error('Error adding product to cart:', error);
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
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                Groups
                                <div className="flex justify-end">
                                    {/* Create Group Modal */}

                                    <button
                                        onClick={() => setCreateGroupOpen(true)}
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                                    >
                                        Create Group
                                    </button>

                                    <Dialog open={createGroupOpen} onClose={() => setCreateGroupOpen(false)}>
                                        <div className="fixed inset-0 bg-black/30" aria-hidden="true"/>
                                        <div className="fixed inset-0 flex items-center justify-center p-4">
                                            <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
                                                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">Create
                                                    Group</Dialog.Title>
                                                <form onSubmit={handleCreateGroup}>
                                                    <label htmlFor="groupName"
                                                           className="block text-sm font-medium leading-6 text-gray-900">
                                                        Group Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={newGroupName}
                                                        onChange={(e) => setNewGroupName(e.target.value)}
                                                        placeholder="Group Name"
                                                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                        required
                                                    />

                                                    <label htmlFor="productId"
                                                           className="block text-sm font-medium leading-6 text-gray-900">
                                                        Select Product
                                                    </label>

                                                    <select
                                                        id="productId"
                                                        name="productId"
                                                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                        value={selectedProductId}
                                                        onChange={(e) => setSelectedProductId(e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select a product</option>
                                                        {products.map((product) => (
                                                            <option key={product.id} value={product.id}>
                                                                {product.product_name}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <button type="submit"
                                                            className="mt-4 w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">
                                                        Create
                                                    </button>
                                                </form>
                                            </Dialog.Panel>
                                        </div>
                                    </Dialog>

                                    {/* Join Group Modal */}

                                    <button
                                        onClick={() => setJoinGroupOpen(true)}
                                        className="ml-2 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
                                    >
                                        Join Group
                                    </button>


                                    <Dialog open={joinGroupOpen} onClose={() => setJoinGroupOpen(false)}>
                                        <div className="fixed inset-0 bg-black/30" aria-hidden="true"/>
                                        <div className="fixed inset-0 flex items-center justify-center p-4">
                                            <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
                                                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">Join
                                                    Group</Dialog.Title>
                                                <form onSubmit={handleJoinGroup}>
                                                    <input
                                                        type="text"
                                                        value={joinGroupId}
                                                        onChange={(e) => setJoinGroupId(e.target.value)}
                                                        placeholder="Group ID"
                                                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                        required
                                                    />
                                                    <button type="submit"
                                                            className="mt-4 w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600">
                                                        Join
                                                    </button>
                                                </form>
                                            </Dialog.Panel>
                                        </div>
                                    </Dialog>
                                </div>
                            </h1>
                        </div>
                    </div>

                    <div className="bg-white">
                        <div className="mx-auto max-w-2xl sm:px-6 mt-4 lg:max-w-7xl lg:px-8">


                            {/* Products */}
                            <div className="mt-6">
                                <h2 className="sr-only">Products purchased</h2>

                                <div className="space-y-8 mx-10">
                                    {currentOrders.map((product) => (

                                        <div
                                            key={product.id}
                                            className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                                        >
                                            <div
                                                className="space-y-2 px-16 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0 mx-5 my-3">
                                                <div className="flex sm:items-baseline sm:space-x-4">
                                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}
                                                        {' '}#{product.group_id}</h1>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    Date Created{' '}
                                                    <time dateTime="2021-03-22" className="font-medium text-gray-900">
                                                        {new Date(product.group.created_at).toLocaleDateString('en-US', {
                                                            month: 'numeric',
                                                            day: 'numeric',
                                                            year: '2-digit'
                                                        })}
                                                    </time>
                                                </p>
                                                <a href="#"
                                                   className="text-sm font-medium text-primary hover:text-secondary sm:hidden">
                                                    View invoice
                                                    <span aria-hidden="true"> &rarr;</span>
                                                </a>
                                            </div>

                                            <div
                                                className="px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                                                <div className="sm:flex lg:col-span-7">
                                                    <div
                                                        className="aspect-h-1 aspect-w-1 w-full flex-shrink-0 overflow-hidden rounded-lg sm:aspect-none sm:h-40 sm:w-40">
                                                        <img
                                                            src={`${assetServer}/images/products/${product.product_details?.image}`}
                                                            alt={product.product_details?.product_name || ''}
                                                            className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                                                        />
                                                    </div>

                                                    <div className="mt-6 sm:ml-6 sm:mt-0">
                                                        <h3 className="text-base font-medium text-gray-900">
                                                        <a href="#">{product.product_details?.product_name || ''}</a>
                                                        </h3>
                                                        <p className="mt-2 text-sm font-medium text-gray-900">${product.product_details?.group_price || ''}</p>
                                                        <p className="mt-3 text-sm text-gray-500">{product.product_details?.description || ''}</p>
                                                    </div>
                                                </div>

                                                <div className="mt-6 lg:col-span-5 lg:mt-0">
                                                    <dl className="grid grid-cols-2 gap-x-6 text-sm">
                                                        <div>
                                                            <dt className="font-medium text-gray-900">Group Information
                                                            </dt>
                                                            <dd className="mt-3 text-gray-500">
                                                                <span className="block">Status: {product.group.status}</span>
                                                                <span className="block">Role: {product.group.role}</span>
                                                                <span
                                                                    className="block">Users: {product.users_count}</span>
                                                            </dd>
                                                        </div>
                                                        <div>
                                                            <dt className="font-medium text-gray-900">Group Action
                                                            </dt>
                                                            <dd className="mt-3 space-y-3 text-gray-500">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setSelectedGroupId(product.group_id);
                                                                        setAddUsersOpen(true);
                                                                    }}
                                                                    className="font-medium text-primary hover:text-secondary"
                                                                >
                                                                    Add Users
                                                                </button>

                                                                <Dialog open={addUsersOpen}
                                                                        onClose={() => setAddUsersOpen(false)}>
                                                                    <div className="fixed inset-0 bg-black/30"
                                                                         aria-hidden="true"/>
                                                                    <div
                                                                        className="fixed inset-0 flex items-center justify-center p-4">
                                                                        <Dialog.Panel
                                                                            className="mx-auto max-w-sm rounded bg-white p-6">
                                                                            <Dialog.Title
                                                                                className="text-lg font-medium leading-6 text-gray-900">Add
                                                                                User to Group</Dialog.Title>
                                                                            <form onSubmit={handleAddUser}>
                                                                                <input
                                                                                    type="email"
                                                                                    value={addUserEmail}
                                                                                    onChange={(e) => setAddUserEmail(e.target.value)}
                                                                                    placeholder="User Email"
                                                                                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                                                    required
                                                                                />
                                                                                <button type="submit"
                                                                                        className="mt-4 w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">
                                                                                    Add User
                                                                                </button>
                                                                            </form>
                                                                        </Dialog.Panel>
                                                                    </div>
                                                                </Dialog>
                                                            </dd>

                                                            <dd className="mt-3 space-y-3 text-gray-500">

                                                                {product.group.role === 'admin' && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setSelectedGroupId(product.group_id);
                                                                            setDeleteGroupOpen(true);
                                                                        }}
                                                                        className="font-medium text-red-600 hover:text-secondary"
                                                                    >
                                                                        Delete Group
                                                                    </button>
                                                                )}

                                                                <Dialog open={deleteGroupOpen}
                                                                        onClose={() => setDeleteGroupOpen(false)}>
                                                                    <div className="fixed inset-0 bg-black/30"
                                                                         aria-hidden="true"/>
                                                                    <div
                                                                        className="fixed inset-0 flex items-center justify-center p-4">
                                                                        <Dialog.Panel
                                                                            className="mx-auto max-w-sm rounded bg-white p-6">
                                                                            <Dialog.Title
                                                                                className="text-lg font-medium leading-6 text-gray-900">Delete
                                                                                Group</Dialog.Title>
                                                                            <p className="mt-2 text-sm text-gray-500">Are
                                                                                you sure you want to delete this group?
                                                                                This action cannot be undone.</p>
                                                                            <div
                                                                                className="mt-4 flex justify-end space-x-2">
                                                                                <button
                                                                                    onClick={() => setDeleteGroupOpen(false)}
                                                                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                                                                                    Cancel
                                                                                </button>
                                                                                <button
                                                                                    onClick={() => handleDeleteGroup(product.group_id)}
                                                                                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                                                                                >
                                                                                    Delete
                                                                                </button>
                                                                            </div>
                                                                        </Dialog.Panel>
                                                                    </div>
                                                                </Dialog>
                                                            </dd>

                                                            <div className="mt-5">
                                                                {product.users_count === 2 && (
                                                                    <button
                                                                        onClick={() => handleAddToCart(product.product_details?.product_name)}
                                                                        className="relative w-full flex items-center justify-center rounded-md border border-transparent bg-altBackground px-4 py-2 text-sm font-medium text-gray-900 hover:bg-newColor group"
                                                                    >
                                                                        <ShoppingCartIcon className="h-5 w-5 mr-2 text-newColor group-hover:text-white" aria-hidden="true" />
                                                                        <p className="text-newColor group-hover:text-white">Buy Now</p>
                                                                        <span className="sr-only">, {product.product_name}</span>
                                                                    </button>
                                                                )}
                                                            </div>

                                                        </div>
                                                    </dl>
                                                </div>
                                            </div>

                                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6 lg:p-8">
                                                <h4 className="sr-only">Status</h4>
                                                <p className="text-sm font-medium text-gray-900">
                                                    Last Updated on <time
                                                    dateTime={product.group.updated_at}>{new Date(product.group.updated_at).toLocaleDateString('en-US', {
                                                    month: 'numeric',
                                                    day: 'numeric',
                                                    year: '2-digit'
                                                })}</time>
                                                </p>
                                                <div className="mt-6" aria-hidden="true">
                                                    <div className="overflow-hidden rounded-full bg-gray-200">
                                                        <div
                                                            className="h-2 rounded-full bg-primary"
                                                            style={{width: `${(product.users_count / 5) * 100}%`}}
                                                        />
                                                    </div>
                                                    <div
                                                        className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
                                                        <div className="text-primary">Group Created</div>
                                                        <div
                                                            className={classNames(product.users_count >= 0 ? 'text-primary' : '', 'text-center')}>
                                                            Just Starting
                                                        </div>
                                                        <div
                                                            className={classNames(product.users_count >= 2 ? 'text-primary' : '', 'text-center')}>
                                                            Nice
                                                        </div>
                                                        <div
                                                            className={classNames(product.users_count >= 5 ? 'text-primary' : '', 'text-right')}>
                                                            Group Progressing
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Pagination */}
                            <div className="mt-6 sm:flex sm:justify-between">
                                <nav className="flex items-center justify-center">
                                    <ul className="inline-flex -space-x-px shadow-sm text-sm font-medium">
                                        <li>
                                            <button
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                className="inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-gray-700 hover:bg-gray-50 focus:z-20 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                            >
                                                Previous
                                            </button>
                                        </li>
                                        {Array.from({ length: totalPages }, (_, index) => (
                                            <li key={index + 1}>
                                                <button
                                                    onClick={() => handlePageChange(index + 1)}
                                                    className={classNames(
                                                        currentPage === index + 1
                                                            ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                                                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
                                                        'inline-flex items-center border px-4 py-2 text-gray-700 hover:bg-gray-50 focus:z-20 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
                                                    )}
                                                >
                                                    {index + 1}
                                                </button>
                                            </li>
                                        ))}
                                        <li>
                                            <button
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                                className="inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-gray-700 hover:bg-gray-50 focus:z-20 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                            >
                                                Next
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>


                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}





