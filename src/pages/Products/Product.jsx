import React, {Fragment, useState, useEffect, useCallback} from 'react'
import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import {
    HeartIcon,
    MinusIcon,
    PlusIcon,
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import { server } from '../../Server.js';
import { assetServer } from "../../assetServer.js";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import ProductShare from "../../components/ProductShare.jsx";
import { useShoppingHooks } from "../../redux/useShoppingHooks.js";
import SingleProduct from "../../components/SingleProduct.jsx";
import {ShoppingCartIcon} from "@heroicons/react/24/outline/index.js";
import {HeartIcon as HeartIconSolid} from "@heroicons/react/24/solid/index.js";
import {toast} from "react-toastify";
import ProductReviews from "../../components/ProductReviews.jsx";
import ProductRating from "../../components/ProductRating.jsx";



export default function ProductPage( ) {
    const { productName } = useParams();
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [relatedProducts, setRelatedProducts] = useState([]);

    // Variations handling
    const [allVariations, setAllVariations] = useState([]);
    const [selectedVariation, setSelectedVariation] = useState(null);


    const {
        cartItems,
        wishlistItems,
        addProductToWishlist,
        removeProductFromWishlist,
        addProductToCart,
        removeProductFromCart,
        updateCartProductQuantity
    } = useShoppingHooks();

    const [quantity, setQuantity] = useState(1);

    const updateQuantity = useCallback(() => {
        if (product) {
            const cartItem = cartItems.find(item => item.id === product.id);
            setQuantity(cartItem ? cartItem.quantity : 1);
        }
    }, [product, cartItems]);

    useEffect(() => {
        updateQuantity();
    }, [updateQuantity]);

    const handleAddToCart = (e) => {
        e.preventDefault();

        const cartProduct = selectedVariation
            ? {
                ...selectedVariation,
                product_name: `${product.product_name} - ${selectedVariation.name}`,
                image: (() => {
                    try {
                        const images = JSON.parse(selectedVariation.images);
                        if (Array.isArray(images) && images.length > 0) {
                            return images[0];
                        }
                    } catch (e) {
                        if (Array.isArray(selectedVariation.images) && selectedVariation.images.length > 0) {
                            return selectedVariation.images[0]
                        }
                    }
                    //if no variation image, use main image if available
                    return product?.image && Array.isArray(product.image) && product.image.length > 0 ? product.image[0] : null;
                })(),
                quantity,
                variation_id: selectedVariation.id, // Add variation ID here
                product_id: product.id, // Ensure main product ID is also included for variations

            }
            : {
                ...product,
                image: product?.image && Array.isArray(product.image) && product.image.length > 0 ? product.image[0] : null,
                quantity,
                product_id: product.id,

            };

        addProductToCart(cartProduct);
        toast.success(`${quantity} ${cartProduct.product_name}${quantity > 1 ? 's' : ''} added to cart!`);
    };


    const handleRemoveFromCart = (e) => {
        e.preventDefault();
        const productIdToRemove = selectedVariation ? selectedVariation.id : product.id;
        removeProductFromCart(productIdToRemove);
        toast.success(`${product.product_name} removed from cart!`);
    };

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        if (newQuantity > 0) {
            setQuantity(newQuantity);
            if (cartItems.some(item => item.id === (selectedVariation ? selectedVariation.id : product.id))) {
                updateCartProductQuantity(selectedVariation ? selectedVariation.id : product.id, newQuantity);
            }
        }
    };

    // Prepare variations with main product as first variation
    const prepareVariations = (fetchedProduct) => {
        const mainProductVariation = {
            id: fetchedProduct.id,
            name: 'Main Product',
            price: fetchedProduct.group === "1" ? fetchedProduct.group_price : fetchedProduct.price,
            images: fetchedProduct.image || [],
            stock: fetchedProduct.stock || 0,
            sku: fetchedProduct.sku || '',
        };

        const otherVariations = fetchedProduct.variations || [];
        const combinedVariations = [mainProductVariation, ...otherVariations];

        setAllVariations(combinedVariations);
        setSelectedVariation(mainProductVariation);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${server}/product/${encodeURIComponent(productName)}`);
                const fetchedProduct = response.data.product;

                setProduct(fetchedProduct);
                prepareVariations(fetchedProduct);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Failed to load product details');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productName]);



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${server}/products`);

                // Filter products for "active" status
                const activeProducts = response.data.products.filter(
                    (product) => product.status === 'active'
                );

                setProducts(activeProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);


    useEffect(() => {
        if (product && products.length > 0) {
            const filtered = products
                .filter((p) => p.id !== product.id)
                .sort(() => 0.5 - Math.random())
                .slice(0, 4);
            setRelatedProducts(filtered);
        }
    }, [product, products]);

    const handleVariationSelect = (variation) => {
        setSelectedVariation(variation);
        setSelectedImage(0); // Reset to first image of variation
    };

    const getCurrentImages = () => {
        // Priority: Variation images, then product images
        return selectedVariation?.images || product?.image || [];
    };

    const getCurrentPrice = () => {
        return selectedVariation?.price ||
            (product?.group === "1" ? product.group_price : product.price);
    };

    const isItemInCart = () => {
        const idToCheck = selectedVariation ? selectedVariation.id : product.id;
        return cartItems.some(item => item.id === idToCheck);  // Corrected ID check
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

    const isInWishlist = product ? wishlistItems.some(item => item.id === product.id) : false;


    const handleMouseEnter = () => setIsZoomed(true);
    const handleMouseLeave = () => setIsZoomed(false);
    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100;
        const y = (e.pageY - top) / height * 100;
        setMousePosition({ x, y });
    };

    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-pulse rounded-lg bg-gray-200 p-4">
                <div className="h-4 bg-gray-300 rounded-full w-48 mb-4"></div>
                <div className="h-2 bg-gray-300 rounded-full w-32 mb-4"></div>
                <div className="h-2 bg-gray-300 rounded-full w-24 mb-4"></div>
                <div className="h-2 bg-gray-300 rounded-full w-16 mb-4"></div>
            </div>
        </div>
    );
    if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
    if (!product) return <div className="text-center py-8">Product not found</div>;



    return (
        <>
            <Header/>

            <div className="bg-white">
                <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:max-w-none">
                        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                            {/* Image gallery */}
                            <div className="flex flex-col">
                                <div
                                    className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg relative"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    onMouseMove={handleMouseMove}
                                >
                                    {getCurrentImages().length > 0 ? (
                                        <>
                                            <img
                                                src={`${assetServer}/images/products/${getCurrentImages()[selectedImage]}`}
                                                alt={product.product_name}
                                                className={`w-full h-full object-cover transition-transform duration-200 ${isZoomed ? 'scale-150' : ''}`}
                                                style={isZoomed ? { transformOrigin: `${mousePosition.x}% ${mousePosition.y}%` } : {}}
                                            />
                                            {(product?.quantity <= 0) && (
                                                <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center text-white text-xl font-bold">
                                                    Out of Stock
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg"></div>
                                    )}
                                </div>



                                {/* Image Thumbnails */}
                                <div className="mt-4 grid grid-cols-4 gap-2">
                                    {getCurrentImages().map((image, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={`${assetServer}/images/products/${image}`}
                                                alt={`${product.product_name} - Image ${index + 1}`}
                                                className={`cursor-pointer rounded-md ${selectedImage === index ? 'ring-2 ring-indigo-500' : ''}`}
                                                onClick={() => setSelectedImage(index)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Product info */}
                            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                                    {selectedVariation
                                        ? `${product.product_name} - ${selectedVariation.name}`
                                        : product.product_name
                                    }
                                </h1>

                                <div className="mt-3">
                                    <h2 className="sr-only">Product information</h2>
                                    <p className="text-3xl tracking-tight text-primary">
                                        ${getCurrentPrice()}
                                    </p>
                                    {/*{selectedVariation && (*/}
                                    {/*    <p className="text-sm text-gray-500">*/}
                                    {/*        Stock: {selectedVariation.stock} available*/}
                                    {/*    </p>*/}
                                    {/*)}*/}
                                </div>

                                <form className="mt-6">
                                    {/* Buttons */}

                                    <div className="mt-10 flex">

                                        {product.group !== "1" && (
                                            isItemInCart() ? (
                                                <button
                                                    onClick={handleRemoveFromCart}
                                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                                >
                                                    Remove from Cart
                                                </button>
                                            ) : (product?.quantity <= 0) ? (// Out of stock condition
                                                <button
                                                    disabled
                                                    className="relative w-full flex items-center justify-center rounded-md border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed"
                                                >
                                                    Out of Stock
                                                </button>
                                            ) : (// Add to cart button (when in stock and not in cart)
                                                <button
                                                    onClick={handleAddToCart}
                                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50"
                                                >
                                                    Add to cart
                                                </button>
                                            )
                                        )}
                                        <div className="">
                                            {product.group === "1" && (
                                                <>
                                                    <Link to={`/group-orders`}>
                                                        <button
                                                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50 mb-5">
                                                            Create or Join Group
                                                            <span className="sr-only">, {product.product_name}</span>
                                                        </button>
                                                    </Link>
                                                </>
                                            )}
                                            {product.group === "1" && (
                                                <>
                                                    <Link to={`/group-orders`}>
                                                        <button
                                                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50 mb-5"
                                                            disabled={product?.quantity <= 0}
                                                        >
                                                            Create or Join Group
                                                            <span className="sr-only">, {product.product_name}</span>
                                                        </button>
                                                    </Link>
                                                    {/* Conditionally render remove or add to cart button */}
                                                    {cartItems.some(item => item.id === product.id) ? (
                                                        <button
                                                            onClick={handleRemoveFromCart}
                                                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                                        >
                                                            Remove from Cart
                                                        </button>
                                                    ) : (product?.quantity <= 0) ? ( // Check stock for both product and variation
                                                        <button
                                                            disabled
                                                            className="relative w-full flex items-center justify-center rounded-md border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed"
                                                        >
                                                            Out of Stock
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={handleAddToCart}
                                                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50"
                                                        >
                                                            Add to cart
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </div>

                                        <div className="flex items-center ml-4">
                                            <button
                                                type="button"
                                                onClick={() => handleQuantityChange({target: {value: quantity - 1}})}
                                                className="bg-gray-200 hover:bg-gray-300 rounded-l border border-gray-300 px-2 py-1"
                                            >
                                                -
                                            </button>
                                            <input
                                                type="text"
                                                min="1"
                                                value={quantity}
                                                onChange={handleQuantityChange}
                                                className="w-12 text-center rounded-none border border-gray-300 px-2 py-2"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleQuantityChange({target: {value: quantity + 1}})}
                                                className="bg-gray-200 hover:bg-gray-300 rounded-r border border-gray-300 px-2 py-1"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={handleWishlist}
                                            className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                                            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                                        >
                                            {isInWishlist ? (
                                                <HeartIconSolid className="h-6 w-6 text-red-600 flex-shrink-0"/>
                                            ) : (
                                                <HeartIcon className="h-6 w-6 text-gray-600 flex-shrink-0"/>
                                            )}
                                        </button>


                                    </div>
                                </form>


                                <section aria-labelledby="details-heading" className="mt-12">
                                    <h2 id="details-heading" className="sr-only">
                                        Additional details
                                    </h2>

                                    {/* Product details */}
                                    <div
                                        className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">

                                        <div className="mt-10 border-t border-gray-200 pt-10">
                                            <h3 className="text-sm font-medium text-gray-900">Details</h3>
                                            <div className="prose prose-sm mt-4 text-gray-500">
                                                <ul role="list">
                                                    <li>Category: <Link to={`/category/${product.category}`}
                                                                        className="font-medium text-indigo-600 hover:text-indigo-500">{product.category}</Link>
                                                    </li>
                                                    <li>Sub Category: <Link to={`/subcategory/${product.subcategory}`}
                                                                            className="font-medium text-indigo-600 hover:text-indigo-500">{product.subcategory}</Link>
                                                    </li>
                                                    <li>Vendor: <Link to={`/vendor/products/${product.vendor_id}`}
                                                                      className="font-medium text-indigo-600 hover:text-indigo-500">{product.store_name}</Link>
                                                    </li>
                                                    <li>Unit: {product.unit}</li>
                                                    <li>Weight/Pieces: {product.shipping_weight}</li>

                                                </ul>
                                            </div>
                                        </div>

                                        <div className="mt-10 border-t border-gray-200 pt-10">
                                            {/* Variation Selector */}
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-900 mb-2">Select
                                                    Variation</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {allVariations.map((variation) => (
                                                        <button
                                                            key={variation.id}
                                                            onClick={() => handleVariationSelect(variation)}
                                                            className={`px-3 py-1 border rounded-md text-sm ${
                                                                selectedVariation?.id === variation.id
                                                                    ? 'bg-primary text-white'
                                                                    : 'bg-white text-gray-600'
                                                            }`}
                                                        >
                                                            {variation.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {user && ( // Conditionally render based on user login
                                            <div className="mt-10 border-t border-gray-200 pt-10">
                                                <h3 className="text-sm font-medium text-gray-900">Contact Vendor</h3>
                                                <Link to={`/messages?vendorId=${product.vendor_id}`}>
                                                    <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md">
                                                        Message Vendor
                                                    </button>
                                                </Link>
                                            </div>
                                        )}

                                        <div className="mt-10 border-t border-gray-200 pt-10">
                                            <h3 className="text-sm font-medium text-gray-900">Share</h3>
                                            <ProductShare product={product}/>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>

                        {/* Reviews */}
                        <ProductReviews productId={product.id} vendorId={product.vendor_id}/>


                        {!loading && relatedProducts.length > 0 && (
                            <section aria-labelledby="related-heading"
                                     className="mt-10 border-t border-gray-200 px-4 py-16 sm:px-0">
                                <h2 id="related-heading" className="text-xl font-bold text-gray-900">
                                    Customers also bought
                                </h2>

                                <div
                                    className="mt-8 grid grid-cols-2 sm:grid-cols-2 gap-y-12 gap-x-4 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                                    {relatedProducts.map((product) => (
                                        <SingleProduct
                                            key={product.id}
                                            productId={product.id}
                                            productName={product.product_name}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </main>
            </div>


            <Footer/>

        </>
    )
}
