import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import afreeblogo from '../assets/images/afreemart-logo.png';
import axios from 'axios';
import {server} from "../Server.js"; // Import Axios

export default function PasswordReset() {
    const navigate = useNavigate();
    const [email, setEmail] = useState(''); // State to store email input

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            navigate('/dashboard');
            toast.success('You are already logged in!');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${server}/password/email`, { // Replace with your API endpoint
                email: email // Send the email to your API
            });

            // Handle successful response (e.g., display a success message)
            console.log(response.data);
            toast.success('Password reset email sent!');

        } catch (error) {
            // Handle error (e.g., display an error message)
            console.error('Password reset failed:', error);
            toast.error('Password reset failed. Please try again later.');
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <a href="/">
                        <img
                            className="mx-auto h-10 w-auto"
                            src={afreeblogo}
                            alt="Afreebmart"
                        />
                    </a>
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Reset Password
                    </h2>
                </div>
                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <form className="space-y-2" onSubmit={handleSubmit}> {/* Add onSubmit handler */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Account Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                        value={email} // Bind input value to email state
                                        onChange={(e) => setEmail(e.target.value)} // Update email state on input change
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                >
                                    Reset Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}