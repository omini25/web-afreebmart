import React, { useState, useEffect } from 'react';
import wbImage from "../assets/images/wb.png";
import main1 from "../assets/images/hero-3.png"
import slide2 from "../assets/images/hero-2.png";
import main2 from "../assets/images/afreebmart-slide2.png";
import slide3 from "../assets/images/afreebmart-slide3.png";
import main3 from "../assets/images/hero-1.png"

export const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const heroData = [
        {
            image: wbImage,
            title: 'Your Go-to Platform for Fast and Fresh Groceries',
            description: 'Better ingredients, better food, and beverages, at low prices',
            buttonText: 'Shop Now',
            mobileImage: main1,
        },
        {
            image: main2,
            title: 'Discover the Best Deals',
            description: 'Enjoy amazing deals on your favorite products',
            buttonText: 'Shop Now',
            mobileImage: slide2,
        },
        {
            image: slide3,
            title: 'Dairy Delights Delivered Fast',
            description: 'Enjoy amazing deals on your favorite products',
            buttonText: 'Shop Now',
            mobileImage: main3,
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
        <div className="relative overflow-hidden">
            <div className="h-[50vh] md:h-[60vh] lg:h-[70vh] relative">
                {heroData.map((item, index) => (
                    <div
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0 z-0'
                        }`}
                    >
                        <div className="absolute inset-0">
                            <img
                                src={window.innerWidth < 768 ? item.mobileImage : item.image}
                                alt=""
                                className="h-full w-full object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gray-900 opacity-40"/>
                        </div>
                        <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-altText1">{item.title}</h1>
                            <p className="mt-4 text-lg md:text-xl text-white">{item.description}</p>
                            <a
                                href="/shop"
                                className="mt-6 md:mt-8 inline-block rounded-md border border-transparent bg-newColor px-6 py-2 md:px-8 md:py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
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
                        className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                            index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};