import { useState, useEffect } from 'react';
import { HeartIcon, EyeIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import axios from 'axios';
import { server } from '../Server';
import { assetServer } from "../assetServer.js";
import QuickView from './QuickView';
import { Link } from "react-router-dom";
import { useShoppingHooks } from '../redux/useShoppingHooks.js';
import { toast } from "react-toastify";

export default function SingleProduct({ productId, productName }) {
    const [product, setProduct] = useState(null);
    const [showQuickView, setShowQuickView] = useState(false);
    const {
        cartItems,
        wishlistItems,
        addProductToCart,
        removeProductFromCart,
        addProductToWishlist,
        removeProductFromWishlist,
        initializeFromLocalStorage
    } = useShoppingHooks();

    useEffect(() => {
        initializeFromLocalStorage();
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${server}/product/${productName}`);
                setProduct(response.data.product);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId, productName]);

    if (!product) {
        return <div className="animate-pulse bg-gray-200 h-64 w-64 rounded-lg"></div>;
    }

    const handleQuickView = (e) => {
        e.preventDefault();
        setShowQuickView(true);
    };

    const handleAddToCart = () => {
        addProductToCart(product);
        toast.success(`${product.product_name} added to cart!`);
    };

    const handleRemoveFromCart = () => {
        removeProductFromCart(product.id);
        toast.success(`${product.product_name} removed from cart!`);
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        const isInWishlist = wishlistItems.some(item => item.id === product.id);
        if (isInWishlist) {
            removeProductFromWishlist(product.id);
            toast.success(`${product.product_name} removed from wishlist!`);
        } else {
            addProductToWishlist({
                id: product.id,
                name: product.product_name,
                price: product.price,
                image: `${assetServer}/images/products/${product.image}`,
            });
            toast.success(`${product.product_name} added to wishlist!`);
        }
    };

    const isInWishlist = wishlistItems.some(item => item.id === product.id);

    return (
        <div className="group relative">
            <div className="relative w-52 h-52 overflow-hidden">
                <img
                    src={`${assetServer}/images/products/${product.image}`}
                    alt={product.product_name}
                    className="w-full h-full object-cover object-center transition-all duration-300 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-4">
                        <button
                            onClick={handleQuickView}
                            className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-md"
                            aria-label="Quick view"
                        >
                            <EyeIcon className="h-6 w-6 text-gray-600"/>
                        </button>
                        <button
                            onClick={handleWishlist}
                            className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-md"
                            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                        >
                            {isInWishlist ? (
                                <HeartIconSolid className="h-6 w-6 text-red-600"/>
                            ) : (
                                <HeartIcon className="h-6 w-6 text-gray-600"/>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-sm font-medium text-gray-900">
                            <Link to={`/product/${encodeURIComponent(product.product_name)}`}>
                                {product.product_name.length > 20 ? product.product_name.substring(0, 20) + '...' : product.product_name}
                            </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">By: {product.store_name}</p>
                    </div>
                    <p className="text-sm font-medium text-primary">${product.price}</p>
                </div>
                <div className="mt-2">
                    {cartItems.some(item => item.id === product.id) ? (
                        <button onClick={handleRemoveFromCart}
                                className="relative w-full flex items-center justify-center rounded-md border border-transparent bg-secondary px-4 py-2 text-sm font-medium text-gray-900 hover:bg-primary">
                            Remove from cart
                            <span className="sr-only">, {product.product_name}</span>
                        </button>
                    ) : (
                        product.group === "1" ? (
                            <Link to={`/group-order`}>
                                <button
                                    className="relative w-full flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-gray-900 hover:bg-secondary">
                                    Create or Join Group
                                    <span className="sr-only">, {product.product_name}</span>
                                </button>
                            </Link>
                        ) : (
                            <button
                                onClick={handleAddToCart}
                                className="relative w-full flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-gray-900 hover:bg-secondary"
                            >
                                <ShoppingCartIcon className="h-5 w-5 mr-2 text-gray-600" aria-hidden="true"/>
                                Add to cart
                                <span className="sr-only">, {product.product_name}</span>
                            </button>
                        )
                    )}
                </div>
            </div>

            {showQuickView && (
                <QuickView
                    productName={product.product_name}
                    open={showQuickView}
                    setOpen={setShowQuickView}
                />
            )}
        </div>
    );
}