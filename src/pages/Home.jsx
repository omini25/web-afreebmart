import Header from "../components/Header.jsx";
import {Hero} from "../components/Hero.jsx";
import ProductListing from "../components/ProductListing.jsx";
import Footer from "../components/Footer.jsx";
import BulkProductListing from "../components/BulkProductListing.jsx";
import {Categories} from "../components/Categories.jsx";


export default function Index() {
    return (
        <>
            <Header/>
            <Hero/>
            {/*<Categories />*/}
            <ProductListing/>

            {/* Sale and testimonials */}
            <div className="relative overflow-hidden">
                {/* Decorative background image and gradient */}
                <div aria-hidden="true" className="absolute inset-0">
                    <div className="absolute inset-0 mx-auto max-w-7xl overflow-hidden xl:px-8">
                        <img
                            src="https://tailwindui.com/img/ecommerce-images/home-page-02-sale-full-width.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div className="absolute inset-0 bg-white bg-opacity-75" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white" />
                </div>

                {/* Sale */}
                <section
                    aria-labelledby="sale-heading"
                    className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-32 text-center sm:px-6 lg:px-8"
                >
                    <div className="mx-auto max-w-2xl lg:max-w-none">
                        <h2 id="sale-heading" className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                            Amazing Products Just For You
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-xl text-gray-600">
                            Find out what we offer from regular products to buying with friends and family using our group product option
                        </p>
                        {/*<a*/}
                        {/*    href="#"*/}
                        {/*    className="mt-6 inline-block w-full rounded-md border border-transparent bg-gray-900 px-8 py-3 font-medium text-white hover:bg-gray-800 sm:w-auto"*/}
                        {/*>*/}
                        {/*    Get access to our one-time sale*/}
                        {/*</a>*/}
                    </div>
                </section>

            </div>

            <BulkProductListing />




            <Footer/>

        </>
    )
}