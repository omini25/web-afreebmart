import { EnvelopeIcon } from '@heroicons/react/24/outline';
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import { useState } from 'react';
import contact from "../../assets/images/landing/contact-2.png"
import {toast} from "react-toastify";

export function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Email sent successfully
                console.log('Email sent successfully!');
                toast.success('Message sent successfully!')
                // You can display a success message to the user here
            } else {
                // Handle error
                console.error('Error sending email:', response.status);
                // Display an error message to the user
            }
        } catch (error) {
            console.error('Error sending email:', error);
            // Display an error message to the user
        }
    };

    return (
        <>
            <Header />

            <div className="relative bg-white">
                <div className="lg:absolute lg:inset-0 lg:left-1/2">
                    <img
                        className="h-64 w-full bg-gray-50 object-contain sm:h-80 lg:absolute lg:h-full md:h-48"
                        src={contact}
                        alt=""
                    />
                </div>
                <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:pt-32">
                <div className="px-6 lg:px-8">
                        <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">Send us a message or ask a
                                question</h1>
                            <div className="flex gap-x-4 mt-5">
                                <dt className="flex-none">
                                    <span className="sr-only">Email</span>
                                    <EnvelopeIcon className="h-7 w-6 text-gray-400" aria-hidden="true"/>
                                </dt>
                                <dd>
                                    <a className="hover:text-gray-900" href="mailto:support@afreebmart.com">
                                        support@afreebmart.com
                                    </a>
                                </dd>
                            </div>
                            <form onSubmit={handleSubmit} className="px-6 pb-10 sm:pb-32 lg:px-8 lg:py-10">
                                <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="first-name"
                                                   className="block text-sm font-semibold leading-6 text-gray-900">
                                                First name
                                            </label>
                                            <div className="mt-2.5">
                                                <input
                                                    type="text"
                                                    name="first-name"
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="last-name"
                                                   className="block text-sm font-semibold leading-6 text-gray-900">
                                                Last name
                                            </label>
                                            <div className="mt-2.5">
                                                <input
                                                    type="text"
                                                    name="last-name"
                                                    id="last-name"
                                                    autoComplete="family-name"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="email"
                                                   className="block text-sm font-semibold leading-6 text-gray-900">
                                                Email
                                            </label>
                                            <div className="mt-2.5">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    autoComplete="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="phone-number"
                                                   className="block text-sm font-semibold leading-6 text-gray-900">
                                                Phone number
                                            </label>
                                            <div className="mt-2.5">
                                                <input
                                                    type="tel"
                                                    name="phone-number"
                                                    id="phone-number"
                                                    autoComplete="tel"
                                                    value={formData.phoneNumber}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="message"
                                                   className="block text-sm font-semibold leading-6 text-gray-900">
                                                Message
                                            </label>
                                            <div className="mt-2.5">
                                      <textarea
                                          name="message"
                                          id="message"
                                          rows={4}
                                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                          defaultValue={''}
                                          value={formData.message}
                                          onChange={handleChange}
                                      />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex justify-end">
                                        <button
                                            type="submit"
                                            className="rounded-md bg-btnprimary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                        >
                                            Send message
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    )


}

