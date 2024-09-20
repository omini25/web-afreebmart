// src/services/api.js

import axios from 'axios';

const API_URL = 'https://api.afreebmart.com/api';
// Correctly parsing and accessing the user ID from localStorage
const storedUserData = JSON.parse(localStorage.getItem('user')); // Assuming 'user' is the key where user data is stored
const userId = storedUserData ? storedUserData.id : null;
// Parse the stored item from localStorage
const storedData = JSON.parse(localStorage.getItem('user'));

// Access the access_token object and then the actual token
const accessToken = storedData?.access_token?.id;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,// Assuming you store the auth token in localStorage
    }
});

export const getChats = () => api.get(`/chats/${userId}`);
export const getMessages = (threadId) => api.get(`/chats/${threadId}/messages/${userId}`);
export const sendMessage = (threadId, message) => api.post(`/chats/${threadId}/messages/${userId}`, { message });
export const createChat = (subject, message, participants) => api.post(`/chats/${userId}`, { subject, message, participants });