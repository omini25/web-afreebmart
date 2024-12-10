import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import afreeblogo from '../assets/images/afreemart-logo.png';
import axios from "axios";
import { server } from "../Server.js";

export default function PasswordChange() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Get token and email from URL path
        const pathParts = window.location.pathname.split('/');
        const tokenFromUrl = pathParts[pathParts.length - 1]; // Get last segment of URL
        const urlParams = new URLSearchParams(window.location.search);
        const emailFromUrl = urlParams.get('email');

        if (!tokenFromUrl || !emailFromUrl) {
            toast.error('Invalid reset link');
            navigate('/login');
            return;
        }

        setToken(tokenFromUrl);
        setEmail(emailFromUrl);

        if (localStorage.getItem('isLoggedIn') === 'true') {
            navigate('/dashboard');
            toast.success('You are already logged in!');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            setLoading(false);
            return;
        }

        if (password.length < 8) {
            toast.error('Password must be at least 8 characters long');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${server}/password/reset`, {
                token: token,
                email: email,
                password: password,
                password_confirmation: confirmPassword,
            });

            if (response.data.status === 'success') {
                toast.success('Password reset successful!');
                navigate('/login');
            } else {
                toast.error(response.data.message || 'Password reset failed');
            }
        } catch (error) {
            console.error('Password reset failed:', error);

            if (error.response?.data?.errors?.email) {
                toast.error(error.response.data.errors.email[0]);
            } else if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Password reset failed. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
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
                    Enter New Password
                </h2>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                New Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="new-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                    minLength={8}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm New Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    autoComplete="new-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                    minLength={8}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
                            >
                                {loading ? 'Resetting Password...' : 'Reset Password'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}