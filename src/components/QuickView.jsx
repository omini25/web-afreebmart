import React, { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import axios from 'axios'
import { server } from '../Server'
import { assetServer } from "../assetServer.js"
import ProductShare from "./ProductShare.jsx";
import { Link } from "react-router-dom";
import { useShoppingHooks } from "../redux/useShoppingHooks.js";
import { toast } from "react-toastify";
import {ShoppingCartIcon} from "@heroicons/react/24/outline/index.js";
import ProductRating from "./ProductRating.jsx";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function QuickView({ productName, open, setOpen }) {
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const { cartItems, addProductToCart, removeProductFromCart, updateCartProductQuantity } = useShoppingHooks();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${server}/product/${productName}`)
                setProduct(response.data.product)
            } catch (error) {
                console.error('Error fetching product:', error)
            }
        }

        if (open && productName) {
            fetchProduct()
        }
    }, [open, productName])

    const handleAddToCart = (e) => {
        e.preventDefault();
        const existingCartItem = cartItems.find(item => item.id === product.id);
        if (existingCartItem) {
            updateCartProductQuantity(product.id, existingCartItem.quantity + quantity);
            toast.success(`Updated ${product.product_name} quantity in cart to ${existingCartItem.quantity + quantity}!`);
        } else {
            addProductToCart({ ...product, quantity });
            toast.success(`${quantity} ${product.product_name}${quantity > 1 ? 's' : ''} added to cart!`);
        }
    };

    const handleRemoveFromCart = (e) => {
        e.preventDefault();
        removeProductFromCart(product.id);
        toast.success(`${product.product_name} removed from cart!`);
    };

    const handleQuantityChange = (value) => {
        setQuantity(Math.max(1, value));
    };

    if (!product) {
        return null
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            enterTo="opacity-100 translate-y-0 md:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 md:scale-100"
                            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        >
                            <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                    <button
                                        type="button"
                                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                                        <div className="sm:col-span-4 lg:col-span-5">
                                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100">
                                                <img src={`${assetServer}/images/products/${product.image}`} alt={product.product_name} className="object-cover object-center" />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-8 lg:col-span-7">
                                            <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product.product_name}</h2>

                                            <section aria-labelledby="information-heading" className="mt-4">
                                                <h3 id="information-heading" className="sr-only">
                                                    Product information
                                                </h3>

                                                <div className="flex items-center">
                                                    <p className="text-lg text-gray-900 sm:text-xl">${product.price}</p>

                                                    <div className="ml-4 border-l border-gray-300 pl-4">
                                                        <h4 className="sr-only">Reviews</h4>
                                                        {/* Reviews */}
                                                        <ProductRating productId={product.id} />
                                                    </div>
                                                </div>

                                                <div className="mt-6 flex items-center">
                                                    <p className="ml-2 font-medium text-gray-500">{product.description}</p>
                                                </div>
                                            </section>

                                            <section aria-labelledby="options-heading" className="mt-6">
                                                <h3 id="options-heading" className="sr-only">
                                                    Product options
                                                </h3>

                                                <form>

                                                    <div className="mt-6">
                                                        <div className="mt-6">
                                                            <div className="mt-6">
                                                                {/*{cartItems.some(item => item.id === product.id) ? (*/}
                                                                {/*    <button*/}
                                                                {/*        onClick={handleRemoveFromCart}*/}
                                                                {/*        className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"*/}
                                                                {/*    >*/}
                                                                {/*        Remove from Cart*/}
                                                                {/*    </button>*/}
                                                                {/*) : (*/}
                                                                {/*    <button*/}
                                                                {/*        onClick={handleAddToCart}*/}
                                                                {/*        className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-gray-50"*/}
                                                                {/*    >*/}
                                                                {/*        Add to cart*/}
                                                                {/*    </button>*/}
                                                                {/*)}*/}

                                                                {cartItems.some(item => item.id === product.id) ? (
                                                                    <button
                                                                        onClick={handleRemoveFromCart}
                                                                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                                                    >
                                                                        Remove from Cart
                                                                    </button>
                                                                ) : (
                                                                    product.group === "1" ? (
                                                                        <Link to={`/group-orders`}>
                                                                            <button
                                                                                className="mt-2 flex w-full items-center justify-center rounded-md border border-gray-300 px-8 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-gray-200"
                                                                            >
                                                                                Create or Join Group
                                                                            </button>
                                                                        </Link>
                                                                    ) : (
                                                                        <div className="flex items-center space-x-3">
                                                                            <div
                                                                                className="flex items-center rounded-md border border-gray-300">
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => handleQuantityChange(quantity - 1)}
                                                                                    className="px-3 py-2 text-gray-700 hover:bg-gray-50"
                                                                                >
                                                                                    -
                                                                                </button>
                                                                                <input
                                                                                    type="text"
                                                                                    value={quantity}
                                                                                    onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                                                                                    className="w-12 border-t border-b border-gray-300 px-3 py-2 text-center appearance-none"
                                                                                    min="1"
                                                                                />
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() => handleQuantityChange(quantity + 1)}
                                                                                    className="px-3 py-2 text-gray-700 hover:bg-gray-50"
                                                                                >
                                                                                    +
                                                                                </button>
                                                                            </div>
                                                                            <button
                                                                                onClick={handleAddToCart}
                                                                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-newColor px-8 py-3 text-base font-medium text-white hover:bg-altBackground focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-gray-50"
                                                                            >
                                                                                Add to cart
                                                                            </button>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                            <Link
                                                                to={`/product/${product.product_name}`}> {/* Assuming your product page route is /product/:productName */}
                                                                <button
                                                                    className="mt-2 flex w-full items-center justify-center rounded-md border border-gray-300 px-8 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-200"
                                                                >
                                                                    View Details
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </form>
                                            </section>

                                            <div className="mt-5 border-t border-gray-200 pt-5">
                                                <h3 className="text-sm font-medium text-gray-900">Share</h3>
                                                <ProductShare product={product}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}