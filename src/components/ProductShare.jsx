import React, { useState } from 'react';
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    EmailShareButton,
    EmailIcon,
} from 'react-share';

const ProductShare = ({ product }) => {
    const [showCopiedMessage, setShowCopiedMessage] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                setShowCopiedMessage(true);
                setTimeout(() => setShowCopiedMessage(false), 2000); // Hide message after 2 seconds
            })
            .catch((err) => {
                console.error('Failed to copy: ', err);
            });
    };

    return (
        <div className="mt-6 flex items-center space-x-4">
            <FacebookShareButton url={window.location.href} quote={product.product_name}>
                <a href="#" className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Share on Facebook</span>
                    <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                            clipRule="evenodd"
                        />
                    </svg>
                </a>
            </FacebookShareButton>

            <TwitterShareButton url={window.location.href} title={product.product_name}>
                <a href="#" className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Share on Twitter</span>
                    <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                    </svg>
                </a>
            </TwitterShareButton>

            <WhatsappShareButton url={window.location.href} title={product.product_name}>
                <a href="#" className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Share on Whatsapp</span>
                    <WhatsappIcon size={24} round />
                </a>
            </WhatsappShareButton>

            <EmailShareButton url={window.location.href} subject={product.product_name}>
                <EmailIcon size={24} round/>
            </EmailShareButton>

            <button onClick={handleCopyLink} className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H6.75a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
                </svg>
            </button>

            {showCopiedMessage && (
                <span className="text-green-500 text-sm">Link copied!</span>
            )}
        </div>
    );
};

export default ProductShare;