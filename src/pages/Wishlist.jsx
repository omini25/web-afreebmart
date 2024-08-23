import { Fragment, useState, useEffect } from 'react';
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [wishlistedProducts, setWishlistedProducts] = useState([]);

    useEffect(() => {
        const wishlist = localStorage.getItem('wishlist');
        if (wishlist) {
            setWishlistedProducts(JSON.parse(wishlist));
        }
    }, []);

    const removeFromWishlist = (productId) => {
        const updatedWishlist = wishlistedProducts.filter(product => product.id !== productId);
        setWishlistedProducts(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    }

    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            // Product already exists, increase quantity
            cart[existingProductIndex].quantity += 1;
        } else {
            // Product is new, add it to the cart
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        // Optionally display a success message or update cart count
    };

    return (
        <div className="bg-white">
            <Header />

            <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:pb-32 sm:pt-24 lg:px-8">
                <div className="max-w-xl">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Your Wishlists</h1>
                </div>

                <div className="mt-12 space-y-16 sm:mt-16">
                    {wishlistedProducts.length > 0 ? (
                        <div className="-mb-6 mt-6 flow-root divide-y divide-gray-200 border-t border-gray-200">
                            {wishlistedProducts.map((product) => (
                                <div key={product.id} className="py-6 sm:flex">
                                    <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-20 w-20 flex-none rounded-md object-cover object-center sm:h-48 sm:w-48"
                                        />
                                        <div className="min-w-0 flex-1 pt-1.5 sm:pt-0">
                                            <h3 className="text-sm font-medium text-gray-900">
                                                <a href={`/product/${product.id}`}>{product.name}</a>
                                            </h3>
                                            <p className="mt-1 font-medium text-gray-900">${product.price}</p>
                                        </div>
                                    </div>
                                    <div className="mt-6 space-y-4 sm:ml-6 sm:mt-0 sm:w-40 sm:flex-none">
                                        <button
                                            type="button"
                                            onClick={() => addToCart(product)} // Call addToCart when clicked
                                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-2.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-full sm:flex-grow-0"
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => removeFromWishlist(product.id)}
                                            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-full sm:flex-grow-0"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Your wishlist is empty.</p>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}