import {Fragment} from 'react'
import {
    CalendarDaysIcon,
    CreditCardIcon,
    CubeIcon,
    MapPinIcon, RectangleGroupIcon,
    UserCircleIcon, ChatBubbleBottomCenterIcon,
} from '@heroicons/react/24/outline'
import Header from "../../components/Header.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {server} from "../../Server.js";
import {useNavigate, useParams} from "react-router-dom";
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import {toast} from "react-toastify";


const secondaryNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: UserCircleIcon, current: false },
    { name: 'Orders', href: '/orders', icon: CubeIcon, current: false },
    { name: 'Group Orders', href: '/group-orders', icon: RectangleGroupIcon, current: false },
    { name: 'Messages', href: '/messages', icon: ChatBubbleBottomCenterIcon, current: false },
    { name: 'Payments', href: '/payments', icon: CreditCardIcon, current: true },
    { name: 'Addresses', href: '/address', icon: MapPinIcon, current: false },
    { name: 'Account', href: '/account', icon: UserCircleIcon, current: false },
]



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Invoice() {
    const {invoiceId} = useParams();
    const [invoices, setInvoices] = useState([]); // Changed to invoices (plural)
    const [isLoading, setIsLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const navigate = useNavigate();
    const logoUrl = 'https://afreebmart.com/assets/afreemart-logo-CUreYwDY.png';

    useEffect(() => {
        // Check if localStorage.isLoggedIn is true
        if (localStorage.getItem('isLoggedIn') === 'false') {
            // Redirect to /dashboard
            navigate('/login');
            // Show a toast notification
            toast.warning('You need to login to access the page');
        }
    }, [navigate]);



    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.get(`${server}/users/payments/details/${invoiceId}`);
                setInvoices(response.data);
                console.log("Response Data:", response.data);  // Log the entire response data
                console.log("invoices state:", invoices); // Log the state after setting it
            } catch (error) {
                console.error('Error fetching invoices:', error);
                // Add error handling if necessary. Set a loading state or error message.
            } finally {
                setIsLoading(false);
            }
        };
        fetchInvoices();
    }, [invoiceId]);

    console.log(invoices)

    const handleDownloadReceipt = () => {
        try {
            // Check if orders array exists and is not empty
            if (!invoices || !invoices.orders || invoices.orders.length === 0) {
                toast.error('No order details available.');
                return;
            }

            const doc = new jsPDF();

            // Set font
            doc.setFont('Helvetica');

            // Add receipt title
            doc.setFontSize(22);
            doc.setTextColor(44, 62, 80);
            doc.text('Afreebmart Receipt', 105, 20, { align: 'center' });

            // Add invoice details
            doc.setFontSize(10);
            doc.setTextColor(52, 73, 94);
            doc.text(`Invoice ID: ${invoices.payment.id || 'N/A'}`, 10, 40);

            // Safely handle date parsing
            const createdAt = invoices.payment?.created_at
                ? new Date(invoices.payment.created_at).toLocaleDateString()
                : 'N/A';

            doc.text(`Issued on: ${createdAt}`, 10, 45);
            doc.text(`Paid on: ${createdAt}`, 10, 50);

            // Add separator line
            doc.setDrawColor(189, 195, 199);
            doc.line(10, 55, 200, 55);

            // Add customer details
            doc.setFontSize(12);
            doc.setTextColor(44, 62, 80);
            doc.text('Billed To:', 10, 65);
            doc.setFontSize(10);
            doc.setTextColor(52, 73, 94);

            // Safely access customer details
            doc.text(`User: ${invoices?.orders?.[0]?.user_name || 'N/A'}`, 10, 70);

            // Add order details
            doc.setFontSize(14);
            doc.setTextColor(44, 62, 80);
            doc.text('Order Summary', 105, 90, { align: 'center' });

            // Prepare data for multiple orders
            const headers = [['Product', 'Price', 'Quantity', 'Total']];
            const data = invoices.orders.map(order => [
                order.product_name || 'Unknown Product',
                `$${(typeof order.price === 'number' ? order.price : parseFloat(order.price) || 0).toFixed(2)}`, // Convert to number if needed
                order.quantity || 0,
                `$${( (typeof order.price === 'number' ? order.price : parseFloat(order.price) || 0 )* (order.quantity || 0)).toFixed(2)}` // Use parseFloat and handle non-numeric price
            ]);

            // Add taxes and shipping as separate rows
            const taxes = invoices.orders.reduce((total, order) =>
                total + ((typeof order.price === 'number' ? order.price : parseFloat(order.price) || 0 )* (order.quantity || 0) * 0.05), 0);

            data.push(
                ['Taxes (5%)', '', '', `$${taxes.toFixed(2)}`],
                ['Shipping', '', '', '$4.99']
            );

            // Create table
            autoTable(doc, {
                head: headers,
                body: data,
                startY: 95,
                theme: 'striped',
                headStyles: { fillColor: [52, 152, 219], textColor: 255 },
                bodyStyles: { textColor: 50 },
                alternateRowStyles: { fillColor: [241, 245, 249] },
            });

            // Calculate total amount
            const subtotal = invoices.orders.reduce((total, order) =>
                total + ((order.price || 0) * (order.quantity || 0)), 0);
            const totalWithTaxesAndShipping = subtotal + taxes + 4.99;

            // Add total amount
            doc.setFontSize(12);
            doc.setTextColor(44, 62, 80);
            doc.setFont('Helvetica', 'bold');
            doc.text(`Total: $${totalWithTaxesAndShipping.toFixed(2)}`, 190, doc.lastAutoTable.finalY + 10, { align: 'right' });

            // Add footer
            doc.setFontSize(8);
            doc.setTextColor(127, 140, 141);
            doc.text('Thank you for your purchase!', 105, 280, { align: 'center' });
            doc.text('For any questions, please contact support@afreebmart.com', 105, 285, { align: 'center' });

            // Save and download the PDF
            doc.save(`Afreebmart_Receipt_${invoices.payment.id || 'receipt'}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            toast.error('Failed to generate receipt. Please try again.');
        }
    };

// Helper function to generate PDF without logo
    const handleDownloadReceiptWithoutLogo = () => {
        const doc = new jsPDF();
        // ... (same PDF generation code as above, without the logo part)
        // This ensures the user can still get a receipt even if the logo fails to load
    };

// Function to convert image to Base64
    function getBase64Image(img) {
        try {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL("image/png");
            return dataURL;
        } catch (error) {
            console.error("Error in getBase64Image:", error);
            return null;
        }
    }



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
                    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                        <div
                            className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                            {/* Invoice summary */}
                            <div className="lg:col-start-3 lg:row-end-1">
                                <h2 className="sr-only">Summary</h2>
                                <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                                    <dl className="flex flex-wrap">
                                        <div className="flex-auto pl-6 pt-6">
                                            <dt className="text-sm font-semibold leading-6 text-gray-900">Amount</dt>
                                            <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">
                                                ${invoices?.payment?.total_cost || 0} {/* Use optional chaining and provide a default */}
                                            </dd>
                                        </div>
                                        <div className="flex-none self-end px-6 pt-4">
                                        <dt className="sr-only">Status</dt>
                                            <dd className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
                                                {invoices?.payment?.payment_status || 'N/A'}
                                            </dd>
                                        </div>
                                        <div
                                            className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                                            <dt className="flex-none">
                                                <span className="sr-only">Client</span>
                                                <UserCircleIcon className="h-6 w-5 text-gray-400" aria-hidden="true"/>
                                            </dt>
                                            <dd className="text-sm font-medium leading-6 text-gray-900">
                                                {invoices?.orders?.length > 0 ? invoices.orders[0].user_name : "N/A"}
                                            </dd>
                                        </div>
                                        <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                                            <dt className="flex-none">
                                            <span className="sr-only">Date Created</span>
                                                <CalendarDaysIcon className="h-6 w-5 text-gray-400" aria-hidden="true"/>
                                            </dt>
                                            <dd className="text-sm leading-6 text-gray-500">
                                                <time
                                                    dateTime="2023-01-31">{new Date(invoices?.payment?.created_at || 'N/A').toLocaleDateString('en-US', {
                                                    month: 'long',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}</time>
                                            </dd>
                                        </div>
                                        <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                                            <dt className="flex-none">
                                                <span className="sr-only">Status</span>
                                                <CreditCardIcon className="h-6 w-5 text-gray-400" aria-hidden="true"/>
                                            </dt>
                                            <dd className="text-sm leading-6 text-gray-500">Paid with - {invoices?.payment?.payment_method || 'N/A'}</dd>
                                        </div>
                                    </dl>
                                    <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                                        <button
                                            onClick={handleDownloadReceipt}
                                            className="text-sm font-semibold leading-6 text-gray-900"
                                        >
                                            Download receipt <span aria-hidden="true">&rarr;</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Invoice */}
                            <div
                                className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
                                <h2 className="text-base font-semibold leading-6 text-gray-900">Invoice</h2>
                                <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                                    <div className="sm:pr-4">
                                        <dt className="inline text-gray-500">Issued on</dt>
                                        {' '}
                                        <dd className="inline text-gray-700">
                                            <time dateTime="2023-23-01">
                                                {Array.isArray(invoices.order) && invoices.order.length > 0
                                                    ? new Date(invoices.order[0].created_at).toLocaleDateString('en-US', {
                                                        month: 'long',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })
                                                    : invoices?.order?.created_at
                                                        ? new Date(invoices.order.created_at).toLocaleDateString('en-US', {
                                                            month: 'long',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })
                                                        : ''}
                                                {/* Provide a default value or placeholder if invoices.order or created_at is missing/invalid */}
                                            </time>
                                        </dd>
                                    </div>
                                    <div className="mt-2 sm:mt-0 sm:pl-4">
                                        <dt className="inline text-gray-500">Paid on</dt>
                                        {' '}
                                        <dd className="inline text-gray-700">
                                            <time
                                                dateTime="2023-31-01">{new Date(invoices?.payment?.created_at || 'N/A').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                                        </dd>
                                    </div>
                                    <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                                        <dt className="font-semibold text-gray-900">From</dt>
                                        <dd className="mt-2 text-gray-500">
                                            <span className="font-medium text-gray-900">Afreebmart</span>
                                            <br/>
                                            Wisconsin USA

                                        </dd>
                                    </div>
                                    <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                                        <dt className="font-semibold text-gray-900">To</dt>
                                        <dd className="mt-2 text-gray-500">
                                            <span className="font-medium text-gray-900">
                                              {invoices?.orders?.length > 0 ? invoices.orders[0].user_name : "N/A"}
                                            </span>
                                            <br/>
                                            {invoices?.orders && invoices.orders.length > 0 ? invoices.orders[0].shipping_address : "N/A"}

                                        </dd>
                                    </div>
                                </dl>
                                <table className="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
                                    <colgroup>
                                        <col className="w-full"/>
                                        <col/>
                                        <col/>
                                        <col/>
                                    </colgroup>
                                    <thead className="border-b border-gray-200 text-gray-900">
                                    <tr>
                                        <th scope="col" className="px-0 py-3 font-semibold">
                                            Product
                                        </th>
                                        <th scope="col"
                                            className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
                                            Product Price
                                        </th>
                                        <th scope="col"
                                            className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
                                            Quantity
                                        </th>
                                        <th scope="col" className="py-3 pl-8 pr-0 text-right font-semibold">
                                            Price
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {invoices?.orders?.map((order, index) => (
                                        <tr key={index} className="border-b border-gray-100">
                                            <td className="max-w-0 px-0 py-5 align-top">
                                                <div
                                                    className="truncate font-medium text-gray-900">{order.product_name}</div>
                                                <div className="truncate text-gray-500">{order.description}</div>
                                            </td>
                                            <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                                                ${order.price}
                                            </td>
                                            <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                                                {order.quantity}
                                            </td>
                                            <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">
                                                ${(order.price * order.quantity).toFixed(2)}
                                            </td>
                                        </tr>
                                    )) || (
                                        <tr> {/* Display a message if there are no orders */}
                                            <td colSpan="4" className="text-center py-5">No orders found for this
                                                invoice.
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                    <tbody>
                                    <tr className="border-b border-gray-100">
                                        <td className="max-w-0 px-0 py-5 align-top">
                                            <div className="truncate font-medium text-gray-900">Delivery Fees</div>
                                        </td>
                                        <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                                            $ 5.99
                                        </td>
                                        <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                                            1
                                        </td>
                                        <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">$
                                            5.99
                                        </td>
                                    </tr>

                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <th scope="row" className="px-0 pb-0 pt-6 font-normal text-gray-700 sm:hidden">
                                            Subtotal
                                        </th>
                                        <th
                                            scope="row"
                                            colSpan={3}
                                            className="hidden px-0 pb-0 pt-6 text-right font-normal text-gray-700 sm:table-cell"
                                        >
                                            Subtotal
                                        </th>
                                        <td className="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-gray-900">
                                            $
                                            {(
                                                invoices?.orders?.reduce((total, order) => total + order.price * order.quantity, 0) + 5.99 || 0
                                            ).toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="pt-4 font-normal text-gray-700 sm:hidden">
                                        Tax
                                        </th>
                                        <th
                                            scope="row"
                                            colSpan={3}
                                            className="hidden pt-4 text-right font-normal text-gray-700 sm:table-cell"
                                        >
                                            Tax
                                        </th>
                                        <td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-gray-900">${(invoices?.orders?.reduce((totalTax, order) => totalTax + (order.price * order.quantity), 0) * 0.05 || 0).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="pt-4 font-semibold text-gray-900 sm:hidden">
                                            Total
                                        </th>
                                        <th
                                            scope="row"
                                            colSpan={3}
                                            className="hidden pt-4 text-right font-semibold text-gray-900 sm:table-cell"
                                        >
                                            Total
                                        </th>
                                        <td className="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-gray-900">
                                            ${invoices?.payment?.total_cost || 0}
                                        </td>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>


                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}


