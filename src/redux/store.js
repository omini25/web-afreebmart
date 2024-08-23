import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import wishlistReducer from './wishlistSlice';
import cartReducer from './cartSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        wishlist: wishlistReducer,
        cart: cartReducer,
    },
});

export default store;