import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        isLoggedIn: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload;
            state.isLoggedIn = true;
        },
        clearUser: (state) => {
            state.currentUser = null;
            state.isLoggedIn = false;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;