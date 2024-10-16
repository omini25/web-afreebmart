import SingleProduct from "./SingleProduct.jsx";
import React, { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import { server } from '../Server';
import { Link } from "react-router-dom";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const CACHE_KEY = 'productListingCache';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export default function ProductListing() {
    const [activeTab, setActiveTab] = useState('All');
    const [products, setProducts] = useState([]);
    const [tabs, setTabs] = useState([{ name: 'All', href: 'javascript:void(0)', current: true }]);
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        localStorage.setItem('activeTab', tabName);
    };

    const saveToCache = (data) => {
        const cacheData = {
            timestamp: new Date().getTime(),
            data: data
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    };

    const loadFromCache = () => {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
            const { timestamp, data } = JSON.parse(cachedData);
            if (new Date().getTime() - timestamp < CACHE_EXPIRY) {
                return data;
            }
        }
        return null;
    };

    const processProducts = (productsData) => {
        const filteredProducts = productsData.filter(
            (product) => !product.group.includes("1") &&
                product.status !== 'pending' &&
                product.status !== 'suspended'
        );

        const uniqueCategories = [
            ...new Set(filteredProducts.map(product => {
                const regex = /^(.*?)(?:\s*\(.*\))?$/;
                const match = product.category.match(regex);
                return match ? match[1].trim() : product.category;
            }))
        ];

        setProducts(filteredProducts);
        setTabs([
            { name: 'All', href: 'javascript:void(0)', current: true },
            ...uniqueCategories.map(category => ({
                name: category,
                href: 'javascript:void(0)',
                current: false
            }))
        ]);

        return filteredProducts;
    };

    const fetchProducts = useCallback(async () => {
        try {
            let productsData;
            if (navigator.onLine) {
                const response = await axios.get(`${server}/products`);
                if (Array.isArray(response.data.products)) {
                    productsData = response.data.products;
                    saveToCache(productsData);
                } else {
                    throw new Error('Unexpected API response structure');
                }
            } else {
                productsData = loadFromCache();
                if (!productsData) {
                    throw new Error('No cached data available');
                }
            }

            processProducts(productsData);

            const savedTab = localStorage.getItem('activeTab');
            if (savedTab) {
                setActiveTab(savedTab);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            const cachedData = loadFromCache();
            if (cachedData) {
                processProducts(cachedData);
            }
        }
    }, []);

    useEffect(() => {
        fetchProducts();

        window.addEventListener('popstate', fetchProducts);
        window.addEventListener('online', () => setIsOffline(false));
        window.addEventListener('offline', () => setIsOffline(true));

        return () => {
            window.removeEventListener('popstate', fetchProducts);
            window.removeEventListener('online', () => setIsOffline(false));
            window.removeEventListener('offline', () => setIsOffline(true));
        };
    }, [fetchProducts]);

    const filteredProducts = products.filter(product => {
        if (activeTab === 'All') return true;

        const regex = /^(.*?)(?:\s*\(.*\))?$/;
        const match = product.category.match(regex);
        const categoryName = match ? match[1].trim() : product.category;

        return categoryName.toLowerCase() === activeTab.toLowerCase();
    });


    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                {isOffline && (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
                        <p className="font-bold">You are currently offline</p>
                        <p>Displaying cached data. Some information may not be up to date.</p>
                    </div>
                )}
                <div className="flex justify-between items-center sm:items-center mb-8">
                    <div className="flex items-center justify-between mb-4 sm:mb-0">
                        <h1 className="text-2xl font-bold">Main Products</h1>
                        <div className="sm:hidden mx-5">
                            <label htmlFor="tabs" className="sr-only">
                                Select a tab
                            </label>
                            <select
                                id="tabs"
                                name="tabs"
                                className="block w-full rounded-md border-gray-300 focus:border-newColor focus:ring-newColor"
                                value={activeTab}
                                onChange={(e) => handleTabClick(e.target.value)}
                            >
                                {tabs.map((tab) => (
                                    <option key={tab.name} value={tab.name}>
                                        {tab.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                </div>
                <div className="hidden sm:block">
                    <nav className="flex space-x-4 justify-end" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <a
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                    tab.name === activeTab ? 'bg-newColor text-white' : 'text-gray-500 hover:text-gray-700',
                                    'rounded-md px-3 py-2 text-m font-medium'
                                )}
                                onClick={() => handleTabClick(tab.name)}
                                aria-current={tab.name === activeTab ? 'page' : undefined}
                            >
                                {tab.name}
                            </a>
                        ))}
                    </nav>
                </div>

                <div
                    className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-x-6 mt-8">
                    {filteredProducts.map((product) => (
                        <SingleProduct key={product.id} productId={product.id} productName={product.product_name}/>
                    ))}
                </div>

            </div>
            <div className="flex justify-center mb-10">
                <a
                    href="/shop"
                    className="inline-block rounded-md border border-transparent bg-newColor px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                >
                   View All Products
                </a>
            </div>
        </div>
    );
}