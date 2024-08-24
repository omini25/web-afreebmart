import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist, setWishlistItems } from './wishlistSlice';
import { addToCart, removeFromCart, updateCartItemQuantity, setCartItems } from './cartSlice';
import { loadState, saveState } from './localStorageUtils';
import { useEffect } from 'react';

export const useShoppingHooks = () => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const cartItems = useSelector((state) => state.cart.items);

    useEffect(() => {
        initializeFromLocalStorage();
    }, []);

    const initializeFromLocalStorage = () => {
        const savedWishlist = loadState('wishlist');
        if (savedWishlist) {
            dispatch(setWishlistItems(savedWishlist));
        }

        const savedCart = loadState('cart');
        if (savedCart) {
            dispatch(setCartItems(savedCart));
        }
    };

    const addProductToWishlist = (product) => {
        dispatch(addToWishlist(product));
        saveState('wishlist', [...wishlistItems, product]);
    };

    const removeProductFromWishlist = (productId) => {
        dispatch(removeFromWishlist(productId));
        saveState('wishlist', wishlistItems.filter(item => item.id !== productId));
    };

    const addProductToCart = (product) => {
        dispatch(addToCart(product));
        const updatedCart = cartItems.find(item => item.id === product.id)
            ? cartItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
            : [...cartItems, { ...product, quantity: 1 }];
        saveState('cart', updatedCart);
    };

    const removeProductFromCart = (productId) => {
        dispatch(removeFromCart(productId));
        saveState('cart', cartItems.filter(item => item.id !== productId));
    };

    const updateCartProductQuantity = (productId, quantity) => {
        dispatch(updateCartItemQuantity({ id: productId, quantity }));
        saveState('cart', cartItems.map(item => item.id === productId ? { ...item, quantity } : item));
    };

    return {
        wishlistItems,
        cartItems,
        initializeFromLocalStorage,
        addProductToWishlist,
        removeProductFromWishlist,
        addProductToCart,
        removeProductFromCart,
        updateCartProductQuantity,
    };
};