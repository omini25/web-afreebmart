import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StarIcon } from '@heroicons/react/20/solid';
import {server} from "../Server.js";
import {assetServer} from "../assetServer.js";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ProductReviews = ({ productId }) => {
    const [reviews, setReviews] = useState(null);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 5, content: '' });

    useEffect(() => {
        fetchReviews();
    }, [productId]);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${server}/review/${productId}`);
            setReviews(response.data.reviews);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    console.log(reviews);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${server}/reviews/${productId}`, newReview);
            setShowReviewForm(false);
            setNewReview({ rating: 5, content: '' });
            fetchReviews();
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    if (!reviews) return <div className="animate-pulse bg-gray-200 h-64 w-64 rounded-lg"></div>;

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
                <div className="lg:col-span-4">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customer Reviews</h2>

                    <div className="mt-3 flex items-center">
                        <div>
                            <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                    <StarIcon
                                        key={rating}
                                        className={classNames(
                                            reviews.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                                            'h-5 w-5 flex-shrink-0'
                                        )}
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>
                            <p className="sr-only">{reviews.average} out of 5 stars</p>
                        </div>
                        <p className="ml-2 text-sm text-gray-900">Based on {reviews.totalCount} reviews</p>
                    </div>

                    <div className="mt-6">
                        <h3 className="sr-only">Review data</h3>

                        <dl className="space-y-3">
                            {reviews.map((count) => (
                                <div key={count.review.id} className="flex items-center text-sm">
                                    <dt className="flex flex-1 items-center">
                                        <p className="w-3 font-medium text-gray-900">
                                            {count.rating} <span className="sr-only">star reviews</span>
                                        </p>
                                        <div aria-hidden="true" className="ml-1 flex flex-1 items-center">
                                            {/* Display filled stars based on rating */}
                                            {[...Array(count.rating)].map((_, index) => (
                                                <StarIcon
                                                    key={index}
                                                    className={classNames(
                                                        'text-yellow-400',
                                                        'h-5 w-5 flex-shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            ))}
                                            {/* Display empty stars (if any) */}
                                            {[...Array(5 - count.rating)].map((_, index) => (
                                                <StarIcon
                                                    key={index + count.rating} // Unique key for empty stars
                                                    className={classNames(
                                                        'text-gray-300',
                                                        'h-5 w-5 flex-shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            ))}
                                            <div className="relative ml-3 flex-1">
                                                <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                                                {/* You might want to adjust the width calculation here
              based on how you want to represent the percentage */}
                                                {count.count > 0 ? (
                                                    <div
                                                        className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                                                        style={{ width: `calc(${count.count} / ${reviews.totalCount} * 100%)` }}
                                                    />
                                                ) : null}
                                            </div>
                                        </div>
                                    </dt>
                                    <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                                        {/* Consider recalculating the percentage based on total reviews */}
                                        {Math.round((count.count / reviews.totalCount) * 100)}%
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="mt-10">
                        <h3 className="text-lg font-medium text-gray-900">Share your thoughts</h3>
                        <p className="mt-1 text-sm text-gray-600">
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            If you've used this product, share your thoughts with other customers
                        </p>

                        <button
                            onClick={() => setShowReviewForm(!showReviewForm)}
                            className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
                        >
                            Write a review
                        </button>

                        {showReviewForm && (
                            <form onSubmit={handleSubmitReview} className="mt-6">
                                <div>
                                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                                        Rating
                                    </label>
                                    <select
                                        id="rating"
                                        name="rating"
                                        value={newReview.rating}
                                        onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                                        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    >
                                        {[1, 2, 3, 4, 5].map((rating) => (
                                            <option key={rating} value={rating}>
                                                {rating} Star{rating !== 1 ? 's' : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                        Review
                                    </label>
                                    <textarea
                                        id="content"
                                        name="content"
                                        rows={3}
                                        value={newReview.content}
                                        onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="mt-4 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Submit Review
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
                    <h3 className="sr-only">Recent reviews</h3>

                    <div className="flow-root">
                        <div className="-my-12 divide-y divide-gray-200">
                            {reviews.map((review) => (
                                <div key={review.id} className="py-12">
                                    <div className="flex items-center">
                                        <img src={`${assetServer}/images/users/${review.image}`} alt={`${review.user_name}.`} className="h-12 w-12 rounded-full" />
                                        <div className="ml-4">
                                            <h4 className="text-sm font-bold text-gray-900">{review.user_name}</h4>
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
                                            <p className="sr-only">{review.rating} out of 5 stars</p>
                                        </div>
                                    </div>

                                    <div
                                        className="mt-4 space-y-6 text-base italic text-gray-600"
                                        dangerouslySetInnerHTML={{ __html: review.comment }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductReviews;