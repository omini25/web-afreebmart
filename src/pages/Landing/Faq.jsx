import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";

const faqs = [
    {
        question: "Payment",
        answer:
            "What payment methods are accepted on Afreebmart?\n" +
            "\n" +
            "Afreebmart accepts payments through major credit/debit cards. We do not offer cash on delivery (COD).\n" +
            "\n" +
            "How can I update my payment information?\n" +
            "\n" +
            "You can update your payment information by logging into your Afreebmart account, navigating to the \"Payment Methods\" section, and adding/editing your preferred payment method.",
    },

    {
        question: "Delivery",
        answer:
            "What are the delivery options available?\n" +
            "\n" +
            "Afreebmart offers standard shipping service. We do not offer in-store pickup options. Delivery times vary based on the shipping method and your location.\n" +
            "\n" +
            "How can I track my order?\n" +
            "\n" +
            "Once your order is shipped, you will receive a tracking number via email or SMS. You can use this tracking number to monitor the status of your delivery on our website or through our delivery partner's tracking system.",
    },

    {
        question: "Product",
        answer:
            "Are products on Afreebmart authentic?\n" +
            "\n" +
            "Yes, Afreebmart partners with trusted suppliers, and vendors to ensure that all products listed on our platform are authentic and of high quality.\n" +
            "\n" +
            "How can I return or exchange a product?\n" +
            "\n" +
            "If you are not satisfied with your purchase, you cannot return your order because they are food items. However, you can be compensated by the vendor after reporting quality issues with your order through our complaint channel.",
    },

    {
        question: "Sell on Afreebmart",
        answer:
            "How can I become a seller on Afreebmart?\n" +
            "\n" +
            "To sell on Afreebmart, you can apply to become a seller by filling out the seller registration form on our website. Our team will review your application, and upon approval, you can start listing your products for sale.\n" +
            "\n" +
            "What are the seller fees and commissions?\n" +
            "\n" +
            "Afreebmart charges a 5% commission on successful sales, in addition to any applicable transaction fees. Detailed fee structures are available in your seller dashboard.",
    },

    {
        question: "Account Management",
        answer:
            "How can I change my account password?\n" +
            "\n" +
            "You can change your account password by logging into your Afreebmart account, going to the \"Account Settings\" section, and selecting the option to change your password.\n" +
            "\n" +
            "Can I delete my Afreebmart account?\n" +
            "\n" +
            "Yes, you can request to delete your Afreebmart account by contacting our customer support team. Please note that deleting your account will permanently remove all account data and order history.",
    },

    {
        question: "Bulk Purchase",
        answer:
            "What is a bulk purchase on Afreebmart?\n" +
            "\n" +
            "A bulk purchase on Afreebmart allows customers to join together with others to make bulk purchases of a specific product. This enables them to benefit from discounted prices or special offers that are only available for bulk purchases.\n" +
            "\n" +
            "How does a bulk purchase work?\n" +
            "\n" +
            "To initiate a bulk purchase, a customer creates a bulk and invites others to join. Once the required number of participants has joined the bulk, the purchase is confirmed, and all members receive the discounted price or special offer.\n" +
            "\n" +
            "Can anyone join a bulk purchase?\n" +
            "\n" +
            "Yes, anyone with an Afreebmart account can join a bulk purchase, provided that they meet the criteria set by the bulk creator, such as minimum quantity or total order amount.\n" +
            "\n" +
            "How can I create or join a bulk purchase?\n" +
            "\n" +
            "To create a bulk purchase, log into your Afreebmart account, navigate to the bulk purchase section, and follow the prompts to create a new bulk. To join an existing bulk purchase, simply accept the invitation or request to join from the bulk creator.\n" +
            "\n" +
            "What are the benefits of participating in a bulk purchase?\n" +
            "\n" +
            "Participating in a bulk purchase allows customers to enjoy lower prices, bulk discounts, or exclusive deals that may not be available for individual purchases. It also fosters a sense of community and collaboration among buyers.\n" +
            "\n" +
            "Can I customize the terms of a bulk purchase?\n" +
            "\n" +
            "Yes, as the bulk creator, you can customize the terms of the bulk purchase, such as setting the minimum quantity, maximum participants, duration of the bulk, and any special conditions or requirements.\n" +
            "\n" +
            "How are payments handled in a bulk purchase?\n" +
            "\n" +
            "Payments for bulk purchases are typically collected from all participants once the bulk purchase is confirmed. Each participant is responsible for their share of the total purchase amount based on the agreed-upon terms.",
    },

]

export function Faq() {
    return (
        <>
            <Header />
            <div className="bg-white">
                <div className="mx-auto max-w-7xl px-6 py-16 sm:py-32 lg:px-8 lg:py-40">
                    <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                        <h2 className="text-4xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked
                            questions</h2>
                        <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                            {faqs.map((faq) => (
                                <Disclosure as="div" key={faq.question} className="pt-6">
                                    {({open}) => (
                                        <>
                                            <dt>
                                                <Disclosure.Button
                                                    className="flex w-full items-start justify-between text-left text-gray-900">
                                                    <span
                                                        className="text-base font-semibold leading-7">{faq.question}</span>
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
                                                <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}