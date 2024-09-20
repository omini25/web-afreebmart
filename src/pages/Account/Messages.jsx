import {useEffect, useState} from 'react'
import {
    CreditCardIcon,
    CubeIcon,
    MapPinIcon, RectangleGroupIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline'
import Header from "../../components/Header.jsx";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import { getChats, getMessages, sendMessage, createChat } from '../../api.js';
import {ChatBubbleBottomCenterIcon} from "@heroicons/react/24/outline/index.js";


const secondaryNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: UserCircleIcon, current: false },
    { name: 'Orders', href: '/orders', icon: CubeIcon, current: false },
    { name: 'Group Orders', href: '/group-orders', icon: RectangleGroupIcon, current: false },
    { name: 'Messages', href: '/messages', icon: ChatBubbleBottomCenterIcon, current: true },
    { name: 'Payments', href: '/payments', icon: CreditCardIcon, current: false },
    { name: 'Addresses', href: '/address', icon: MapPinIcon, current: false },
    { name: 'Account', href: '/account', icon: UserCircleIcon, current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Messages() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const userId = user.id;
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newChatUserId, setNewChatUserId] = useState('');


    useEffect(() => {
        fetchChats();
    }, []);

    const fetchChats = async () => {
        try {
            const response = await getChats();
            setChats(response.data.threads);
        } catch (error) {
            console.error('Error fetching chats:', error);
        }
    };


    const fetchMessages = async (threadId) => {
        try {
            const response = await getMessages(threadId);
            setMessages(response.data.messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleChatSelect = (chat) => {
        setSelectedChat(chat);
        fetchMessages(chat.id);
    };


    const handleSendMessage = async () => {
        try {
            await sendMessage(selectedChat.id, newMessage);
            setNewMessage('');
            fetchMessages(selectedChat.id);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleCreateChat = async () => {
        try {
            await createChat('From Admin', 'Hello!', [newChatUserId]);
            setShowModal(false);
            setNewChatUserId('');
            fetchChats();
            toast('Chat request sent. You will see the chat if the user accepts.');
        } catch (error) {
            console.error('Error creating chat:', error);
        }
    };

    return (
        <>
            <Header />

            <div className="mx-auto max-w-7xl pt-4 lg:flex lg:gap-x-16 lg:px-8">
                <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
                    <nav className="flex-none px-4 sm:px-6 lg:px-0">
                        <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
                            {secondaryNavigation.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? 'bg-gray-50 text-primary'
                                                : 'text-gray-700 hover:text-primary hover:bg-gray-50',
                                            'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold'
                                        )}
                                    >
                                        <item.icon
                                            className={classNames(
                                                item.current ? 'text-primary' : 'text-gray-400 group-hover:text-primary',
                                                'h-6 w-6 shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
                    <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Messages</h3>
                        {/*<div className="mt-3 sm:ml-4 sm:mt-0">*/}
                        {/*    <button*/}
                        {/*        type="button"*/}
                        {/*        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"*/}
                        {/*        onClick={() => setShowModal(true)}*/}
                        {/*    >*/}
                        {/*        Start New Chat*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                    </div>


                    <div className="flex w-full h-full shadow-lg rounded-3xl">
                        <section className="flex flex-col pt-3 w-4/12 bg-gray-50 h-full overflow-y-scroll">
                            <label className="px-3">
                                <input
                                    className="rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full"
                                    placeholder="Search..."
                                />
                            </label>
                            <ul className="mt-6">
                                {chats.map((chat) => (
                                    <li
                                        key={chat.id}
                                        className={`py-5 border-b px-3 transition hover:bg-secondary cursor-pointer ${
                                            selectedChat && selectedChat.id === chat.id ? 'bg-primary text-white' : ''
                                        }`}
                                        onClick={() => handleChatSelect(chat)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-semibold">{chat.subject}</h3>
                                            <p className={`text-md ${selectedChat && selectedChat.id === chat.id ? 'text-white' : 'text-gray-400'}`}>
                                                {new Date(chat.updated_at).toLocaleString()}
                                            </p>
                                        </div>
                                        <div
                                            className={`text-md italic ${selectedChat && selectedChat.id === chat.id ? 'text-white' : 'text-gray-400'}`}>
                                            {chat.latest_message ? chat.latest_message.body : 'No messages yet'}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="w-8/12 px-4 flex flex-col bg-white rounded-r-3xl">
                            {selectedChat ? (
                                <>
                                    <div className="flex justify-between items-center h-24 border-b-2 mb-8">
                                        <div className="flex space-x-4 items-center">
                                            <div className="h-12 w-12 rounded-full overflow-hidden">
                                                <img
                                                    src="https://via.placeholder.com/50"
                                                    alt="Profile"
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <h3 className="font-semibold text-lg">{selectedChat.subject}</h3>
                                                <p className="text-light text-gray-400">
                                                    {selectedChat?.participants?.length} participants
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-grow overflow-y-auto mb-4">
                                        {messages.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`mb-4 ${message.user.id === userId ? 'text-right' : 'text-left'}`}
                                            >
                                                <p className="font-semibold">{message.user.name}</p>
                                                <p className="bg-gray-100 p-2 rounded-lg inline-block">{message.body}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <section className="mt-6 border rounded-xl bg-gray-50 mb-3">
                                              <textarea
                                                  className="w-full bg-gray-50 p-2 rounded-xl"
                                                  placeholder="Type your reply here..."
                                                  rows={3}
                                                  value={newMessage}
                                                  onChange={(e) => setNewMessage(e.target.value)}
                                              />
                                        <div className="flex items-center justify-between p-2">
                                            <button className="h-6 w-6 text-gray-400">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                className="bg-primary text-white px-6 py-2 rounded-xl"
                                                onClick={handleSendMessage}
                                            >
                                                Reply
                                            </button>
                                        </div>
                                    </section>
                                </>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-gray-500 text-lg">Select a chat to view messages</p>
                                </div>
                            )}
                        </section>
                    </div>

                    {showModal && (
                        <div
                            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                            <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
                                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Start New Chat</h3>
                                <input
                                    type="text"
                                    className="w-full p-2 mb-4 border rounded"
                                    placeholder="Enter user ID"
                                    value={newChatUserId}
                                    onChange={(e) => setNewChatUserId(e.target.value)}
                                />
                                <div className="flex justify-end">
                                    <button
                                        className="bg-primary text-white px-4 py-2 rounded mr-2"
                                        onClick={handleCreateChat}
                                    >
                                        Create Chat
                                    </button>
                                    <button
                                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    )
}
