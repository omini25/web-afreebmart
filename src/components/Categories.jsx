import React, { useEffect, useState } from "react";
import axios from 'axios';
import styles from "../styles/styles.js";
import {brandingData, categoriesData} from "../static/data.jsx";
import {useNavigate} from "react-router-dom";
import {server} from "../Server.js";
import {toast} from "react-toastify";
import {assetServer} from "../assetServer.js";

export const Categories = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`${server}/categories`)
            .then(response => {
                if (response.data && Array.isArray(response.data.categories)) {
                    setCategories(response.data.categories);
                } else {
                    toast.error
                }
            })
    }, []);

    console.log(categories)

    return (
        <>

            <div className="flex justify-between items-center sm:items-center mx-auto max-w-2xl px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="flex items-center justify-between sm:mb-0">
                    <h1 className="text-2xl font-bold">Shop by Categories</h1>

                </div>

            </div>


            <div
                className={`${styles.section} bg-white rounded-lg mb-12 flex items-center `}
                id="categories"
            >
                <div
                    className="flex flex-col items-center justify-center gap-[5px] md:grid md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
                    {categories &&
                        categories.map((category) => (
                            <div
                                className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden"
                                key={category.category_name}
                                onClick={() => navigate(`/products?category=${category.category_name}`)}
                            >
                                <h5 className={`text-[18px] leading-[1.3]`}>{category.category_name}</h5>
                                <img
                                    src={`${assetServer}/images/categories/${category.category_icon}`}
                                    className="w-[50px] object-cover"
                                    alt=""
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}