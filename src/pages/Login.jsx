import {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import axios from 'axios';
import {server} from "../Server.js";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import GoogleLoginButton from "../components/GoogleLoginButton.jsx";
import afreeblogo from '../assets/images/afreemart-logo.png';

export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if localStorage.isLoggedIn is true
        if (localStorage.getItem('isLoggedIn') === 'true') {
            // Redirect to /dashboard
            navigate('/dashboard');
            // Show a toast notification
            toast.success('You are already logged in!');
        }
    }, []);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });



    const dispatch = useDispatch();

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${server}/login`, formData);
            console.log(response.data);
            if (response.data) {
                const role = response.data.user.role || response.data.user?.user?.role; // Get role safely
                if (role === 'vendor' || role === 'admin') {
                    toast.error("Can't login as vendor or admin.");
                    return; // Stop login process
                } else {
                    dispatch(setUser(response.data.user));
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    localStorage.setItem('isLoggedIn', 'true');
                    navigate('/dashboard');
                }
            }
        } catch (error) {
            console.error('Login failed:', error);
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
                        Sign in
                    </h2>
                    <p className="mt-2 text-center text-sm leading-6 text-gray-600">
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        Don't have an account?
                        {' '}
                        <a href="/register" className="font-semibold text-primary hover:text-secondary">
                            Sign up
                        </a>
                    </p>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <form className="space-y-2" onSubmit={handleSubmit}>
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

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="rememberMe"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        checked={formData.rememberMe}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm leading-6">
                                    <a href="/password-reset" className="font-semibold text-primary hover:text-secondary">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>

                        <div>
                            <div className="relative mt-10">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-200"/>
                                </div>
                                <div className="relative flex justify-center text-sm font-medium leading-6">
                                    <span className="bg-white px-6 text-gray-900">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                {/*<a*/}
                                {/*    href="#"*/}
                                {/*    className="flex w-full items-center justify-center gap-3 rounded-md bg-gray-100 px-3 py-1.5 text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"*/}
                                {/*>*/}
                                {/*    <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">*/}
                                {/*        <path*/}
                                {/*            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"*/}
                                {/*            fill="#4285F4"*/}
                                {/*        />*/}
                                {/*        <path*/}
                                {/*            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"*/}
                                {/*            fill="#34A853"*/}
                                {/*        />*/}
                                {/*        <path*/}
                                {/*            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"*/}
                                {/*            fill="#FBBC05"*/}
                                {/*        />*/}
                                {/*        <path*/}
                                {/*            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"*/}
                                {/*            fill="#EA4335"*/}
                                {/*        />*/}
                                {/*    </svg>*/}
                                {/*    <span className="text-sm font-semibold leading-6">Google</span>*/}
                                {/*</a>*/}

                                <GoogleLoginButton />

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
                </div>
            </div>
        </>
    )
}