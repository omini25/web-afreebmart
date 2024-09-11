import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useEffect} from "react";
import afreeblogo from '../assets/images/afreemart-logo.png';

export default function PasswordChange() {
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
                        Enter New Password
                    </h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <form className="space-y-2" action="#" method="POST">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                   New Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"

                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmpassword"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm New Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"

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
    )
}
