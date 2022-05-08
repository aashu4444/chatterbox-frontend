import axios from 'axios';
import React from 'react';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import ChatMessage from './ChatMessage';

const Chats = ({ friendId }) => {
    const [message, setMessage] = useState("");
    const {authToken} = useContext(UserContext);
    const sendMessage = async () => {
        const res = await axios.post(url('/api/message/send'), {
            message:message,
            target_user_id: friendId,
        }, {
            headers: {
                'auth-token':authToken
            }
        });

        console.log(res);
    }
    return (
        <div className='h-full flex flex-col w-full shadow-md p-3'>
            <div id="ChatMessages" className='flex-grow flex items-end w-full p-3'>
                <ChatMessage type="sent" />
            </div>
            <form id="sendMessageContainer" className='flex text-theme-500 gap-x-2' onSubmit={sendMessage}>
                <input type="text" className="w-full rounded-md outline-none p-3 bg-slate-100 focus:ring-2 ring-theme-500 transition-all duration-200" placeholder='Type here to send a message.' value={message} onChange={e => setMessage(e.target.value)}/>
                <button className='flex items-center justify-center px-4 hover:bg-theme-500 transition-all duration-200 rounded-md bg-theme-400 text-white'><i className="fa fa-paper-plane "></i></button>
            </form>
        </div>
    )
}

export default Chats