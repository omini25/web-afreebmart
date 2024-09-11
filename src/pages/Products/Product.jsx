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


const reviews = {
    average: 4,
    totalCount: 1624,
    counts: [
        { rating: 5, count: 1019 },
        { rating: 4, count: 162 },
        { rating: 3, count: 97 },
        { rating: 2, count: 199 },
        { rating: 1, count: 147 },
    ],
    featured: [
        {
            id: 1,
            rating: 5,
            content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
            author: 'Emily Selman',
            avatarSrc:
                'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
        },
        // More reviews...
    ],
}



const license = {
    href: '#',
    summary:
        'For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.',
    content: `
    <h4>Overview</h4>
    
    <p>For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.</p>
    
    <ul role="list">
    <li>You\'re allowed to use the icons in unlimited projects.</li>
    <li>Attribution is not required to use the icons.</li>
    </ul>
    
    <h4>What you can do with it</h4>
    
    <ul role="list">
    <li>Use them freely in your personal and professional work.</li>
    <li>Make them your own. Change the colors to suit your project or brand.</li>
    </ul>
    
    <h4>What you can\'t do with it</h4>
    
    <ul role="list">
    <li>Don\'t be greedy. Selling or distributing these icons in their original or modified state is prohibited.</li>
    <li>Don\'t be evil. These icons cannot be used on websites or applications that promote illegal or immoral beliefs or activities.</li>
    </ul>
  `,
}


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function ProductPage( ) {
    const { productName } = useParams();
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


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
        e.preventDefault(); // Prevent form submission
        addProductToCart({ ...product, quantity: parseInt(quantity) });
    };

    const handleRemoveFromCart = (e) => {
        e.preventDefault(); // Prevent form submission
        removeProductFromCart(product.id);
    };

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        if (newQuantity > 0) {
            setQuantity(newQuantity);
            if (cartItems.some(item => item.id === product.id)) {
                updateCartProductQuantity(product.id, newQuantity);
            }
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${server}/product/${encodeURIComponent(productName)}`);
                setProduct(response.data.product);
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
                const response = await axios.get(`${server}/products`); // Replace with your API endpoint
                setProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

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
                        {/* Product */}
                        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                            {/* Image gallery */}
                            <div className="flex flex-col">
                                <div
                                    className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    onMouseMove={handleMouseMove}
                                >
                                    <img
                                        // src={`${assetServer}/images/products/${product.image[selectedImage]}`}
                                        src={`${assetServer}/images/products/${product.image}`}
                                        alt={product.product_name}
                                        className={`w-full h-full object-cover transition-transform duration-200 ${isZoomed ? 'scale-150' : ''}`}
                                        style={isZoomed ? {
                                            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                                        } : {}}
                                    />
                                </div>
                                {/*<div className="mt-4 grid grid-cols-4 gap-2">*/}
                                {/*    {product.image.map((image, index) => (*/}
                                {/*        <img*/}
                                {/*            key={index}*/}
                                {/*            src={`${assetServer}/images/products/${image}`}*/}
                                {/*            alt={`${product.product_name} - Image ${index + 1}`}*/}
                                {/*            className={`cursor-pointer rounded-md ${selectedImage === index ? 'ring-2 ring-indigo-500' : ''}`}*/}
                                {/*            onClick={() => setSelectedImage(index)}*/}
                                {/*        />*/}
                                {/*    ))}*/}
                                {/*</div>*/}
                            </div>

                            {/* Product info */}
                            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.product_name}</h1>

                                <div className="mt-3">
                                    <h2 className="sr-only">Product information</h2>
                                    <p className="text-3xl tracking-tight text-primary">
                                        ${product.group === "1" ? product.group_price : product.price}
                                    </p>
                                </div>

                                {/* Reviews */}
                                <ProductRating productId={product.id} />

                                <div className="mt-6">
                                    <h3 className="sr-only">Description</h3>

                                    <div
                                        className="space-y-6 text-base text-gray-700"
                                        dangerouslySetInnerHTML={{__html: product.description}}
                                    />
                                </div>

                                <form className="mt-6">
                                    {/* Buttons */}

                                    <div className="mt-10 flex">

                                        {cartItems.some(item => item.id === product.id) ? (
                                            <button
                                                onClick={handleRemoveFromCart}
                                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                            >
                                                Remove from Cart
                                            </button>
                                        ) : (
                                            product.group === "1" ? (
                                                <Link to={`/group-order`}>
                                                    <button
                                                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50">
                                                        Create or Join Group
                                                        <span className="sr-only">, {product.product_name}</span>
                                                    </button>
                                                </Link>
                                            ) : (
                                                <button
                                                    onClick={handleAddToCart}
                                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50"
                                                >
                                                    Add to cart
                                                </button>
                                            )
                                        )}

                                        <div className="ml-2">
                                            <input
                                                type="number"
                                                min="1"
                                                value={quantity}
                                                onChange={handleQuantityChange}
                                                className="w-12 text-center rounded-md border border-gray-300 px-2 py-2"
                                            />
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
                                                    <li>Category: {product.category}</li>
                                                    <li>Sub Category: {product.subcategory}</li>
                                                    <li>Vendor: {product.store_name}</li>
                                                    <li>Unit: {product.unit}</li>
                                                    <li>Weight/Pieces: {product.shipping_weight}</li>

                                                </ul>
                                            </div>
                                        </div>

                                        {/*<div className="mt-10 border-t border-gray-200 pt-10">*/}
                                        {/*    <h3 className="text-sm font-medium text-gray-900">License</h3>*/}
                                        {/*    <p className="mt-4 text-sm text-gray-500">*/}
                                        {/*        {license.summary}{' '}*/}
                                        {/*        <a href={license.href}*/}
                                        {/*           className="font-medium text-indigo-600 hover:text-indigo-500">*/}
                                        {/*            Read full license*/}
                                        {/*        </a>*/}
                                        {/*    </p>*/}
                                        {/*</div>*/}

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



                        {loading ? (
                            <div className="animate-pulse bg-gray-200 h-64 w-64 rounded-lg"></div>
                        ) : (
                            products && products.length > 0 && (
                                <section aria-labelledby="related-heading"
                                         className="mt-10 border-t border-gray-200 px-4 py-16 sm:px-0">
                                    <h2 id="related-heading" className="text-xl font-bold text-gray-900">
                                        Customers also bought
                                    </h2>

                                    <div
                                        className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                                        {products
                                            .sort(() => 0.5 - Math.random())
                                            .filter((p) => p.id !== product.id) // Filter out the current product
                                            .slice(0, 4)
                                            .map((product) => (
                                                <SingleProduct
                                                    key={product.id}
                                                    productId={product.id}
                                                    productName={product.product_name}
                                                />
                                            ))}
                                    </div>
                                </section>
                            )
                        )}
                    </div>
                </main>
            </div>


            <Footer/>

        </>
    )
}
