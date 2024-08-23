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
    average: 3.9,
    totalCount: 512,
    featured: [
        {
            id: 1,
            title: "Can't say enough good things",
            rating: 5,
            content: `
        <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
        <p>The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
      `,
            author: 'Risako M',
            date: 'May 16, 2021',
            datetime: '2021-01-06',
        },
        // More reviews...
    ],
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
                                        <button
                                            type="submit"
                                            className="flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                        >
                                            Add to cart
                                        </button>


                                        <div className="ml-2">
                                            <input
                                                type="number"
                                                min="1"
                                                value="1"
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

                                    {/*<div className="divide-y divide-gray-200 border-t">*/}
                                    {/*    {product.details.map((detail) => (*/}
                                    {/*        <Disclosure as="div" key={detail.name}>*/}
                                    {/*            {({ open }) => (*/}
                                    {/*                <>*/}
                                    {/*                    <h3>*/}
                                    {/*                        <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">*/}
                                    {/*                      <span*/}
                                    {/*                          className={classNames(*/}
                                    {/*                              open ? 'text-indigo-600' : 'text-gray-900',*/}
                                    {/*                              'text-sm font-medium'*/}
                                    {/*                          )}*/}
                                    {/*                      >*/}
                                    {/*                        {detail.name}*/}
                                    {/*                      </span>*/}
                                    {/*                            <span className="ml-6 flex items-center">*/}
                                    {/*                                {open ? (*/}
                                    {/*                                    <MinusIcon*/}
                                    {/*                                        className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"*/}
                                    {/*                                        aria-hidden="true"*/}
                                    {/*                                    />*/}
                                    {/*                                ) : (*/}
                                    {/*                                    <PlusIcon*/}
                                    {/*                                        className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"*/}
                                    {/*                                        aria-hidden="true"*/}
                                    {/*                                    />*/}
                                    {/*                                )}*/}
                                    {/*                            </span>*/}
                                    {/*                        </Disclosure.Button>*/}
                                    {/*                    </h3>*/}
                                    {/*                    <Disclosure.Panel as="div" className="prose prose-sm pb-6">*/}
                                    {/*                        <ul role="list">*/}
                                    {/*                            {detail.items.map((item) => (*/}
                                    {/*                                <li key={item}>{item}</li>*/}
                                    {/*                            ))}*/}
                                    {/*                        </ul>*/}
                                    {/*                    </Disclosure.Panel>*/}
                                    {/*                </>*/}
                                    {/*            )}*/}
                                    {/*        </Disclosure>*/}
                                    {/*    ))}*/}
                                    {/*</div>*/}
                                </section>
                            </div>
                        </div>

                        {/* Reviews */}
                        <section aria-labelledby="reviews-heading" className="mt-16 sm:mt-24">
                            <h2 id="reviews-heading" className="text-lg font-medium text-gray-900">
                                Recent reviews
                            </h2>

                            <div className="mt-6 space-y-10 divide-y divide-gray-200 border-b border-t border-gray-200 pb-10">
                                {reviews.featured.map((review) => (
                                    <div key={review.id} className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8">
                                        <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
                                            <div className="flex items-center xl:col-span-1">
                                                <div className="flex items-center">
                                                    {[0, 1, 2, 3, 4].map((rating) => (
                                                        <StarIcon
                                                            key={rating}
                                                            className={classNames(
                                                                review.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                                                                'h-5 w-5 flex-shrink-0'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    ))}
                                                </div>
                                                <p className="ml-3 text-sm text-gray-700">
                                                    {review.rating}
                                                    <span className="sr-only"> out of 5 stars</span>
                                                </p>
                                            </div>

                                            <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                                                <h3 className="text-sm font-medium text-gray-900">{review.title}</h3>

                                                <div
                                                    className="mt-3 space-y-6 text-sm text-gray-500"
                                                    dangerouslySetInnerHTML={{ __html: review.content }}
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                                            <p className="font-medium text-gray-900">{review.author}</p>
                                            <time
                                                dateTime={review.datetime}
                                                className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                                            >
                                                {review.date}
                                            </time>
                                        </div>
                                    </div>
                                ))}
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
                                                Add to bag<span className="sr-only">, {product.name}</span>
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>
            </div>


            <Footer />

        </>
    )
}
