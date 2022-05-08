import React from 'react'

const ChatMessage = ({ type }) => {
    return type === "sent" ? (
        <div className='rounded-md p-2 bg-slate-500 ml-auto px-4 text-white'>
            This is a chat message
        </div>

    ) :

        <div className='rounded-md p-2 bg-theme-500 px-4 text-white'>
            This is a chat message
        </div>

}

export default ChatMessage;