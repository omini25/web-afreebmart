import SingleProduct from "./SingleProduct.jsx";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { server } from '../Server';
import { Link } from "react-router-dom";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function BulkProductListing() {
    const [activeTab, setActiveTab] = useState('All');
    const [products, setProducts] = useState([]);
    const [tabs, setTabs] = useState([{ name: 'All', href: 'javascript:void(0)', current: true }]);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${server}/group-products`);
                if (Array.isArray(response.data.group_products)) {
                    const filteredProducts = response.data.group_products.filter(
                        (product) => product.status !== 'pending' && product.status !== 'suspended'
                    );
                    setProducts(filteredProducts);

                    // Generate tabs dynamically
                    const uniqueCategories = [
                        ...new Set(filteredProducts.map(product => product.category))
                    ];
                    setTabs([
                        { name: 'All', href: 'javascript:void(0)', current: true },
                        ...uniqueCategories.map(category => ({
                            name: category,
                            href: 'javascript:void(0)',
                            current: false
                        }))
                    ]);
                } else {
                    console.error('Unexpected API response structure:', response.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product => {
        if (activeTab === 'All') return true;
        return product.category.toLowerCase() === activeTab.toLowerCase();
    });

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="flex justify-between items-center sm:items-center mb-8">
                    <div className="flex items-center justify-between mb-4 sm:mb-0">
                        <h1 className="text-2xl font-bold">Bulk Products</h1>
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
            <div className="flex justify-center">
                <a
                    href="/bulk-shop"
                    className="mt-8 inline-block rounded-md border border-transparent bg-newColor px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                >
                    View All Bulk Products
                </a>
            </div>
        </div>
    );
}