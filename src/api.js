import axios from 'axios';
import { server } from './Server';

const api = axios.create({
    baseURL: `${server}`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

export const createChat = async (data) => { // Accept data object
    return await api.post('/chats', data); // Send the data object directly
};

export const sendMessage = async (chatRoomId, content) => {
    return await api.post(`/chats/${chatRoomId}/messages`, { content });
};

export const getMessages = async (chatRoomId) => {
    return await api.get(`/chats/${chatRoomId}/messages`);
};

export const getChats = async () => {
    return await api.get('/chats');
};