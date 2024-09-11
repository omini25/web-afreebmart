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
            <div className="relative pt-7 pb-7 bg-backgroundDark">


                {/* Sale */}

                    <div className="mx-auto max-w-2xl lg:max-w-none text-center">
                        <h6  className="text font-bold tracking-tight text-btnprimary sm:text-xl lg:text-2xl ">
                            Amazing Products Just For You
                        </h6>
                        <p className="mx-auto mt-4 max-w-xl text text-gray-600">
                            Find out what we offer from regular products to buying with friends and family using our group product option
                        </p>
                        {/*<a*/}
                        {/*    href="#"*/}
                        {/*    className="mt-6 inline-block w-full rounded-md border border-transparent bg-gray-900 px-8 py-3 font-medium text-white hover:bg-gray-800 sm:w-auto"*/}
                        {/*>*/}
                        {/*    Get access to our one-time sale*/}
                        {/*</a>*/}
                    </div>

            </div>

            <BulkProductListing />




            <Footer/>

        </>
    )
}