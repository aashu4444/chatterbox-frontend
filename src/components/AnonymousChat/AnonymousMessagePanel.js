import { faFile, faMinimize, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useRouter } from "next/router";
import { AppContext } from "@/AppContext";
import axios from "axios";
import { url } from "@/baseObjs";
import Attach from '@/components/messages/Attach';
import Attachments from '@/components/messages/Attachments';
import styles from '@/styles/messagePanelStyles.module.scss';

export default function AnonymousMessagePanel({ roomChatMessages, room, roomName, setRoomChatMessages, username }) {
    const { user, authToken, currentChatDetails } = useContext(AppContext);
    const [websocket, setWebsocket] = useState(null);
    const msgInput = useRef(null);
    const [filesData, setFilesData] = useState([]);
    const [ipAddress, setIpAddress] = useState("");
    const router = useRouter();
    const attachmentsForm = useRef(null);
    const messageForm = useRef(null);
    const messagesSection = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);


    useEffect(() => {

        const socket = new WebSocket(`ws://127.0.0.1:8000/ws/message/${roomName}/`);

        socket.onopen = () => {
            setWebsocket(socket);
        };

        socket.onmessage = async (event) => {
            const { message } = JSON.parse(event.data);
            const sentAttachments = await attachFiles(message.pk);

            const Message = {...message}
            Message.fields.attachments = JSON.stringify(sentAttachments);


            setRoomChatMessages((prevMessages) => [...prevMessages, Message])
            
            // Reset selected files and wrote message
            attachmentsForm.current.reset();
            messageForm.current.reset();
            setSelectedFiles([])



        };

        return () => {
            socket.close();
        };
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();

        if (websocket) {
            const msgData = {
                message: msgInput.current.value,
                anonymous: 'true',
                senderIp: ipAddress,
                username: username,
            };


            websocket.send(JSON.stringify(msgData));
        }


    };


    const attachFiles = async msgId => {
        const formData = new FormData(attachmentsForm.current);
        formData.set('message_id', msgId)

        const res = await axios.post(url("/anonymous_chat/upload_attachments"), formData);


        return JSON.parse(res.data);
    };

    useEffect(() => {
        setIpAddress(window.location.hostname)
        messagesSection.current.scrollTo(0, messagesSection.current.scrollHeight);

    }, [])



    return (
        <section id="messagesSection" className="flex flex-col w-full px-3 flex-grow ">

            <>
                <div className="messageCard w-full h-16  bg-gray-200 hover:bg-gray-200/80 rounded-tl-lg rounded-tr-lg mt-4 p-3 flex dark:bg-gray-900 shadow-lg">
                    <div className="pp w-10 rounded-md bg-gray-600"></div>

                    <div>
                        <h4 className="text-sm ml-2">{roomName}</h4>
                        <p className="text-sm ml-2 text-gray-400">Created on : {room.created_on}</p>
                    </div>
                </div>

                <div className="flex  w-full flex-col justify-end bg-gray-100 h-16 dark:bg-gray-800/30 p-3 grow  ">
                    <section className={`mb-5 flex flex-col gap-y-3 overflow-y-auto grow text-white pr-2 ${styles.messagesSection}`} ref={messagesSection}>
                        {
                            roomChatMessages.map((message, key) => (
                                
                                    message.fields.senderIp === ipAddress ?

                                        <div className="ml-auto rounded-2xl bg-gradient-to-r flex flex-col from-indigo-500 via-purple-500 to-pink-500 p-2 px-3 dark:text-white" key={key}>
                                            {  message.fields.attachments.length !== 0 ?
                                        <Attachments key={key} attachments={message.fields.attachments} />
                                    : ""}
                                            <span className="text-white">{message.fields.message}</span>
                                            <hr />
                                            <p>{message.fields.user.username}</p>
                                        </div>

                                        :
                                        <div className="ml-auto rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2 px-3 dark:text-white" key={key}>
                                            <span className="text-white">{message.fields.message}</span>
                                            
                                        </div>
                                
                            ))
                        }

                    </section>

                    <form onSubmit={sendMessage} className="flex gap-x-2" ref={messageForm}>
                        <div className="w-full  relative">
                            {selectedFiles.length !== 0 &&
                                <div id="selectedFiles" className="rounded-md overflow-x-scroll absolute bottom-full dark:bg-gray-800/60 w-full p-3 flex gap-x-3 bg-gray-300/40">
                                    {
                                        selectedFiles.map((filename, index) =>
                                            <div className="selectedFile flex flex-col gap-y-2 bg-gray-500/30 dark:bg-gray-900 p-3 w-24" key={index}>
                                                <FontAwesomeIcon icon={faFile} />
                                                <p>{filename.slice(0, 6)}...</p>


                                            </div>
                                        )
                                    }
                                    <FontAwesomeIcon icon={faMinimize} className="fixed right-0 top-0 only:dark:bg-gray-900 " />
                                </div>}
                            <input type="text" className="mt-4 form-input bg-gray-300 w-full rounded-full border-none dark:bg-gray-800 px-4 text-white outline-none ring-offset-cyan-700 transition-all duration-150 focus:ring-2 focus:ring-offset-0" placeholder="Type your message here" ref={msgInput} />
                        </div>
                        <div className="flex items-end">
                             { ipAddress !== "" && <Attach
                                    setFilesData={setFilesData} filesData={filesData} websocket={websocket}
                                    attachmentsForm={attachmentsForm}
                                    setSelectedFiles={setSelectedFiles}
                                    selectedFiles={selectedFiles}
                                /> }
                            <button type="submit" className="btn rounded-full p-3 px-4 ml-2 hover:contrast-150 duration-150">
                                <FontAwesomeIcon icon={faPaperPlane} className="text-white" />
                            </button>
                        </div>
                    </form>
                </div>
            </>
        </section>
    )
}