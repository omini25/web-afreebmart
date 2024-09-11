import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";

const faqs = [
    {
        id: 1,
        question: "1.\n" +
            "Contact Us\n",
        answer:
            "    Reach out to our customer support team immediately upon discovering a substandard item.\n" +
            "    Contact us at Support@afreebmart.com or through our designated support channels.",
    },

    {
        id: 2,
        question:"2.\n" +
            "Provide Details",
        answer:
            "    Please provide detailed information about the item concern, including photos if possible.\n" +
            "    Explain the issue you encountered and any concerns regarding safety or quality.",
    },

    {
        id: 3,
        question:"3.\n" +
            "Investigation ",
        answer:
            "    Our team will initiate an investigation into the reported issue.\n" +
            "    We will liaise with the vendor to gather relevant information and assess the situation.",
    },

    {
        id: 4,
        question:"4.\n" +
            "Vendor Response ",
        answer:
            "Upon receiving the report, the vendor will review the case and respond within 24-72 hours.",
    },

    {
        id: 5,
        question:"5.\n" +
            "Compensation Agreement ",
        answer:
            "    If the vendor acknowledges the issue and agrees to compensate you, they will provide details of the compensation plan.\n" +
            "    This may include a refund, replacement, or other forms of compensation as deemed appropriate.",
    },

    {
        id: 6,
        question:"6.\n" +
            "Compensation Process ",
        answer:
            " Once the compensation agreement is reached, the vendor will initiate the compensation process within 3-5 business days.",
    },

    {
        id: 7,
        question:"7.\n" +
            "Confirmation and Follow-Up: ",
        answer:
            "     You will receive confirmation of the compensation process and any relevant updates regarding your case.\n" +
            "    Our customer support team will follow up to ensure your satisfaction with the resolution.",
    },
]



export default function Compensation() {

    return (
        <div className="bg-white">

            <Header />

            <main className="isolate">
                {/* Hero section */}
                <div className="relative pt-2">
                    <div className="py-24 sm:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <h3 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                    Compensation Timeline At Afreebmart
                                </h3>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    At Afreebmart, we understand the importance of addressing issues related to product quality and safety promptly. Our compensation timeline ensures that customers receive appropriate resolution for substandard items in a timely manner.
                                </p>

                            </div>
                        </div>
                    </div>

                </div>




                {/* FAQs */}
                <div className="mx-auto max-w-2xl divide-y divide-gray-900/10 px-6 pb-8 sm:pb-24 sm:pt-12 lg:max-w-7xl lg:px-8 lg:pb-32">
                    <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Steps to Request Compensation</h2>
                    <dl className="mt-10 space-y-8 divide-y divide-gray-900/10">
                        {faqs.map((faq) => (
                            <div key={faq.id} className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8">
                                <dt className="text-base font-semibold leading-7 text-gray-900 lg:col-span-5">{faq.question}</dt>
                                <dd className="mt-4 lg:col-span-7 lg:mt-0">
                                    <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* CTA section */}
                <div className="  mt-5 mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="mx-auto">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Vendor Responsibility
                        </h2>
                        <p className="mx-auto mt-6 text-lg leading-8 text-gray-600">
                            Vendors on Afreebmart are committed to addressing customer concerns promptly and providing fair compensation for substandard items. They are expected to adhere to the compensation timeline outlined above and ensure a satisfactory resolution for affected customers.
                        </p>

                    </div>
                </div>

                <div className="  mt-5 mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="mx-auto ">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Our Commitment
                        </h2>
                        <p className="mx-auto mt-6 text-lg leading-8 text-gray-600">
                            At Afreebmart, we prioritize customer satisfaction and aim to resolve issues related to product quality and safety efficiently. Our compensation timeline is designed to streamline the process and ensure that customers receive the appropriate resolution in a timely manner. Thank you for your cooperation in reporting substandard items and helping us maintain the integrity of our platform. We value your trust in us and remain committed to providing a positive shopping experience at Afreebmart.
                        </p>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
