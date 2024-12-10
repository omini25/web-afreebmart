import {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import axios from 'axios';
import {server} from "../Server.js";
import GoogleLoginButton from "../components/GoogleLoginButton.jsx";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import afreeblogo from '../assets/images/afreemart-logo.png';

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            navigate('/dashboard');
            toast.success('You are already logged in!');
        }
    }, [navigate]);


    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${server}/register`, formData);
            if (response.data) {
                // 1. Update Redux store and local storage FIRST
                dispatch(setUser(response.data.user));
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('isLoggedIn', 'true');

                toast.success('Registration successful!')

                // 2. THEN navigate AFTER state updates
                navigate('/');
            }
        }  catch (error) {
            console.error('Registration failed:', error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message); // Display server error
            } else {
                toast.error('Registration failed. Please try again later.');
            }
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
                        Sign up
                    </h2>
                    <p className="mt-2 text-center text-sm leading-6 text-gray-600">
                        Already have an account?
                        {' '}
                        <a href="/login" className="font-semibold leading-6 text-primary hover:text-secondary">
                            Log in
                        </a>
                    </p>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-6 shadow sm:rounded-lg sm:px-12">
                        <form className="space-y-2" onSubmit={handleSubmit}>
                            {/* Form fields */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>


                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                    Phone number
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="phone"
                                        autoComplete="phone"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmpassword" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>

                        <div>
                            {/*<div className="relative mt-10">*/}
                            {/*    <div className="absolute inset-0 flex items-center" aria-hidden="true">*/}
                            {/*        <div className="w-full border-t border-gray-200"/>*/}
                            {/*    </div>*/}
                            {/*    <div className="relative flex justify-center text-sm font-medium leading-6">*/}
                            {/*        <span className="bg-white px-6 text-gray-900">Or continue with</span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                {/*<GoogleLoginButton/>*/}

                                {/*<a*/}
                                {/*    href="#"*/}
                                {/*    className="flex w-full items-center justify-center gap-3 rounded-md bg-[#1877F2] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1877F2]"*/}
                                {/*>*/}
                                {/*    <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">*/}
                                {/*        <path*/}
                                {/*            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>*/}
                                {/*    </svg>*/}
                                {/*    <span className="text-sm font-semibold leading-6">Facebook</span>*/}
                                {/*</a>*/}
                            </div>
                        </div>
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        By clicking sign up you agree to our{' '}
                        <a href="#" className="font-semibold leading-6 text-primary hover:text-secondary">
                            Terms
                        </a>
                        {' '}
                        and
                        {' '}
                        <a href="#" className="font-semibold leading-6 text-primary hover:text-secondary">
                            Privacy Policy
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}