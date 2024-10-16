import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";

export function ReturnPolicy() {
    return (
        <>
            <Header />
            <div className="bg-white ">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-12">
                    <h1 className="text-4xl font-bold mb-4">Return Policy at Afreebmart</h1>
                    <p className="mb-4">
                        At Afreebmart, we prioritize the safety and satisfaction of our customers. Due to the nature of
                        the products we offer, which primarily include perishable food items, we do not have a standard
                        return policy. However, we understand that there may be instances where customers receive items
                        that do not meet the required standards of safety and quality.
                    </p>
                    <h2 className="text-2xl font-bold mb-2">Compensation for Substandard Items</h2>
                    <p className="mb-4">If you receive a product that is unsafe or unhealthy for consumption or use, we
                        encourage you to contact us immediately. Our customer support team will assist you in addressing
                        the issue with the vendor. Complain must be made within 24hrs of product being delivered.</p>

                    <h2 className="text-2xl font-bold mb-2">Steps to Request Compensation:</h2>
                    <ul className="list-disc list-inside mb-4">
                        <li>Contact Us: Reach out to our customer support team at <a
                            href="mailto:support@afreebmart.com">support@afreebmart.com</a> or through our designated
                            support channels.
                        </li>
                        <li>Provide Details: Please provide detailed information about the substandard item, including
                            photos if possible, and explain the issue you encountered.
                        </li>
                        <li>Investigation: Our team will investigate the matter and liaise with the vendor to determine
                            the appropriate compensation.
                        </li>
                        <li>Compensation Process: If the vendor acknowledges the issue and agrees to compensate you,
                            they will arrange for the compensation directly.
                        </li>
                    </ul>
                    <h2 className="text-2xl font-bold mb-2">Vendor Responsibility</h2>
                    <p className="mb-4">
                        Vendors on Afreebmart are responsible for ensuring the quality and safety of the products they
                        sell. In cases where items fall below the required standard, vendors are expected to take
                        corrective actions and provide compensation as necessary.
                    </p>

                    <h2 className="text-2xl font-bold mb-2">Our Commitment</h2>
                    <p className="mb-4">
                        While we do not offer returns for food items, we are committed to addressing any concerns related to product quality and safety. Your feedback helps us maintain high standards and improve the overall shopping experience for our customers. Thank you for understanding our policy regarding returns and compensation for substandard items at Afreebmart. We appreciate your trust in us and strive to ensure your satisfaction with every purchase.
                    </p>

                </div>
            </div>

            <Footer/>

        </>
    )
}