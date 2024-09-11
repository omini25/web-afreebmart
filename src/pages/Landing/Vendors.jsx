import { useState, useEffect } from 'react';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import axios from "axios";
import {server} from "../../Server.js";
import {BuildingStorefrontIcon} from "@heroicons/react/24/outline/index.js";

export default function Vendors() {
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        // Replace with your actual API endpoint
        axios.get(`${server}/vendors`)
            .then(response => {
                setVendors(response.data);
            })
            .catch(error => console.error('Error fetching vendors:', error));
    }, []);


    return (
        <>
            <Header/>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-5">
                <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {vendors.map((vendor) => (
                        <li key={vendor.id} // Assuming your API provides a unique ID
                            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                            <div className="flex w-full items-center justify-between space-x-6 p-6">
                                <div className="flex-1 truncate">
                                    <div className="flex items-center space-x-3">
                                        <h3 className="truncate text-sm font-medium text-gray-900">{vendor.store_name}</h3>
                                        {/*<span*/}
                                        {/*    className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">*/}
                                        {/*  {vendor.role}*/}
                                        {/*</span>*/}
                                    </div>
                                    <p className="mt-1 truncate text-sm text-gray-500">{vendor.store_description}</p>
                                </div>

                            </div>
                            <div>
                                <div className="-mt-px flex divide-x divide-gray-200">
                                    {/*<div className="flex w-0 flex-1">*/}
                                    {/*    <a*/}
                                    {/*        href={`mailto:${vendor.email}`}*/}
                                    {/*        className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"*/}
                                    {/*    >*/}
                                    {/*        <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>*/}
                                    {/*        Message Vendor*/}
                                    {/*    </a>*/}
                                    {/*</div>*/}
                                    <div className="-ml-px flex w-0 flex-1">
                                        <a
                                            href={`/vendor/products/${vendor.id}`}
                                            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                        >
                                            <BuildingStorefrontIcon className="h-5 w-5 text-gray-400"
                                                                    aria-hidden="true"/>
                                            View Products
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <Footer/>
        </>
    )
}