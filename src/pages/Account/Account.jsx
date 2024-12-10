import {useEffect, useState} from 'react'
import { Switch } from '@headlessui/react'
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
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {assetServer} from "../../assetServer.js";


const secondaryNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: UserCircleIcon, current: false },
    { name: 'Orders', href: '/orders', icon: CubeIcon, current: false },
    { name: 'Group Orders', href: '/group-orders', icon: RectangleGroupIcon, current: false },
    { name: 'Messages', href: '/messages', icon: ChatBubbleBottomCenterIcon, current: false },
    { name: 'Payments', href: '/payments', icon: CreditCardIcon, current: false },
    { name: 'Addresses', href: '/address', icon: MapPinIcon, current: false },
    { name: 'Account', href: '/account', icon: UserCircleIcon, current: true },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Account() {
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [sidebarOpen, setSidebarOpen] = useState(false)

    const user = JSON.parse(localStorage.getItem('user')) || {};

    console.log(user)


    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [image, setImage] = useState(user.image);
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Check if localStorage.isLoggedIn is true
        if (localStorage.getItem('isLoggedIn') === 'false') {
            // Redirect to /dashboard
            navigate('/login');
            // Show a toast notification
            toast.warning('You need to login to access the page');
        }
    }, [navigate]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        let userData = {};

        if (name) userData.name = name;
        if (phone) userData.phone = phone;
        if (email) userData.email = email;
        if (password) userData.password = password;
        if (image) userData.image = image;

        try {
            const response = await axios.put(`${server}/user/${user.id}`, userData);

            // Update user data in the localStorage
            localStorage.setItem('user', JSON.stringify({
                ...user,
                user: response.data
            }));

            toast.success('Profile updated successfully!');

            navigate('/account');
        } catch (error) {
            console.error(error);
        }
    };



    const handleDeleteAccount = async () => {
        try {
            // Send a DELETE request to the external API
            const response = await axios.delete(`${server}/delete/user/${user.id}`);

            if (response.status === 200) {
                // Log the user out
                // dispatch(logout());

                // Clear the local storage
                localStorage.clear();

                // Display a success message
                toast.success('Account deleted successfully!');

                // Redirect to the "/" page
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

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
                    <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                        <form onSubmit={handleSubmit}>
                            <div
                                className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                                <div>
                                    <h2 className="text-base font-semibold leading-7 text-black">Personal
                                        Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-400">
                                        Use an active email if you want to receive mail notifications.
                                    </p>
                                </div>

                                <div className="md:col-span-2">
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                                        <div className="col-span-full flex items-center gap-x-8">
                                            <img
                                                src={`${assetServer}/images/users/${image}`}
                                                alt=""
                                                className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                                            />
                                            <div>
                                                <input
                                                    type="file"
                                                    id="avatar"
                                                    name="avatar"
                                                    accept="image/png, image/jpeg"
                                                    onChange={e => setImage(e.target.files[0])}
                                                    className="hidden"
                                                />
                                                <label
                                                    htmlFor="avatar"
                                                    className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-white/20 cursor-pointer"
                                                >
                                                    Change avatar
                                                </label>
                                                <p className="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG.
                                                    1MB max.</p>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name"
                                                   className="block text-sm font-medium leading-6 text-black">
                                                Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    autoComplete="name"
                                                    value={name}
                                                    onChange={e => setName(e.target.value)}
                                                    placeholder={user.name}
                                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="last-name"
                                                   className="block text-sm font-medium leading-6 text-black">
                                                Phone Number
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    id="phone"
                                                    autoComplete="phone"
                                                    value={phone}
                                                    onChange={e => setPhone(e.target.value)}
                                                    placeholder={user.phone}
                                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="email"
                                                   className="block text-sm font-medium leading-6 text-black">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                    placeholder={user.email}
                                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                            <div
                                className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                                <div>
                                    <h2 className="text-base font-semibold leading-7 text-black">Change
                                        password</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-400">
                                        Update your password associated with your account.
                                    </p>
                                </div>

                                <div className="md:col-span-2">
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">

                                        <div className="col-span-full">
                                            <label htmlFor="new-password"
                                                   className="block text-sm font-medium leading-6 text-black">
                                                New password
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="new-password"
                                                    name="password"
                                                    type="password"
                                                    autoComplete="new-password"
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="confirm-password"
                                                   className="block text-sm font-medium leading-6 text-black">
                                                Confirm password
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="confirm-password"
                                                    name="confirm_password"
                                                    type="password"
                                                    autoComplete="new-password"
                                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex">
                                        <button
                                            type="submit"
                                            className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>


                        <div
                            className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                            <div>
                                <h2 className="text-base font-semibold leading-7 text-black">Delete account</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-400">
                                    No longer want to use our service? You can delete your account here. This action
                                    is not reversible.
                                    All information related to this account will be deleted permanently.
                                </p>
                            </div>

                            <form className="flex items-start md:col-span-2">
                                <button
                                    type="button"
                                    onClick={handleDeleteAccount}
                                    className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                                >
                                    Yes, delete my account
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>

        </>
    )
}
