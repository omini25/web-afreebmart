import {ChevronRightIcon} from "@heroicons/react/16/solid/index.js";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import deliveryhero from "../../assets/images/landing/delivery.jpg"

const faqs = [
    {
        title: "Delivery Options",
        question: "Standard Delivery:",
        answer:
            "    Available for all orders within our designated delivery areas\n" +
            "    Delivery fees may apply based on order category, type size and location.\n" +
            "    Estimated delivery time: estimated at 1-7 business days after order.",
    }
    ,{
        title: "Delivery Areas: Available delivery areas",
        question: "Local Delivery:",
        answer:
            "    We offer local delivery within Milwaukee\n" +
            "    Delivery availability and fees are based on the delivery address provided during checkout. ",
        question2: "Citywide Delivery:",
        answer2: "    Afreebmart provides citywide delivery across Wisconsin.\n" +
            "    Delivery fees and timelines may vary based on distance and delivery zone within the state.",

    },

    {
        title: "Delivery Areas Timeline",
        question: "Order Processing:",
        answer:
            "     Orders are processed promptly upon receipt and verification of payment.\n" +
            "    After processing, orders are dispatched for delivery within 1 to 10 business days for standard delivery.",

        question2: "Dispatch and Transit:",
        answer2: " Transit times depend on the delivery location.",

        question3: "Estimated Delivery Time:",
        answer3: " For standard delivery: estimated timeframe of 1-7 business days from order processing.",

    },

    {
        title: "Delivery Policies",
        question: "Delivery Confirmation:",
        answer:
            " Customers will receive a confirmation email or notification once their order is out for delivery.",

        question2: "Tracking:",
        answer2: "Order tracking information will be provided to track the status of your delivery.",

        question3: "Delivery Updates:",
        answer3: "Customers may receive updates or notifications regarding their delivery status or any delays.",

    },

    {
        title: "Delivery Fees",
        question: "Standard Delivery Fees:",
        answer:
            "Standard fee does not apply.",

    },

    {
        title: "Delivery Schedule",
        question: "Delivery Days:",
        answer: "    Deliveries are typically made on [Specify delivery days, e.g., Monday to Friday].\n" +
            "    Weekend or holiday delivery options may be available in some areas.",

        question1: "Delivery Hours:",
        answer1: "    Delivery hours vary based on location and delivery carrier schedules.\n" +
            "    Customers will be informed of the estimated delivery window during checkout.",

    },

    {
        title: "Group Purchase",
        question: "Group Purchase Option:",
        answer: "     Customers have the option to buy items in groups as a team.\n" +
            "    Individuals participating in group purchases will bear the cost of their own items.",

    },

]

export function DeliveryOptions() {
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
                                <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                    Delivery Options and Timeline at Afreebmart
                                </h1>
                                <div className="mt-6 max-w-xl">
                                    <p className="text-lg leading-8 text-gray-600">
                                        Welcome to Afreebmart's Delivery Options and Timeline page. Here, we provide
                                        detailed information about our delivery services, including available options,
                                        delivery areas, timelines, and related policies.
                                    </p>
                                </div>
                            </div>
                            {/* Image */}
                            <div className="mt-10 sm:mt-16 lg:mt-0">
                                <img
                                    src={deliveryhero}
                                    alt=""
                                    className="aspect-[6/5] w-full max-w-lg rounded-2xl object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                        <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                            {faqs.map((faq) => (
                                <Disclosure as="div" key={faq.title} className="pt-6">
                                    {({open}) => (
                                        <>
                                            <dt>
                                                <Disclosure.Button
                                                    className="flex w-full items-start justify-between text-left text-gray-900">
                                                    <span
                                                        className="text-base font-semibold leading-7">{faq.title}</span>
                                                    <span className="ml-6 flex h-7 items-center">
                                                      {open ? (
                                                          <MinusSmallIcon className="h-6 w-6" aria-hidden="true"/>
                                                      ) : (
                                                          <PlusSmallIcon className="h-6 w-6" aria-hidden="true"/>
                                                      )}
                                                    </span>
                                                </Disclosure.Button>
                                            </dt>
                                            <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                                <h6>{faq.question}</h6>
                                                <p className="text-base leading-7 text-gray-600">{faq.answer}</p>

                                                <h6 className="mt-5">{faq.question2}</h6>
                                                <p className="text-base leading-7 text-gray-600">{faq.answer2}</p>

                                                <h6 className="mt-5">{faq.question3}</h6>
                                                <p className="text-base leading-7 text-gray-600">{faq.answer3}</p>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            ))}
                        </dl>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-10">
                    <h5 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h5>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        If you have any questions, need assistance with delivery options, or have special delivery
                        requests, please contact our customer support team at <a
                        href="mailto:support@afreebmart.com"> support@afreebmart.com</a>. We are here to ensure a smooth
                        and convenient delivery experience for you at Afreebmart.
                        Thank you for choosing Afreebmart. We look forward to delivering freshness to your doorstep!
                    </p>
                </div>
            </div>

            <Footer/>
        </>
    )
}