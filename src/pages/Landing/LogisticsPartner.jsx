import {
    ArrowsRightLeftIcon,
    UserGroupIcon,
    BanknotesIcon,
} from '@heroicons/react/24/outline'
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";

const features = [
    {
        name: 'Flexible Schedule',
        description:
            'Work on your schedule and availability, allowing you to balance work and personal commitments.',
        icon: ArrowsRightLeftIcon,
    },
    {
        name: 'Earn Competitive Income',
        description:
            'Enjoy competitive earnings and incentives based on the number of deliveries completed.',
        icon: BanknotesIcon,
    },
    {
        name: 'Join A Growing Network',
        description:
            'Be part of a rapidly growing logistics network, connecting suppliers, vendors, and consumers seamlessly.',
        icon: UserGroupIcon,
    },
]

const faqs = [
    {
        id: 1,
        question: "1.\n" +
            "Sign Up\n",
        answer:
            "Visit our website or download the Afreebmart Driver app to begin your registration process..",
    },

    {
        id: 2,
        question:"2.\n" +
            "Provide Information",
        answer:
            "Fill out the required information, including your name, contact details, email address, and location.",
    },

    {
        id: 3,
        question:"3.\n" +
            "Upload Documents ",
        answer:
            "Upload necessary documents such as your driver's license, insurance information, vehicle registration (if applicable), and any other required documents.",
    },

    {
        id: 4,
        question:"4.\n" +
            "Start Delivering ",
        answer:
            "Log in to the Afreebmart Driver app and start accepting delivery orders to begin providing top-notch delivery services.",
    },
]


export default function LogisticsPartner() {

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
                                    Become A Logistics Partner With Afreebmart Logistics
                                </h3>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    Are you looking for an opportunity to join a dynamic team and be part of delivering exceptional service to customers? Become a logistics partner with Afreebmart Logistics and play a crucial role in ensuring timely and efficient delivery of agricultural food items to our valued customers.
                                </p>

                            </div>
                        </div>
                    </div>

                </div>



                {/* Feature section */}
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">

                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Why Partner With Afreebmart Logistics?
                        </p>

                    </div>

                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            {features.map((feature) => (
                                <div key={feature.name} className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-newColor">
                                            <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>


                {/* FAQs */}
                <div className="mx-auto max-w-2xl divide-y divide-gray-900/10 px-6 pb-8 sm:pb-24 sm:pt-12 lg:max-w-7xl lg:px-8 lg:pb-32 mt-12">
                    <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">How to Get Started</h2>
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
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Join Us
                        </h2>
                        <p className="mx-auto mt-6 text-lg leading-8 text-gray-600">
                            Ready to embark on an exciting journey as a logistics partner with Afreebmart Logistics? Sign up now and be part of delivering freshness and quality to our customers while enjoying the benefits of flexibility and competitive earnings.
                            For any inquiries or assistance during the registration process, please contact us at info@logistics.afreebmart.com or through our app's support feature.
                        </p>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
