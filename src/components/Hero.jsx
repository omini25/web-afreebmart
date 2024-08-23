import React, { useState, useEffect } from 'react';
import wbImage from "../assets/images/wb.png";
import slide2 from "../assets/images/afreebmart-slide2.png";
import slide3 from "../assets/images/afreebmart-slide3.png";


export const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const heroData = [
        {
            image: wbImage,
            title: 'Your Go To For Fast and Fresh Groceries',
            description: 'Better ingredients, better food, and beverages, at low prices',
            buttonText: 'Shop Now',
        },
        {
            image: slide2,
            title: 'Discover the Best Deals',
            description: 'Enjoy amazing deals on your favorite products',
            buttonText: 'Shop Now',
        },
        {
            image: slide3,
            title: 'Dairy Delights Delivered Fast',
            description: 'Enjoy amazing deals on your favorite products',
            buttonText: 'Shop Now',
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % heroData.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="relative overflow-hidden h-screen">
            <div className="h-full relative">
                {heroData.map((item, index) => (
                    <div
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0 z-0'
                        }`}
                    >
                        <div className="absolute inset-0">
                            <img
                                src={item.image}
                                alt=""
                                className="h-full w-full object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gray-500 opacity-20" />
                        </div>
                        <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-primary lg:text-6xl">{item.title}</h1>
                            <p className="mt-4 text-xl text-white">{item.description}</p>
                            <a
                                href="/shop"
                                className="mt-8 inline-block rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                            >
                                {item.buttonText}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {heroData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full ${
                            index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};