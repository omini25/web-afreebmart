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
                <Route path="/order-confirmed" element={<OrderConfirmed />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/account" element={<Account />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/password-reset" element={<PasswordReset />} />
                <Route path="/password-change" element={<PasswordChange />} />
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
                <Route path="/invoice/:paymentId" element={<Invoice />} />

            </Routes>
        </Router>
    );
};

export default App;