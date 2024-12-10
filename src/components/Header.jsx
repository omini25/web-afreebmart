import {useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import {
    MagnifyingGlassIcon,
    ShoppingCartIcon,
    UserIcon,
    Bars3Icon,
    XMarkIcon,
    HeartIcon
} from '@heroicons/react/24/outline';
import afreeblogo from '../assets/images/afreemart-logo.png';
import {Link, useNavigate} from "react-router-dom";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {toast} from "react-toastify";
import {assetServer} from "../assetServer.js";
import banner from "../assets/images/banner-menu.png"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [hoveredVendor, setHoveredVendor] = useState(null);
    const [cartHovered, setCartHovered] = useState(false);
    const [userMenuHovered, setUserMenuHovered] = useState(false);
    const user = useSelector(state => state.user);
    const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
    const [isOpen5, setIsOpen5] = useState(false);
    const [isOpen6, setIsOpen6] = useState(false);
    const [isOpen7, setIsOpen7] = useState(false);
    const [isOpen8, setIsOpen8] = useState(false);
    const [isOpen9, setIsOpen9] = useState(false);
    const [isOpen10, setIsOpen10] = useState(false);
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();



    const handleSearchSubmit = () => {
        setSearchModalOpen(false);
        navigate(`/search/${searchTerm}`);
    };

    const handleRemoveFromCart = (productId) => {
        // 1. Update cartProducts in localStorage
        const updatedCart = cartProducts.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        
    };

    const navigation = {
        categories: [
            {
                name: 'Main Shop',

                beverage: [
                    { name: 'Tea', href: '/subcategory/Tea'},
                    { name: 'Juices', href: '/subcategory/Juices'},
                    { name: 'Others', href: '/subcategory/Others'},
                    { name: 'Alcoholic Drinks', href: '/subcategory/Alcoholic Drinks'},
                    { name: 'Soft Drinks', href: '/subcategory/Soft Drinks'},
                ],

                baking: [
                    { name: 'Flours', href: '/subcategory/Flours'},
                    { name: 'Baking Mixes', href: '/subcategory/Baking Mixes'},
                    { name: 'Sweeteners', href: '/subcategory/Sweeteners'},
                    { name: 'Leavening Agents', href: '/subcategory/Leavening Agents'},
                    { name: 'Others', href: '/subcategory/Others'},
                ],

                canned: [
                    { name: 'Canned Fish', href: '/subcategory/Canned Fish'},
                    { name: 'Canned Meat', href: '/subcategory/Canned Meat'},
                    { name: 'Canned Vegetables', href: '/subcategory/Canned Vegetables'},
                    { name: 'Canned Bean', href: '/subcategory/Canned Bean'},
                    { name: 'Jams & Spreads', href: '/subcategory/Jams & Spreads'},
                    { name: 'Others', href: '/subcategory/Others'},

                ],

                diary: [
                    { name: 'Dairy', href: '/subcategory/Dairy'},
                    { name: 'Dairy Alternatives', href: '/subcategory/Dairy Alternatives'},
                    { name: 'Others', href: '/subcategory/Others'},
                ],

                fruit: [
                    { name: 'Fresh Fruits', href: '/subcategory/Fresh Fruits'},
                    { name: 'Fresh Vegetable', href: '/subcategory/Fresh Vegetable'},
                    { name: 'Frozen Fruits', href: '/subcategory/Frozen Fruits'},
                    { name: 'Dried Vegetables', href: '/subcategory/Dried Vegetables'},
                    { name: 'Others', href: '/subcategory/Others'},

                ],

                frozen: [
                    { name: 'Frozen Meats', href:'/subcategory/Frozen Meats'},
                    { name: 'Frozen Seafood', href:'/subcategory/Frozen Seafood'},
                    { name: 'Frozen Doughs', href:'/subcategory/Frozen Doughs'},
                    { name: 'Others', href:'/subcategory/Others'},
                ],

                grains: [
                    { name: 'Rice', href:'/subcategory/Rice'},
                    { name: 'Flours', href:'/subcategory/Flours'},
                    { name: 'Yam & Cassava', href:'/subcategory/Yam & Cassava'},
                    { name: 'Plantain', href:'/subcategory/Plantain'},
                    { name: 'Beans & Lentils', href:'/subcategory/Beans & Lentils'},
                    { name: 'Couscous', href:'/subcategory/Couscous'},
                    { name: 'Others', href:'/subcategory/Others'},
                ],

                meats: [
                    { name: 'Fresh Meats', href:'/subcategory/Fresh Meats'},
                    { name: 'Dried/Smoked Meats', href:'/subcategory/Dried/Smoked Meats'},
                    { name: 'Fresh Seafood', href:'/subcategory/Fresh Seadood'},
                    { name: 'Dried Seafood', href:'/subcategory/Dried Seafood'},
                    { name: 'Others', href:'/subcategory/Others'},
                ],

                oils: [
                    { name: 'Palm Oil', href:'/subcategory/Palm Oil'},
                    { name: 'Coconut Oil', href:'/subcategory/Coconut Oil'},
                    { name: 'Groundnut Oil', href:'/subcategory/Groundnut Oil'},
                    { name: 'Other Oils', href:'/subcategory/Other Oils'},
                ],

                snacks: [
                    { name: 'African Snacks', href:'/subcategory/African Snacks'},
                    { name: 'Caribbean Snacks', href:'/subcategory/Caribbean Snacks'},
                    { name: 'Desserts', href:'/subcategory/Desserts'},
                    { name: 'Others', href:'/subcategory/Others'},
                ],

                spices: [
                    { name: 'African Spices', href:'/subcategory/African Spices'},
                    { name: 'Caribbean Seasonings', href:'/subcategory/Caribbean Seasonings'},
                    { name: 'Herbs', href:'/subcategory/Herbs'},
                    { name: 'Bouillon Cubes', href:'/subcategory/Bouillon Cubes'},
                    { name: 'Chili Powders', href:'/subcategory/Chili Powders'},
                    { name: 'Others', href:'/subcategory/Others'},
                ]
            },
        ],
        vendors: [
            {
                name: 'Vendors',
                featured: [
                    { name: 'Vendors', href: '/vendors' },
                    { name: 'Vendors Guide', href: '/vendor-guide' },
                    { name: 'Become a Vendor', href: 'https://vendor.afreebmart.com/signup' },
                ],
            },
        ],
        pages: [
            { name: 'Bulk Shop', href: '/bulk-shop' },
        ],
    };

    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="bg-white">
            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 flex">
                    <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                        {/* Close button */}
                        <div className="flex px-4 pb-2 pt-5">
                            <button
                                type="button"
                                className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>

                        {/* Logo */}
                        <div className="flex justify-center py-4">
                            <Link to="/">
                                <img
                                    className="h-10 w-auto" // Adjust size as needed
                                    src={afreeblogo}
                                    alt="Afreebmart Logo"
                                />
                            </Link>
                        </div>

                        {/* Links */}
                        <div className="mt-2 space-y-6">
                            {/*<div className="border-b border-gray-200">*/}
                            {/*    <div className="-mb-px flex space-x-8 px-4">*/}
                            {/*        {navigation.categories.map((category) => (*/}
                            {/*            <button*/}
                            {/*                key={category.name}*/}
                            {/*                className={classNames(*/}
                            {/*                    'border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'*/}
                            {/*                )}*/}
                            {/*            >*/}
                            {/*                {category.name}*/}
                            {/*            </button>*/}
                            {/*        ))}*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            <div className="space-y-12 px-4 py-6">
                                {navigation.categories.map((category) => (
                                    <div key={category.name} className="grid grid-cols-1 gap-y-10 gap-x-6">
                                        <div>
                                            <button
                                                onClick={() => setIsOpen(!isOpen)}
                                                className="flex items-center justify-between w-full text-gray-900"
                                            >
                                                <p id="mobile-featured-heading" className="font-medium">
                                                    Beverages
                                                </p>
                                                <ChevronDownIcon
                                                    className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                                />
                                            </button>
                                            {isOpen && (
                                                <ul role="list" aria-labelledby="mobile-featured-heading"
                                                    className="mt-6 space-y-6">
                                                    {category.beverage.map((item) => (
                                                        <li key={item.name} className="flex">
                                                            <a href={item.href} className="text-gray-500">
                                                                {item.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => setIsOpen1(!isOpen1)}
                                                className="flex items-center justify-between w-full text-gray-900"
                                            >
                                                <p id="mobile-categories-heading" className="font-medium">
                                                    Baking Ingredients
                                                </p>
                                                <ChevronDownIcon
                                                    className={`h-5 w-5 transition-transform ${isOpen1 ? 'rotate-180' : ''}`}
                                                />

                                            </button>
                                            {isOpen1 && (
                                                <ul role="list" aria-labelledby="mobile-categories-heading"
                                                    className="mt-6 space-y-6">
                                                    {category.baking.map((item) => (
                                                        <li key={item.name} className="flex">
                                                            <a href={item.href} className="text-gray-500">
                                                                {item.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        <div>
                                            <button
                                                onClick={() => setIsOpen2(!isOpen2)}
                                                className="flex items-center justify-between w-full text-gray-900"
                                            >
                                                <p id="mobile-collection-heading" className="font-medium">
                                                    Canned & Preserved Goods
                                                </p>
                                                <ChevronDownIcon
                                                    className={`h-5 w-5 transition-transform ${isOpen2 ? 'rotate-180' : ''}`}
                                                />

                                            </button>
                                            {isOpen2 && (
                                                <ul role="list" aria-labelledby="mobile-collection-heading"
                                                    className="mt-6 space-y-6">
                                                    {category.canned.map((item) => (
                                                        <li key={item.name} className="flex">
                                                            <a href={item.href} className="text-gray-500">
                                                                {item.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        <div>
                                            <button
                                                onClick={() => setIsOpen3(!isOpen3)}
                                                className="flex items-center justify-between w-full text-gray-900"
                                            >
                                                <p id="mobile-collection-heading" className="font-medium">
                                                    Dairy & Dairy Alternatives
                                                </p>
                                                <ChevronDownIcon
                                                    className={`h-5 w-5 transition-transform ${isOpen3 ? 'rotate-180' : ''}`}
                                                />

                                            </button>
                                            {isOpen3 && (
                                                <ul role="list" aria-labelledby="mobile-collection-heading"
                                                    className="mt-6 space-y-6">
                                                    {category.diary.map((item) => (
                                                        <li key={item.name} className="flex">
                                                            <a href={item.href} className="text-gray-500">
                                                                {item.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        <div>
                                            <button
                                                onClick={() => setIsOpen4(!isOpen4)}
                                                className="flex items-center justify-between w-full text-gray-900"
                                            >
                                                <p id="mobile-collection-heading" className="font-medium">
                                                    Fruits & Vegetables
                                                </p>
                                                <ChevronDownIcon
                                                    className={`h-5 w-5 transition-transform ${isOpen4 ? 'rotate-180' : ''}`}
                                                />

                                            </button>
                                            {isOpen4 && (
                                                <ul role="list" aria-labelledby="mobile-collection-heading"
                                                    className="mt-6 space-y-6">
                                                    {category.fruit.map((item) => (
                                                        <li key={item.name} className="flex">
                                                            <a href={item.href} className="text-gray-500">
                                                                {item.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        <div>
                                            <button
                                                onClick={() => setIsOpen5(!isOpen5)}
                                                className="flex items-center justify-between w-full text-gray-900"
                                            >
                                                <p id="mobile-collection-heading" className="font-medium">
                                                    Frozen Foods
                                                </p>
                                                <ChevronDownIcon
                                                    className={`h-5 w-5 transition-transform ${isOpen5 ? 'rotate-180' : ''}`}
                                                />

                                            </button>
                                            {isOpen5 && (
                                                <ul role="list" aria-labelledby="mobile-collection-heading"
                                                    className="mt-6 space-y-6">
                                                    {category.frozen.map((item) => (
                                                        <li key={item.name} className="flex">
                                                            <a href={item.href} className="text-gray-500">
                                                                {item.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        <div>
                                            <button
                                                onClick={() => setIsOpen6(!isOpen6)}
                                                className="flex items-center justify-between w-full text-gray-900"
                                            >
                                                <p id="mobile-collection-heading" className="font-medium">
                                                    Grains & Staples
                                                </p>
                                                <ChevronDownIcon
                                                    className={`h-5 w-5 transition-transform ${isOpen6 ? 'rotate-180' : ''}`}
                                                />

                                            </button>
                                            {isOpen6 && (
                                                <ul role="list" aria-labelledby="mobile-collection-heading"
                                                    className="mt-6 space-y-6">
                                                    {category.grains.map((item) => (
                                                        <li key={item.name} className="flex">
                                                            <a href={item.href} className="text-gray-500">
                                                                {item.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        <div>
                                            <button
                                                onClick={() => setIsOpen7(!isOpen7)}
                                                className="flex items-center justify-between w-full text-gray-900"
                                            >
                                                <p id="mobile-collection-heading" className="font-medium">
                                                    Meats & Seafood
                                                </p>
                                                <ChevronDownIcon
                                                    className={`h-5 w-5 transition-transform ${isOpen7 ? 'rotate-180' : ''}`}
                                                />

                                            </button>
                                            {isOpen7 && (
                                                <ul role="list" aria-labelledby="mobile-collection-heading"
                                                    className="mt-6 space-y-6">
                                                    {category.meats.map((item) => (
                                                        <li key={item.name} className="flex">
                                                            <a href={item.href} className="text-gray-500">
                                                                {item.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        <div>
                                            <button
                                                onClick={() => setIsOpen8(!isOpen8)}
                                                className="flex items-center justify-between w-full text-gray-900"
                                            >
                                                <p id="mobile-collection-heading" className="font-medium">
                                                    Oils & Fats
                                                </p>
                                                <ChevronDownIcon
                                                    className={`h-5 w-5 transition-transform ${isOpen8 ? 'rotate-180' : ''}`}
                                                />

                                            </button>
                                            {isOpen8 && (
                                                <ul role="list" aria-labelledby="mobile-collection-heading"
                                                    className="mt-6 space-y-6">
                                                    {category.oils.map((item) => (
                                                        <li key={item.name} className="flex">
                                                            <a href={item.href} className="text-gray-500">
                                                                {item.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        <div>
                                            <button
                                                onClick={() => setIsOpen9(!isOpen9)}
                                                className="flex items-center justify-between w-full text-gray-900"
                                            >
                                                <p id="mobile-collection-heading" className="font-medium">
                                                    Snacks & Sweets
                                                </p>
                                                <ChevronDownIcon
                                                    className={`h-5 w-5 transition-transform ${isOpen9 ? 'rotate-180' : ''}`}
                                                />

                                            </button>
                                            {isOpen9 && (
                                                <ul role="list" aria-labelledby="mobile-collection-heading"
                                                    className="mt-6 space-y-6">
                                                    {category.snacks.map((item) => (
                                                        <li key={item.name} className="flex">
                                                            <a href={item.href} className="text-gray-500">
                                                                {item.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        <div>
                                            <button
                                                onClick={() => setIsOpen10(!isOpen10)}
                                                className="flex items-center justify-between w-full text-gray-900"
                                            >
                                                <p id="mobile-collection-heading" className="font-medium">
                                                    Spices & Seasonings
                                                </p>
                                                <ChevronDownIcon
                                                    className={`h-5 w-5 transition-transform ${isOpen10 ? 'rotate-180' : ''}`}
                                                />

                                            </button>
                                            {isOpen10 && (
                                                <ul role="list" aria-labelledby="mobile-collection-heading"
                                                    className="mt-6 space-y-6">
                                                    {category.spices.map((item) => (
                                                        <li key={item.name} className="flex">
                                                            <a href={item.href} className="text-gray-500">
                                                                {item.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                    </div>
                                ))}
                            </div>

                            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                {navigation.pages.map((page) => (
                                    <div key={page.name} className="flow-root">
                                        <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                                            {page.name}
                                        </a>
                                    </div>
                                ))}

                                {navigation.vendors.map((vendor) => (
                                    <div key={vendor.map} className="flow-root">
                                        <button
                                            onClick={() => setIsOpen3(!isOpen3)}
                                            className="flex items-center justify-between w-full text-gray-900"
                                        >
                                            <p id="mobile-collection-heading" className="font-medium">
                                                Vendors
                                            </p>
                                            <ChevronDownIcon
                                                className={`h-5 w-5 transition-transform ${isOpen3 ? 'rotate-180' : ''}`}
                                            />

                                        </button>
                                        {isOpen3 && (
                                            <ul role="list" aria-labelledby="mobile-collection-heading"
                                                className="mt-6 space-y-6">
                                                {vendor.featured.map((item) => (
                                                    <li key={item.name} className="flex">
                                                        <a href={item.href} className="text-gray-500">
                                                            {item.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}


                            </div>

                            {localStorage.getItem('isLoggedIn') === 'true' ? (

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    <div className="flow-root">
                                        <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                                            Dashboard
                                        </a>
                                    </div>
                                    <div className="flow-root">
                                        <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                                            Orders
                                        </a>
                                    </div>
                                    <div className="flow-root">
                                        <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                                            Bulk Orders
                                        </a>
                                    </div>

                                    <div className="flow-root">
                                        <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                                            Account
                                        </a>
                                    </div>

                                    <div className="flow-root">
                                        <a
                                            href="#"
                                            className="-m-2 block p-2 font-medium text-red-600"
                                            onClick={(e) => {
                                                e.preventDefault();

                                                // 1. Clear localStorage
                                                localStorage.removeItem('user');
                                                localStorage.setItem('isLoggedIn', 'false');

                                                toast.success('Logged out successfully!');

                                                navigate('/');
                                            }}
                                        >
                                            Logout
                                        </a>
                                    </div>
                                </div>

                            ) : (
                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    <div className="flow-root">
                                        <a href="/login" className="-m-2 block p-2 font-medium text-gray-900">
                                            Sign in
                                        </a>
                                    </div>
                                    <div className="flow-root">
                                        <a href="/register" className="-m-2 block p-2 font-medium text-gray-900">
                                            Create account
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <header className="sticky z-50 top-0">
                <nav aria-label="Top sticky top-0">
                    {/* Top navigation */}
                    <div className="bg-newColor">
                        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                            {/* Conditional rendering based on user state */}
                            {localStorage.getItem('isLoggedIn') === 'true' ? (
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                <a href="/account" className="text-sm font-medium text-white hover:text-gray-100">
                                    Account
                                    </a>
                                    <span className="h-6 w-px bg-gray-600" aria-hidden="true"/>
                                    <a href="/logout" className="text-sm font-medium text-white hover:text-gray-100"
                                       onClick={(e) => {
                                           e.preventDefault();

                                           // 1. Clear localStorage
                                           localStorage.removeItem('user');
                                           localStorage.setItem('isLoggedIn', 'false');

                                           toast.success('Logged out successfully!');

                                           navigate('/');
                                       }}
                                    >
                                        Logout
                                    </a>
                                </div>
                            ) : (
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    <a href="/register" className="text-sm font-medium text-white hover:text-gray-100">
                                        Create an account
                                    </a>
                                    <span className="h-6 w-px bg-gray-600" aria-hidden="true" />
                                    <a href="/login" className="text-sm font-medium text-white hover:text-gray-100">
                                        Sign in
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Secondary navigation */}
                    <div
                        className={`bg-white ${isSticky ? 'sticky top-0 shadow-md z-50' : ''} transition-all duration-300`}>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="border-b border-gray-200">
                                <div className="flex h-16 items-center justify-between">
                                    {/* Logo (lg+) */}
                                    <div className="hidden lg:flex lg:items-center">
                                        <a href="/">
                                            <span className="sr-only">Afreebmart</span>
                                            <img
                                                className="h-12 w-auto"
                                                src={afreeblogo}
                                                alt="Afreebmart Logo"
                                            />
                                        </a>
                                    </div>

                                    <div className="hidden h-full lg:flex">
                                        {/* Mega menus */}
                                        <div className="ml-8">
                                            <div className="flex h-full justify-center space-x-8">
                                                {navigation.categories.map((category, categoryIdx) => (
                                                    <div
                                                        key={category.name}
                                                        className="flex"
                                                        onMouseEnter={() => setHoveredCategory(categoryIdx)}
                                                        onMouseLeave={() => setHoveredCategory(null)}
                                                    >
                                                        <div className="relative flex">
                                                            <button
                                                                className={classNames(
                                                                    hoveredCategory === categoryIdx
                                                                        ? 'border-primary text-primary'
                                                                        : 'border-transparent text-gray-700 hover:text-gray-800 font-bold',
                                                                    'relative z-10 -mb-px flex items-center border-b-2 pt-px text-base font-bold transition-colors duration-200 ease-out'
                                                                )}
                                                            >
                                                                {category.name}
                                                            </button>
                                                        </div>

                                                        {hoveredCategory === categoryIdx && (
                                                            <div
                                                                className="absolute inset-x-0 top-full text-gray-500 sm:text-sm bg-white">
                                                                <div
                                                                    className="absolute inset-0 top-1/2 bg-white shadow"
                                                                    aria-hidden="true"/>
                                                                <div className="relative bg-white">
                                                                    <div className="mx-auto max-w-7xl px-8">
                                                                        <div
                                                                            className="grid-cols-5 items-start  pb-12 pt-10">
                                                                            <div
                                                                                className="grid grid-cols-6 gap-x-16 gap-y-4 text-sm text-gray-500">
                                                                                <div>
                                                                                    <p
                                                                                        id={`desktop-featured-heading-${categoryIdx}`}
                                                                                        className="text-newColor hover:text-secondary text-lg font-medium"
                                                                                    >
                                                                                        Beverages
                                                                                    </p>
                                                                                    <ul
                                                                                        role="list"
                                                                                        aria-labelledby={`desktop-featured-heading-${categoryIdx}`}
                                                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                    >
                                                                                        {category.beverage.map((item) => (
                                                                                            <li key={item.name}
                                                                                                className="flex">
                                                                                                <a href={item.href}
                                                                                                   className="hover:text-secondary text-sm">
                                                                                                    {item.name}
                                                                                                </a>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>
                                                                                <div>
                                                                                    <p
                                                                                        id="desktop-categories-heading"
                                                                                        className="text-newColor hover:text-secondary text-lg font-medium"
                                                                                    >
                                                                                        Baking Ingredients
                                                                                    </p>
                                                                                    <ul
                                                                                        role="list"
                                                                                        aria-labelledby="desktop-categories-heading"
                                                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                    >
                                                                                        {category.baking.map((item) => (
                                                                                            <li key={item.name}
                                                                                                className="flex">
                                                                                                <a href={item.href}
                                                                                                   className="hover:text-secondary text-sm">
                                                                                                    {item.name}
                                                                                                </a>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>

                                                                                <div
                                                                                    className="grid grid-cols-2 gap-x-8 gap-y-10">
                                                                                    <div>
                                                                                        <p
                                                                                            id="desktop-collection-heading"
                                                                                            className="text-newColor hover:text-secondary text-lg font-medium"
                                                                                        >
                                                                                            Canned & Preserved Goods
                                                                                        </p>
                                                                                        <ul
                                                                                            role="list"
                                                                                            aria-labelledby="desktop-collection-heading"
                                                                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                        >
                                                                                            {category.canned.map((item) => (
                                                                                                <li key={item.name}
                                                                                                    className="flex">
                                                                                                    <a href={item.href}
                                                                                                       className="hover:text-secondary text-sm">
                                                                                                        {item.name}
                                                                                                    </a>
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>

                                                                                <div
                                                                                    className="grid grid-cols-2 gap-x-8 gap-y-10">
                                                                                    <div>
                                                                                        <p
                                                                                            id="desktop-collection-heading"
                                                                                            className="text-newColor hover:text-secondary text-lg font-medium"
                                                                                        >
                                                                                            Dairy & Dairy Alternatives
                                                                                        </p>
                                                                                        <ul
                                                                                            role="list"
                                                                                            aria-labelledby="desktop-collection-heading"
                                                                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                        >
                                                                                            {category.diary.map((item) => (
                                                                                                <li key={item.name}
                                                                                                    className="flex">
                                                                                                    <a href={item.href}
                                                                                                       className="hover:text-secondary text-sm">
                                                                                                        {item.name}
                                                                                                    </a>
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>

                                                                                <div
                                                                                    className="grid grid-cols-2 gap-x-8 gap-y-10">
                                                                                    <div>
                                                                                        <p
                                                                                            id="desktop-collection-heading"
                                                                                            className="text-newColor hover:text-secondary text-lg font-medium"
                                                                                        >
                                                                                            Fruits & Vegetables
                                                                                        </p>
                                                                                        <ul
                                                                                            role="list"
                                                                                            aria-labelledby="desktop-collection-heading"
                                                                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                        >
                                                                                            {category.fruit.map((item) => (
                                                                                                <li key={item.name}
                                                                                                    className="flex">
                                                                                                    <a href={item.href}
                                                                                                       className="hover:text-secondary text-sm">
                                                                                                        {item.name}
                                                                                                    </a>
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>

                                                                                <div
                                                                                    className="grid grid-cols-2 gap-x-8 gap-y-10">
                                                                                    <div>
                                                                                        <p
                                                                                            id="desktop-collection-heading"
                                                                                            className="text-newColor hover:text-secondary text-lg font-medium"
                                                                                        >
                                                                                            Frozen Foods
                                                                                        </p>
                                                                                        <ul
                                                                                            role="list"
                                                                                            aria-labelledby="desktop-collection-heading"
                                                                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                        >
                                                                                            {category.frozen.map((item) => (
                                                                                                <li key={item.name}
                                                                                                    className="flex">
                                                                                                    <a href={item.href}
                                                                                                       className="hover:text-secondary text-sm">
                                                                                                        {item.name}
                                                                                                    </a>
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>

                                                                                <div
                                                                                    className="grid grid-cols-2 gap-x-8 gap-y-10">
                                                                                    <div>
                                                                                        <p
                                                                                            id="desktop-collection-heading"
                                                                                            className="text-newColor hover:text-secondary text-lg font-medium"
                                                                                        >
                                                                                            Grains & Staples
                                                                                        </p>
                                                                                        <ul
                                                                                            role="list"
                                                                                            aria-labelledby="desktop-collection-heading"
                                                                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                        >
                                                                                            {category.grains.map((item) => (
                                                                                                <li key={item.name}
                                                                                                    className="flex">
                                                                                                    <a href={item.href}
                                                                                                       className="hover:text-secondary text-sm">
                                                                                                        {item.name}
                                                                                                    </a>
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>


                                                                                <div
                                                                                    className="grid grid-cols-2 gap-x-8 gap-y-10">
                                                                                    <div>
                                                                                        <p
                                                                                            id="desktop-collection-heading"
                                                                                            className="text-newColor hover:text-secondary text-lg font-medium"
                                                                                        >
                                                                                            Meats & Seafood
                                                                                        </p>
                                                                                        <ul
                                                                                            role="list"
                                                                                            aria-labelledby="desktop-collection-heading"
                                                                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                        >
                                                                                            {category.meats.map((item) => (
                                                                                                <li key={item.name}
                                                                                                    className="flex">
                                                                                                    <a href={item.href}
                                                                                                       className="hover:text-secondary text-sm">
                                                                                                        {item.name}
                                                                                                    </a>
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>

                                                                                <div
                                                                                    className="grid grid-cols-2 gap-x-8 gap-y-10">
                                                                                    <div>
                                                                                        <p
                                                                                            id="desktop-collection-heading"
                                                                                            className="text-newColor hover:text-secondary text-lg font-medium"
                                                                                        >
                                                                                            Oils & Fats
                                                                                        </p>
                                                                                        <ul
                                                                                            role="list"
                                                                                            aria-labelledby="desktop-collection-heading"
                                                                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                        >
                                                                                            {category.oils.map((item) => (
                                                                                                <li key={item.name}
                                                                                                    className="flex">
                                                                                                    <a href={item.href}
                                                                                                       className="hover:text-secondary text-sm">
                                                                                                        {item.name}
                                                                                                    </a>
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>


                                                                                <div
                                                                                    className="grid grid-cols-2 gap-x-8 gap-y-10">
                                                                                    <div>
                                                                                        <p
                                                                                            id="desktop-collection-heading"
                                                                                            className="text-newColor hover:text-secondary text-lg font-medium"
                                                                                        >
                                                                                            Snacks & Sweets
                                                                                        </p>
                                                                                        <ul
                                                                                            role="list"
                                                                                            aria-labelledby="desktop-collection-heading"
                                                                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                        >
                                                                                            {category.snacks.map((item) => (
                                                                                                <li key={item.name}
                                                                                                    className="flex">
                                                                                                    <a href={item.href}
                                                                                                       className="hover:text-secondary text-sm">
                                                                                                        {item.name}
                                                                                                    </a>
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>

                                                                                <div
                                                                                    className="grid grid-cols-2 gap-x-8 gap-y-10">
                                                                                    <div>
                                                                                        <p
                                                                                            id="desktop-collection-heading"
                                                                                            className="text-newColor hover:text-secondary text-lg font-medium"
                                                                                        >
                                                                                            Spices & Seasonings
                                                                                        </p>
                                                                                        <ul
                                                                                            role="list"
                                                                                            aria-labelledby="desktop-collection-heading"
                                                                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                        >
                                                                                            {category.spices.map((item) => (
                                                                                                <li key={item.name}
                                                                                                    className="flex">
                                                                                                    <a href={item.href}
                                                                                                       className="hover:text-secondary text-sm">
                                                                                                        {item.name}
                                                                                                    </a>
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>


                                                                            {/* Banner on the right */}
                                                                            {/*<li className="grid sub-mega-menu sub-mega-menu-width-34">*/}
                                                                            {/*    <div*/}
                                                                            {/*        className="menu-banner-wrap relative">*/}
                                                                            {/*        <a href="#">*/}
                                                                            {/*            <img*/}
                                                                            {/*                src={banner}*/}
                                                                            {/*                alt="Afreebmart Banner"*/}
                                                                            {/*            />*/}
                                                                            {/*        </a>*/}
                                                                            {/*        <div*/}
                                                                            {/*            className="menu-banner-content absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center items-start text-white p-8">*/}
                                                                            {/*            <div>*/}
                                                                            {/*                <h4 className="text-black text-xl font-medium">Hot*/}
                                                                            {/*                    deals</h4>*/}
                                                                            {/*                <h3 className="text-black text-xl font-medium">*/}
                                                                            {/*                    Don't miss<br/>Trending*/}
                                                                            {/*                </h3>*/}

                                                                            {/*                <div*/}
                                                                            {/*                    className="menu-banner-btn mt-2">*/}
                                                                            {/*                    <Link to="/shop">*/}
                                                                            {/*                        <button*/}
                                                                            {/*                            className="px-4 py-2 bg-newColor text-white rounded-md hover:bg-blue-600">*/}
                                                                            {/*                            Shop now*/}
                                                                            {/*                        </button>*/}
                                                                            {/*                    </Link>*/}
                                                                            {/*                </div>*/}
                                                                            {/*            </div>*/}
                                                                            {/*        </div>*/}
                                                                            {/*        <div*/}
                                                                            {/*            className="menu-banner-discount absolute -top-4 -right-4 bg-red-500 text-white py-2 px-4 rounded-bl-lg">*/}
                                                                            {/*            <h3>*/}
                                                                            {/*                <span>25%</span> off*/}
                                                                            {/*            </h3>*/}
                                                                            {/*        </div>*/}
                                                                            {/*    </div>*/}
                                                                            {/*</li>*/}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}

                                                {navigation.pages.map((page) => (
                                                    <a
                                                        key={page.name}
                                                        href={page.href}
                                                        className="flex items-center text-base font-bold text-gray-700 hover:text-gray-800"
                                                    >
                                                        {page.name}
                                                    </a>
                                                ))}

                                                {navigation.vendors.map((vendor, vendorIdx) => (
                                                    <div
                                                        key={vendor.name}
                                                        className="flex"
                                                        onMouseEnter={() => setHoveredVendor(vendorIdx)}
                                                        onMouseLeave={() => setHoveredVendor(null)}
                                                    >
                                                        <div className="relative flex">
                                                            <button
                                                                className={classNames(
                                                                    hoveredVendor === vendorIdx
                                                                        ? 'border-primary text-primary'
                                                                        : 'border-transparent text-gray-700 hover:text-gray-800',
                                                                    'relative z-10 -mb-px flex items-center border-b-2 pt-px text-base font-bold transition-colors duration-200 ease-out'
                                                                )}
                                                            >
                                                                {vendor.name}
                                                            </button>
                                                        </div>

                                                        {hoveredVendor === vendorIdx && (
                                                            <div
                                                                className="absolute inset-x-0 top-full text-gray-500 sm:text-sm bg-white">
                                                                <div
                                                                    className="absolute inset-0 top-1/2 bg-white shadow"
                                                                    aria-hidden="true"/>

                                                                <div className="relative bg-white">
                                                                    <div className="mx-auto max-w-7xl px-8">
                                                                        <div
                                                                            className="grid grid-cols-2 items-start gap-x-8 gap-y-10 pb-12 pt-10">
                                                                            <div
                                                                                className="grid grid-cols-2 gap-x-8 gap-y-10">
                                                                                <div>

                                                                                    <ul
                                                                                        role="list"
                                                                                        aria-labelledby={`desktop-featured-heading-${vendorIdx}`}
                                                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                    >
                                                                                        {vendor.featured.map((item) => (
                                                                                            <li key={item.name}
                                                                                                className="flex">
                                                                                                <a href={item.href}
                                                                                                   className="hover:text-secondary text-sm">
                                                                                                    {item.name}
                                                                                                </a>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>

                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile menu and search (lg-) */}
                                    <div className="flex flex-1 items-center lg:hidden">
                                        <button
                                            type="button"
                                            className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileMenuOpen(true)}
                                        >
                                            <span className="sr-only">Open menu</span>
                                            <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                                        </button>

                                        {/* Search */}
                                        {/* Search */}
                                        <button
                                            onClick={() => setSearchModalOpen(true)}
                                            className="ml-2 p-2 text-gray-400 hover:text-gray-500"
                                        >
                                            <span className="sr-only">Search</span>
                                            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true"/>
                                        </button>

                                        {/* Search Modal */}
                                        {searchModalOpen && (
                                            <div
                                                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                                <div className="bg-white p-4 rounded-lg w-full max-w-md">
                                                    <div className="flex items-center">
                                                        <input
                                                            type="text"
                                                            placeholder="Search..."
                                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                                            value={searchTerm}
                                                            onChange={(e) => setSearchTerm(e.target.value)}
                                                        />
                                                        <button
                                                            onClick={handleSearchSubmit}
                                                            className="ml-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary"
                                                        >
                                                            Search
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => setSearchModalOpen(false)}
                                                        className="mt-4 text-gray-500 hover:text-gray-700"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Logo (lg-) */}
                                    <a href="/" className="lg:hidden">
                                        <span className="sr-only">Afreebmart</span>
                                        <img
                                            src={afreeblogo}
                                            alt="Afreebmart Logo"
                                            className="h-8 w-auto"
                                        />
                                    </a>

                                    <div className="flex flex-1 items-center justify-end">
                                        <div className="flex items-center lg:ml-8">
                                            <div className="flex space-x-8">
                                                <div className="hidden lg:flex">
                                                    <div className="relative w-64">
                                                        <input
                                                            type="text"
                                                            placeholder="Search..."
                                                            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                                            value={searchTerm} // Bind input value to searchTerm state
                                                            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
                                                            onKeyDown={(e) => { // Handle Enter key press
                                                                if (e.key === 'Enter') {
                                                                    handleSearchSubmit();
                                                                }
                                                            }}
                                                        />
                                                        <MagnifyingGlassIcon
                                                            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"/>
                                                    </div>
                                                </div>


                                                <div className=" flex relative">
                                                    <Link
                                                        to="/wishlist"> {/* Assuming your wishlist route is /wishlist */}
                                                        <button className="group  flex items-center pt-2 pb-2 -ml-5">
                                                            <HeartIcon
                                                                className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"/>
                                                            <span
                                                                className="sr-only">Wishlist</span> {/* For screen readers */}
                                                        </button>
                                                    </Link>
                                                </div>

                                                {/* Cart Mobile */}
                                                <div className="flex relative lg:hidden">
                                                    <Link to="/cart"> {/* Assuming your cart page route is /cart */}
                                                        <button className="group flex items-center pt-2 pb-2 -ml-3">
                                                            <ShoppingCartIcon
                                                                className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                            <span
                                                                className=" text-sm font-medium text-gray-700 group-hover:text-gray-800">
                                                                {cartProducts.length}
                                                              </span>
                                                            <span className="sr-only">items in cart, view bag</span>
                                                        </button>
                                                    </Link>
                                                    {/* Remove the cartHovered section */}
                                                </div>

                                                {/* Cart  Desktop*/}
                                                <div className="flex relative hidden sm:block"
                                                     onMouseEnter={() => setCartHovered(true)}
                                                     onMouseLeave={() => setCartHovered(false)}>
                                                    <button className="group flex items-center pt-2 pb-2">
                                                        <ShoppingCartIcon
                                                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                            aria-hidden="true"
                                                        />
                                                        <span
                                                            className="ml-1 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                                                            {cartProducts.length}
                                                        </span>
                                                        <span className="sr-only">items in cart, view bag</span>
                                                    </button>
                                                    {cartHovered && (
                                                        <div
                                                            className="absolute right-0  w-80 bg-white shadow-lg z-10 rounded-lg">
                                                            <div className="p-4 bg-altBackground">
                                                                <h2 className="text-lg font-semibold mb-4">Shopping
                                                                    Cart</h2>
                                                                {cartProducts.length > 0 ? (
                                                                    <ul className="divide-y divide-gray-200">
                                                                        {cartProducts.map((product) => (
                                                                            <li key={product.id}
                                                                                className="py-2  flex relative">
                                                                                <img
                                                                                    src={`${assetServer}/images/products/${product.image}`}
                                                                                    alt={product.product_name}
                                                                                    className="h-16 w-16 rounded-md object-cover mr-4"
                                                                                />
                                                                                <div className="flex-1">
                                                                                    <h3 className="text-sm font-medium">{product.product_name}</h3>
                                                                                    <p className="text-sm text-gray-500">${product.price}</p>
                                                                                    <p className="text-sm text-gray-500">Quantity:{product.quantity}</p>
                                                                                </div>
                                                                                <button
                                                                                    className="absolute top-2 right-2"
                                                                                    onClick={() => handleRemoveFromCart(product.id)}
                                                                                >
                                                                                    <XMarkIcon
                                                                                        className="h-4 w-4 text-gray-500 hover:text-red-500"/>
                                                                                </button>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                ) : (
                                                                    <p className="text-gray-500">Your cart is empty</p>
                                                                )}

                                                                <Link to="/checkout">
                                                                    {cartProducts.length > 0 && (
                                                                        <button
                                                                            className="mt-4 w-full bg-newColor text-white py-2 px-4 rounded-md hover:bg-primary-dark"
                                                                        >
                                                                            Checkout
                                                                        </button>
                                                                    )}
                                                                </Link>
                                                                <p className="mt-6 text-center">
                                                                    <a href="/cart"
                                                                       className="text font-medium text-black hover:text-primary">
                                                                        View Cart
                                                                    </a>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <span className="mx-4 h-6 w-px bg-gray-200 lg:mx-6" aria-hidden="true"/>

                                            <div className=" flow-root relative lg:hidden">
                                                {localStorage.getItem('isLoggedIn') === 'true' ? (
                                                    <Link
                                                        to="/dashboard">
                                                        <button className="group  flex items-center pt-2 pb-2">
                                                            <UserIcon
                                                                className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"/>
                                                            <span
                                                                className="sr-only">Account</span>
                                                        </button>
                                                    </Link>
                                                    ):(
                                                        <Link
                                                            to="/login">
                                                            <button className="group  flex items-center pt-2 pb-2">
                                                                <UserIcon
                                                                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                                    aria-hidden="true"/>
                                                                <span
                                                                    className="sr-only">Account</span>
                                                            </button>
                                                        </Link>
                                                    )
                                                }

                                            </div>

                                            {/* User account */}
                                            <div className="flow-root relative hidden sm:block"
                                                 onMouseEnter={() => setUserMenuHovered(true)}
                                                 onMouseLeave={() => setUserMenuHovered(false)}>
                                                <button className="group -m-2 flex items-center p-2">
                                                    <UserIcon
                                                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                        aria-hidden="true"
                                                    />
                                                    <span className="sr-only">User menu</span>
                                                </button>
                                                {userMenuHovered && (
                                                    <div
                                                        className="absolute right-0 mt-2 w-48 bg-white shadow-lg z-10 rounded-lg">
                                                        <div className="py-1">
                                                            {localStorage.getItem('isLoggedIn') === 'true' ? (
                                                                <>
                                                                    <a href="/dashboard"
                                                                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My
                                                                        Account</a>
                                                                    <a href="/orders"
                                                                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</a>
                                                                    <a href="/group-orders"
                                                                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Group
                                                                        Orders</a>
                                                                    <a href="/logout"
                                                                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                       onClick={(e) => {
                                                                           e.preventDefault();

                                                                           // 1. Clear localStorage
                                                                           localStorage.removeItem('user');
                                                                           localStorage.setItem('isLoggedIn', 'false');

                                                                           toast.success('Logged out successfully!');

                                                                           navigate('/');
                                                                       }}
                                                                    >Logout</a>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <a href="/login"
                                                                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign
                                                                        In</a>
                                                                    <a href="/register"
                                                                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Create
                                                                        Account</a>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}
