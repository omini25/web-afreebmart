import React, { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import {server} from "../Server.js";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function ProductRating({ productId }) {
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const fetchAverageRating = async () => {
            try {
                const response = await axios.get(`${server}/review/${productId}`);
                const reviews = response.data.reviews;

                // Calculate the average rating
                if (reviews.length > 0) {
                    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
                    const avg = totalRating / reviews.length;
                    setAverageRating(avg);
                } else {
                    setAverageRating(0); // No reviews yet
                }

            } catch (error) {
                console.error('Error fetching average rating:', error);
            }
        };

        fetchAverageRating();
    }, [productId]);

    return (
        <div className="mt-3">
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center">
                <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                            key={rating}
                            className={classNames(
                                averageRating > rating ? 'text-yellow-400' : 'text-gray-300',
                                'h-5 w-5 flex-shrink-0'
                            )}
                            aria-hidden="true"
                        />
                    ))}
                </div>
                <p className="sr-only">{averageRating} out of 5 stars</p>
                {/* You can also display the average rating here: */}
                <span className="ml-2 text-gray-600">{averageRating.toFixed(1)} out of 5 stars</span>
            </div>
        </div>
    );
}

export default ProductRating;