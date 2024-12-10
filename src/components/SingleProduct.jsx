import React, {useState, useEffect, useRef} from 'react';
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
    const [quantity, setQuantity] = useState(1)
    const [showQuickView, setShowQuickView] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [autoPlay, setAutoPlay] = useState(false); // Initialize autoPlay to false
    const [mouseOver, setMouseOver] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (mouseOver && product?.image?.length > 1) { // Only autoplay on hover
            intervalRef.current = setInterval(() => {
                setSelectedImage(prevIndex => (prevIndex + 1) % product.image.length);
            }, 5000);
        } else {
            clearInterval(intervalRef.current); // Clear interval if not hovering
        }

        return () => clearInterval(intervalRef.current); // Cleanup on unmount/dependency change
    }, [mouseOver, product?.image]); // Dependency array includes mouseOver and product.image

    const handleMouseEnter = () => {
        setMouseOver(true);  // Start autoplay only on mouse enter
        setAutoPlay(true);
    };

    const handleMouseLeave = () => {
        setMouseOver(false); // Stop autoplay on mouse leave
        setAutoPlay(false)
    };


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
        addProductToCart({
            ...product,
            image: Array.isArray(product.image) && product.image.length > 0 ? product.image[0] : product.image,
            quantity,
            product_id: product.id,
        });
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
                image: Array.isArray(product.image) && product.image.length > 0 ? `${assetServer}/images/products/${product.image[0]}` : `${assetServer}/images/products/${product.image}`,
            });
            toast.success(`${product.product_name} added to wishlist!`);
        }
    };

    const isInWishlist = wishlistItems.some(item => item.id === product.id);

    return (
        <div className="group relative">
            <div className="relative w-full h-52 sm:h-64 overflow-hidden">
                <div
                    className="relative w-full h-96 overflow-hidden"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}

                >
                    {product?.image && Array.isArray(product.image) && product.image.length > 0 ? (
                        <>
                            <img
                                src={`${assetServer}/images/products/${product.image[selectedImage]}`}
                                alt={product.product_name}
                                className="w-full h-full object-cover object-center transition-all duration-300 ease-in-out group-hover:scale-105"
                            />
                            {product.quantity <= 0 && ( // Conditional overlay
                                <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center text-white text-xl font-bold">
                                    Out of Stock
                                </div>
                            )}
                            {/* Image selector buttons (optional) */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 flex justify-center">
                                {product.image.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setSelectedImage(index);
                                            setAutoPlay(false);
                                        }}
                                        className={`w-4 h-4 rounded-full mx-1 ${selectedImage === index ? 'bg-white' : 'bg-gray-300'}`}
                                        disabled={product.quantity <= 0} //Disable image select if out of stock
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg"></div>
                    )}
                </div>

                <div
                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                                {/* Shorten product name on smaller screens */}
                                <strong className="font-bold">
                                    {product.product_name.length > (window.innerWidth < 768 ? 20 : 25)
                                        ? product.product_name.substring(0, window.innerWidth < 768 ? 20 : 25) + '...'
                                        : product.product_name}
                                </strong>
                            </Link>
                        </h3>
                        <Link to={`/vendor/products/${product.vendor_id}`} className="mt-1 text-sm text-gray-500">
                            By: {product.store_name.length > 10 ? `${product.store_name.substring(0, 10)}...` : product.store_name}
                        </Link>
                    </div>
                    <p className="text-sm font-medium text-newColor sm:text-xs">
                        {/* Check if product.price is a number and if not, try converting it */}
                        ${(typeof product.price === 'number' ? product.price : parseFloat(product.price)).toFixed(1)}
                    </p>
                </div>
                <div className="mt-2">

                    {product.group !== "1" && (
                        product.quantity <= 0 ? ( // Check if out of stock
                            <button
                                disabled // Disable the button
                                className="relative w-full flex items-center justify-center rounded-md border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed" // Grayed-out styling
                            >
                                Out of Stock
                                <span className="sr-only">, {product.product_name}</span>
                            </button>
                        ) : cartItems.some(item => item.id === product.id) ? (//Check if item is in cart and show remove button else show add to cart
                            <button
                                onClick={handleRemoveFromCart}
                                className="relative w-full flex items-center justify-center rounded-md border border-transparent bg-secondary px-4 py-2 text-sm font-medium text-gray-900 hover:bg-primary"
                            >
                                Remove from cart
                                <span className="sr-only">, {product.product_name}</span>
                            </button>
                        ) : (
                            <button
                                onClick={handleAddToCart}
                                className="relative w-full flex items-center justify-center rounded-md border border-transparent bg-altBackground px-4 py-2 text-sm font-medium text-gray-900 hover:bg-newColor group"
                            >
                                <ShoppingCartIcon className="h-5 w-5 mr-2 text-newColor group-hover:text-white" aria-hidden="true" />
                                <p className="text-newColor group-hover:text-white">Add to cart</p>
                                <span className="sr-only">, {product.product_name}</span>
                            </button>
                        )
                    )}
                    {/* Rest of the component code */}

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