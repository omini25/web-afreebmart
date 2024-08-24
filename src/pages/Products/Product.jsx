import { Fragment, useState, useEffect } from 'react'
import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import {
    HeartIcon,
    MinusIcon,
    PlusIcon,
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../Server.js';
import { assetServer } from "../../assetServer.js";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import ProductShare from "../../components/ProductShare.jsx";
import { useShoppingHooks } from "../../redux/useShoppingHooks.js";



const relatedProducts = [
    {
        id: 1,
        name: 'Zip Tote Basket',
        color: 'White and black',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg',
        imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
        price: '$140',
    },
    // More products...
]

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


export default function ProductPage() {
    const { productName } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    // const [reviews, setReviews] = useState([]);

    const {
        cartItems,
        addProductToCart,
        removeProductFromCart,
        updateCartProductQuantity
    } = useShoppingHooks();

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (product) {
            const cartItem = cartItems.find(item => item.id === product.id);
            setQuantity(cartItem ? cartItem.quantity : 1);
        }
    }, [product, cartItems]);

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
        setQuantity(newQuantity);
        if (cartItems.some(item => item.id === product.id)) {
            updateCartProductQuantity(product.id, newQuantity);
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

    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await axios.get(`${server}/product/${encodeURIComponent(productName)}`);
    //             setProduct(response.data.product);
    //
    //             // Fetch reviews from external API
    //             try {
    //                 const reviewsResponse = await axios.get(
    //                     `${server}/review/${response.data.product.id}`
    //                 );
    //                 setReviews(reviewsResponse.data);
    //             } catch (reviewError) {
    //                 // If reviews are not found, log the error (optional) and set reviews to an empty array
    //                 console.error('Error fetching reviews:', reviewError);
    //                 setReviews([]);
    //             }
    //
    //             setLoading(false);
    //         } catch (error) {
    //             console.error('Error fetching product or reviews:', error);
    //             setError('Failed to load product details');
    //             setLoading(false);
    //         }
    //     };
    //
    //     fetchProduct();
    // }, [productName]);


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
                                    <p className="text-3xl tracking-tight text-primary">${product.price}</p>
                                </div>

                                {/* Reviews */}
                                <div className="mt-3">
                                    <h3 className="sr-only">Reviews</h3>
                                    <div className="flex items-center">
                                        <div className="flex items-center">
                                            {[0, 1, 2, 3, 4].map((rating) => (
                                                <StarIcon
                                                    key={rating}
                                                    className={classNames(
                                                        product.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                                                        'h-5 w-5 flex-shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            ))}
                                        </div>
                                        <p className="sr-only">{product.rating} out of 5 stars</p>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h3 className="sr-only">Description</h3>

                                    <div
                                        className="space-y-6 text-base text-gray-700"
                                        dangerouslySetInnerHTML={{__html: product.description}}
                                    />
                                </div>

                                <form className="mt-6">
                                    {/* Colors */}
                                    <div>
                                        <h3 className="text-sm text-gray-600">Color</h3>

                                        {/*<RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">*/}
                                        {/*    <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>*/}
                                        {/*    <div className="flex items-center space-x-3">*/}
                                        {/*        {product.colors.map((color) => (*/}
                                        {/*            <RadioGroup.Option*/}
                                        {/*                key={color.name}*/}
                                        {/*                value={color}*/}
                                        {/*                className={({ active, checked }) =>*/}
                                        {/*                    classNames(*/}
                                        {/*                        color.selectedColor,*/}
                                        {/*                        active && checked ? 'ring ring-offset-1' : '',*/}
                                        {/*                        !active && checked ? 'ring-2' : '',*/}
                                        {/*                        'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'*/}
                                        {/*                    )*/}
                                        {/*                }*/}
                                        {/*            >*/}
                                        {/*                <RadioGroup.Label as="span" className="sr-only">*/}
                                        {/*                    {color.name}*/}
                                        {/*                </RadioGroup.Label>*/}
                                        {/*                <span*/}
                                        {/*                    aria-hidden="true"*/}
                                        {/*                    className={classNames(*/}
                                        {/*                        color.bgColor,*/}
                                        {/*                        'h-8 w-8 rounded-full border border-black border-opacity-10'*/}
                                        {/*                    )}*/}
                                        {/*                />*/}
                                        {/*            </RadioGroup.Option>*/}
                                        {/*        ))}*/}
                                        {/*    </div>*/}
                                        {/*</RadioGroup>*/}
                                    </div>

                                    <div className="mt-10 flex">
                                        {cartItems.some((item) => item.id === product.id) ? (
                                            <button
                                                onClick={handleRemoveFromCart}
                                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                            >
                                                Remove from Cart
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleAddToCart}
                                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                            >
                                                Add to cart
                                            </button>
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
                                            type="button"
                                            className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                                        >
                                            <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true"/>
                                            <span className="sr-only">Add to wishlist</span>
                                        </button>
                                    </div>
                                </form>



                                <section aria-labelledby="details-heading" className="mt-12">
                                    <h2 id="details-heading" className="sr-only">
                                        Additional details
                                    </h2>

                                    {/* Product details */}
                                    <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">

                                        {/*<div className="mt-10 border-t border-gray-200 pt-10">*/}
                                        {/*    <h3 className="text-sm font-medium text-gray-900">Highlights</h3>*/}
                                        {/*    <div className="prose prose-sm mt-4 text-gray-500">*/}
                                        {/*        <ul role="list">*/}
                                        {/*            {product.highlights.map((highlight) => (*/}
                                        {/*                <li key={highlight}>{highlight}</li>*/}
                                        {/*            ))}*/}
                                        {/*        </ul>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}

                                        <div className="mt-10 border-t border-gray-200 pt-10">
                                            <h3 className="text-sm font-medium text-gray-900">License</h3>
                                            <p className="mt-4 text-sm text-gray-500">
                                                {license.summary}{' '}
                                                <a href={license.href} className="font-medium text-indigo-600 hover:text-indigo-500">
                                                    Read full license
                                                </a>
                                            </p>
                                        </div>

                                        <div className="mt-10 border-t border-gray-200 pt-10">
                                            <h3 className="text-sm font-medium text-gray-900">Share</h3>
                                            <ProductShare product={product}/>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>

                        {/* Reviews */}
                        <section aria-labelledby="reviews-heading" className="mt-16 sm:mt-24">
                            <h2 id="reviews-heading" className="text-lg font-medium text-gray-900">
                                Recent reviews
                            </h2>

                            <div
                                className="mt-6 space-y-10 divide-y divide-gray-200 border-b border-t border-gray-200 pb-10">
                                <div className="bg-white">
                                    <div
                                        className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
                                        <div className="lg:col-span-4">
                                            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customer
                                                Reviews</h2>

                                            <div className="mt-3 flex items-center">
                                                <div>
                                                    <div className="flex items-center">
                                                        {[0, 1, 2, 3, 4].map((rating) => (
                                                            <StarIcon
                                                                key={rating}
                                                                className={classNames(
                                                                    reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
                                                                    'h-5 w-5 flex-shrink-0'
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                        ))}
                                                    </div>
                                                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                                                </div>
                                                <p className="ml-2 text-sm text-gray-900">Based
                                                    on {reviews.totalCount} reviews</p>
                                            </div>

                                            <div className="mt-6">
                                                <h3 className="sr-only">Review data</h3>

                                                <dl className="space-y-3">
                                                    {reviews.counts.map((count) => (
                                                        <div key={count.rating} className="flex items-center text-sm">
                                                            <dt className="flex flex-1 items-center">
                                                                <p className="w-3 font-medium text-gray-900">
                                                                    {count.rating}
                                                                    <span className="sr-only"> star reviews</span>
                                                                </p>
                                                                <div aria-hidden="true"
                                                                     className="ml-1 flex flex-1 items-center">
                                                                    <StarIcon
                                                                        className={classNames(
                                                                            count.count > 0 ? 'text-yellow-400' : 'text-gray-300',
                                                                            'h-5 w-5 flex-shrink-0'
                                                                        )}
                                                                        aria-hidden="true"
                                                                    />

                                                                    <div className="relative ml-3 flex-1">
                                                                        <div
                                                                            className="h-3 rounded-full border border-gray-200 bg-gray-100"/>
                                                                        {count.count > 0 ? (
                                                                            <div
                                                                                className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                                                                                style={{width: `calc(${count.count} / ${reviews.totalCount} * 100%)`}}
                                                                            />
                                                                        ) : null}
                                                                    </div>
                                                                </div>
                                                            </dt>
                                                            <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                                                                {Math.round((count.count / reviews.totalCount) * 100)}%
                                                            </dd>
                                                        </div>
                                                    ))}
                                                </dl>
                                            </div>

                                            <div className="mt-10">
                                                <h3 className="text-lg font-medium text-gray-900">Share your
                                                    thoughts</h3>
                                                <p className="mt-1 text-sm text-gray-600">
                                                    If you’ve used this product, share your thoughts with other
                                                    customers
                                                </p>

                                                <a
                                                    href="#"
                                                    className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
                                                >
                                                    Write a review
                                                </a>
                                            </div>
                                        </div>

                                        <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
                                            <h3 className="sr-only">Recent reviews</h3>

                                            <div className="flow-root">
                                                <div className="-my-12 divide-y divide-gray-200">
                                                    {reviews.featured.map((review) => (
                                                        <div key={review.id} className="py-12">
                                                            <div className="flex items-center">
                                                                <img src={review.avatarSrc} alt={`${review.author}.`}
                                                                     className="h-12 w-12 rounded-full"/>
                                                                <div className="ml-4">
                                                                    <h4 className="text-sm font-bold text-gray-900">{review.author}</h4>
                                                                    <div className="mt-1 flex items-center">
                                                                        {[0, 1, 2, 3, 4].map((rating) => (
                                                                            <StarIcon
                                                                                key={rating}
                                                                                className={classNames(
                                                                                    review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                                                                                    'h-5 w-5 flex-shrink-0'
                                                                                )}
                                                                                aria-hidden="true"
                                                                            />
                                                                        ))}
                                                                    </div>
                                                                    <p className="sr-only">{review.rating} out of 5
                                                                        stars</p>
                                                                </div>
                                                            </div>

                                                            <div
                                                                className="mt-4 space-y-6 text-base italic text-gray-600"
                                                                dangerouslySetInnerHTML={{__html: review.content}}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section aria-labelledby="related-heading"
                                 className="mt-10 border-t border-gray-200 px-4 py-16 sm:px-0">
                            <h2 id="related-heading" className="text-xl font-bold text-gray-900">
                                Customers also bought
                            </h2>

                            <div
                                className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                                {relatedProducts.map((product) => (
                                    <div key={product.id}>
                                        <div className="relative">
                                            <div className="relative h-72 w-full overflow-hidden rounded-lg">
                                                <img
                                                    src={product.imageSrc}
                                                    alt={product.imageAlt}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>
                                            <div className="relative mt-4">
                                                <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                                                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                            </div>
                                            <div
                                                className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                                                <div
                                                    aria-hidden="true"
                                                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                                                />
                                                <p className="relative text-lg font-semibold text-white">{product.price}</p>
                                            </div>
                                        </div>
                                        <div className="mt-6">
                                            <a
                                                href={product.href}
                                                className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                                            >
                                                Add to cart<span className="sr-only">, {product.name}</span>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>
            </div>


            <Footer/>

        </>
    )
}
