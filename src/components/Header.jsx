import React, { useState } from 'react';
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
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();


    const handleSearchSubmit = () => {
        setSearchModalOpen(false); // Close the modal
        navigate(`/search?q=${searchTerm}`); // Navigate to the search page
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
                featured: [
                    { name: 'Produce', href: '/subcategory/Produce' },
                    { name: 'Bread & Bakery', href: '/subcategory/Bread & Bakery' },
                    { name: 'Breakfast & Cereal', href: '/subcategory/Breakfast & Cereal' },
                    { name: 'Dairy & Eggs', href: '/subcategory/Dairy & Eggs' },
                    { name: 'Meat & Seafood', href: '/subcategory/Meat & Seafood' },
                    { name: 'Snacks', href: '/subcategory/Snacks' },
                    { name: 'Beverage', href: '/subcategory/Beverage' },
                    { name: 'Coffee', href: '/subcategory/Coffee' },
                    { name: 'Cooking Oil', href: '/subcategory/Cooking Oil' },
                    { name: 'Seasoning Spice', href: '/subcategory/Seasoning Spice' },
                ],
                collection: [
                    { name: 'Caribbean', href: '/subcategory/Caribbean' },
                    { name: 'African', href: '/subcategory/African' },
                    { name: 'Others', href: '/subcategory/Others' },
                ],
                categories: [
                    { name: 'Meat', href: '/subcategory/Meat' },
                    { name: 'Poultry', href: '/subcategory/Poultry' },
                ],
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
            { name: 'Group Shop', href: '/bulk-shop' },
        ],
    };

    return (
        <div className="bg-white">
            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 flex">
                    <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
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

                        {/* Links */}
                        <div className="mt-2">
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
                                                    Fresh Food
                                                </p>
                                                <ChevronDownIcon
                                                    className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                                />
                                            </button>
                                            {isOpen && (
                                                <ul role="list" aria-labelledby="mobile-featured-heading"
                                                    className="mt-6 space-y-6">
                                                    {category.featured.map((item) => (
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
                                                   Frozen Foods
                                                </p>
                                                <ChevronDownIcon
                                                    className={`h-5 w-5 transition-transform ${isOpen1 ? 'rotate-180' : ''}`}
                                                />

                                            </button>
                                            {isOpen1 && (
                                                <ul role="list" aria-labelledby="mobile-categories-heading"
                                                    className="mt-6 space-y-6">
                                                    {category.categories.map((item) => (
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
                                                   Foodie (Hot Food)
                                                </p>
                                                <ChevronDownIcon
                                                    className={`h-5 w-5 transition-transform ${isOpen2 ? 'rotate-180' : ''}`}
                                                />

                                            </button>
                                            {isOpen2 && (
                                                <ul role="list" aria-labelledby="mobile-collection-heading"
                                                    className="mt-6 space-y-6">
                                                    {category.collection.map((item) => (
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
                                            Group Orders
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
                                        <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                                            Sign in
                                        </a>
                                    </div>
                                    <div className="flow-root">
                                        <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                                            Create account
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <header className="sticky top-0 z-10">
                <nav aria-label="Top">
                    {/* Top navigation */}
                    <div className="bg-primary">
                        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                            {/* Conditional rendering based on user state */}
                            {localStorage.getItem('isLoggedIn') === 'true' ? (
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                <a href="/Account/Account" className="text-sm font-medium text-white hover:text-gray-100">
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
                    <div className="bg-white">
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
                                        <div className="ml-8 bg-white z-auto">
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
                                                                        : 'border-transparent text-gray-700 hover:text-gray-800',
                                                                    'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                                                )}
                                                            >
                                                                {category.name}
                                                            </button>
                                                        </div>

                                                        {hoveredCategory === categoryIdx && (
                                                            <div className="absolute inset-x-0 top-full text-gray-500 sm:text-sm bg-white">
                                                                <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                                                <div className="relative bg-white">
                                                                    <div className="mx-auto max-w-7xl px-8">
                                                                        <div className="grid grid-cols-2 items-start gap-x-8 gap-y-10 pb-12 pt-10">
                                                                            <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                                                                                <div>
                                                                                    <p
                                                                                        id={`desktop-featured-heading-${categoryIdx}`}
                                                                                        className="font-medium text-gray-900"
                                                                                    >
                                                                                        Fresh Food
                                                                                    </p>
                                                                                    <ul
                                                                                        role="list"
                                                                                        aria-labelledby={`desktop-featured-heading-${categoryIdx}`}
                                                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                    >
                                                                                        {category.featured.map((item) => (
                                                                                            <li key={item.name} className="flex">
                                                                                                <a href={item.href} className="hover:text-gray-800">
                                                                                                    {item.name}
                                                                                                </a>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>
                                                                                <div>
                                                                                    <p
                                                                                        id="desktop-categories-heading"
                                                                                        className="font-medium text-gray-900"
                                                                                    >
                                                                                        Foodie (Hot Food)
                                                                                    </p>
                                                                                    <ul
                                                                                        role="list"
                                                                                        aria-labelledby="desktop-categories-heading"
                                                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                    >
                                                                                        {category.categories.map((item) => (
                                                                                            <li key={item.name} className="flex">
                                                                                                <a href={item.href} className="hover:text-gray-800">
                                                                                                    {item.name}
                                                                                                </a>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                            <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                                                                                <div>
                                                                                    <p
                                                                                        id="desktop-collection-heading"
                                                                                        className="font-medium text-gray-900"
                                                                                    >
                                                                                        Frozen Food
                                                                                    </p>
                                                                                    <ul
                                                                                        role="list"
                                                                                        aria-labelledby="desktop-collection-heading"
                                                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                    >
                                                                                        {category.collection.map((item) => (
                                                                                            <li key={item.name} className="flex">
                                                                                                <a href={item.href} className="hover:text-gray-800">
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

                                                {navigation.pages.map((page) => (
                                                    <a
                                                        key={page.name}
                                                        href={page.href}
                                                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
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
                                                                    'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                                                )}
                                                            >
                                                                {vendor.name}
                                                            </button>
                                                        </div>

                                                        {hoveredVendor === vendorIdx && (
                                                            <div className="absolute inset-x-0 top-full text-gray-500 sm:text-sm bg-white">
                                                                <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                                                <div className="relative bg-white">
                                                                    <div className="mx-auto max-w-7xl px-8">
                                                                        <div className="grid grid-cols-2 items-start gap-x-8 gap-y-10 pb-12 pt-10">
                                                                            <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                                                                                <div>

                                                                                    <ul
                                                                                        role="list"
                                                                                        aria-labelledby={`desktop-featured-heading-${vendorIdx}`}
                                                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                    >
                                                                                        {vendor.featured.map((item) => (
                                                                                            <li key={item.name} className="flex">
                                                                                                <a href={item.href} className="hover:text-gray-800">
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
                                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                        </button>

                                        {/* Search */}
                                        {/* Search */}
                                        <button
                                            onClick={() => setSearchModalOpen(true)}
                                            className="ml-2 p-2 text-gray-400 hover:text-gray-500"
                                        >
                                            <span className="sr-only">Search</span>
                                            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>

                                        {/* Search Modal */}
                                        {searchModalOpen && (
                                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
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
                                                            <div className="p-4">
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
                                                                                    <p className="text-sm text-gray-500">{product.quantity}</p>
                                                                                </div>
                                                                                <button
                                                                                    className="absolute top-2 right-2"
                                                                                    onClick={() => handleRemoveFromCart(product.id)} // Call remove function
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
                                                                    <button className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark">
                                                                        Checkout
                                                                    </button>
                                                                </Link>
                                                                <p className="mt-6 text-center">
                                                                    <a href="/cart"
                                                                       className="text-sm font-medium text-secondary hover:text-primary">
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
