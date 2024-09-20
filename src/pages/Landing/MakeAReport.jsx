import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import reporthero from "../../assets/images/landing/report.png";


export function MakeAReport() {
    return (
        <>
            <Header/>

            <div className="bg-white">
                <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div
                            className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6">
                            {/* Text content */}
                            <div>
                                <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                    Report A Product Or Vendor
                                </h1>
                                <div className="mt-6 max-w-xl">
                                    <p className="text-lg leading-8 text-gray-600">
                                        At Afreebmart, we value your feedback and strive to maintain a high standard of
                                        quality for both products and vendors. If you encounter any issues or have concerns
                                        regarding a product or vendor, we encourage you to report it to us. Your feedback
                                        helps us improve our platform and ensures a better experience for all our users.
                                    </p>
                                </div>
                            </div>
                            {/* Image */}
                            <div className="mt-10 sm:mt-16 lg:mt-0">
                                <img
                                    src={reporthero}
                                    alt=""
                                    className="aspect-[6/5] w-full max-w-lg rounded-2xl object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-12">

                    <h2 className="text-2xl font-bold mb-2">Reporting a Product</h2>
                    <p className="mb-4">
                        If you have received a product that does not meet your expectations or if you believe there is
                        an issue with the product quality, you can report it to us. Please provide detailed information
                        about the product and the nature of the problem. Our team will investigate the issue promptly
                        and take appropriate action to address your concerns. Additionally, you can report a product via
                        your product review. Simply leave a review for the product and mention the issue you
                        encountered. Our team will review your feedback and take necessary steps to resolve the issue.
                    </p>

                    <h2 className="text-2xl font-bold mb-2">Reporting a Vendor</h2>
                    <p className="mb-4">
                        If you have had a negative experience with a vendor, such as delayed deliveries, poor customer
                        service, or any other issues related to vendor performance, please let us know. We take vendor
                        feedback seriously and will review the reported vendor to ensure they meet our standards of
                        service and reliability.
                    </p>

                    <h2 className="text-2xl font-bold mb-2">How to Report</h2>
                    <p className="mb-4">To report a product or vendor, please follow these steps:</p>
                    <ul className="list-disc list-inside mb-4">
                        <ol>Log in to your Afreebmart account.
                        </ol>
                        <ol>Navigate to the product or vendor page you wish to report.
                        </ol>
                        <ol>Look for the "Report" or "Feedback" option.
                        </ol>
                        <ol>Provide detailed information about the issue you encountered.</ol>
                        <ol>Submit your report.</ol>
                    </ul>

                    <p className="mb-4">
                        Alternatively, you can contact our customer support team directly at <a
                        href="mailto:support@getdaabo.com">support@afreebmart.com</a> or through our designated support
                        channels. Please include as much information as possible to help us investigate and resolve the
                        issue efficiently.
                    </p>

                    <h2 className="text-2xl font-bold mb-2">Our Commitment</h2>
                    <p className="mb-4">
                        At Afreebmart, we are committed to ensuring a positive and trustworthy shopping experience for
                        our customers. Your feedback plays a crucial role in maintaining the integrity of our platform
                        and improving our services. We appreciate your cooperation in reporting any product or vendor
                        concerns you may have. Thank you for helping us uphold our standards of quality and reliability
                        at Afreebmart. We value your feedback and are here to assist you in any way we can.
                    </p>

                </div>
            </div>

            <Footer/>
        </>
    )
}