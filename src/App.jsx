import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import MainShop from './pages/Products/MainShop.jsx';
import BulkShop from './pages/Products/BulkShop.jsx';
import Product from './pages/Products/Product.jsx';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmed from './pages/OrderConfirmed';
import Wishlist from './pages/Wishlist';
import Account from './pages/Account/Account.jsx';
import Register from './pages/Register';
import Login from './pages/Login';
import PasswordReset from './pages/PasswordReset';
import PasswordChange from './pages/PasswordChange';
import EmailConfirmation from './pages/EmailConfirmation';
import {ToastContainer} from "react-toastify";
import Orders from "./pages/Account/Orders.jsx";
import Payments from "./pages/Account/Payments.jsx";
import Dashboard from "./pages/Account/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import GroupOrders from "./pages/Account/GroupOrders.jsx";
import TrackingOrder from "./pages/Account/TrackingOrder.jsx";
import Addresses from "./pages/Account/Addresses.jsx";
import SubCategory from "./pages/Products/SubCategory.jsx";
import OrderDetails from "./pages/Account/OrderDetails.jsx";
import Invoice from "./pages/Account/Invoice.jsx";
import Search from "./pages/Products/Search.jsx"
import 'react-toastify/dist/ReactToastify.css';
import AboutPage from "./pages/Landing/AboutPage.jsx";
import {DeliveryOptions} from "./pages/Landing/DeliveryOptions.jsx";
import {PrivacyPolicy} from "./pages/Landing/PrivacyPolicy.jsx";
import {TermsOfService} from "./pages/Landing/TermsOfService.jsx";
import {FreshnessPolicy} from "./pages/Landing/FreshnessPolicy.jsx";
import {ReturnPolicy} from "./pages/Landing/ReturnPolicy.jsx";
import {ContactPage} from "./pages/Landing/ContactPage.jsx";
import Vendors from "./pages/Landing/Vendors.jsx";
import {VendorGuide} from "./pages/Landing/VendorGuide.jsx";
import LogisticsPartner from "./pages/Landing/LogisticsPartner.jsx";
import Compensation from "./pages/Landing/Compensation.jsx";
import {Faq} from "./pages/Landing/Faq.jsx";
import {MakeAReport} from "./pages/Landing/MakeAReport.jsx";
import {Careers} from "./pages/Landing/Careers.jsx";
import VendorProducts from "./pages/Products/VendorProducts.jsx";

const App = () => {
    return (
        <Router>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/shop" element={<MainShop />} />
                <Route path="/bulk-shop" element={<BulkShop />} />
                <Route path="/product/:productName" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-successful" element={<OrderConfirmed />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/account" element={<Account />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/password-reset" element={<PasswordReset />} />
                <Route path="/password-reset-success" element={<PasswordChange />} />
                <Route path="/email-confirmation" element={<EmailConfirmation />} />
                <Route path="/category/:categoryName" element={<MainShop />} />
                <Route path="/subcategory/:subcategoryName" element={<SubCategory />} />
                <Route path="/search/:searchTerm" element={<MainShop />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/order/:orderId" element={<OrderDetails />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/group-orders" element={<GroupOrders />} />
                <Route path="/tracking-order/:orderId" element={<TrackingOrder />} />
                <Route path="/address" element={<Addresses />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/invoice/:invoiceId" element={<Invoice />} />
                <Route path="/vendor/products/:vendorId" element={<VendorProducts />} />

                {/* Landing Pages */}

                <Route path="/about" element={<AboutPage />} />
                <Route path="/delivery-options" element={<DeliveryOptions />}/>
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/freshness-policy" element={<FreshnessPolicy />} />
                <Route path="/return-policy" element={<ReturnPolicy />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/vendors" element={<Vendors />} />
                <Route path="/vendor-guide" element={<VendorGuide />} />
                <Route path="/logistics-partner" element={<LogisticsPartner />} />
                <Route path="/compensation" element={<Compensation />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/make-a-report" element={<MakeAReport />} />
                <Route path="/careers" element={<Careers />} />

            </Routes>
        </Router>
    );
};

export default App;