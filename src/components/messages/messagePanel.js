import { faFile, faMinimize, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useRouter } from "next/router";
import { AppContext } from "@/AppContext";
import axios from "axios";
import { url } from "@/baseObjs";
import Attach from './Attach';
import Attachments from './Attachments';
import AuthRequired from "../AuthRequired";
// import styles from './styles/messagePanelStyle.scss';

export default function MessagePanel({ receiver_id, isAnonymous=false }) {
    const { user, authToken, currentChatDetails } = useContext(AppContext);
    const [websocket, setWebsocket] = useState(null);
    const msgInput = useRef(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [filesData, setFilesData] = useState([]);
    const roomName = user.id.replaceAll("-", '_');
    const router = useRouter();
    const attachmentsForm = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);


    useEffect(() => {

        const socket = new WebSocket(`ws://127.0.0.1:8000/ws/message/${roomName}/`);

        socket.onopen = () => {
            console.log('WebSocket connected');
            setWebsocket(socket);
        };

        socket.onmessage = async (event) => {
            const { message } = JSON.parse(event.data);

            const sentAttachments = await attachFiles(message.pk);

            const Message = {...message, attachments: sentAttachments}

            console.log(Message);

            setChatMessages((prevMessages) => [...prevMessages, message])
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
                sender_id: user.id,
                receiver_id: receiver_id,
                room_name: receiver_id && receiver_id.replaceAll("-", "_")
            };


            websocket.send(JSON.stringify(msgData));
        }


    };


    const attachFiles = async msgId => {
        const formData = new FormData(attachmentsForm.current);
        formData.set('message_id', msgId)

        const res = await axios.post(url("/message/upload_attachments"), formData);
        

        return JSON.parse(res.data);
    };

    const loadChatMessages = async () => {
        const res = await axios.get(url(`/chat?chatUserId=${receiver_id}`), {
            headers: {
                'auth-token': authToken,
            }
        });

        setChatMessages([...res.data]);
    }

    useEffect(() => {
        receiver_id !== undefined && user !==null ? loadChatMessages() : "";

    }, [router]);

    return (
        <AuthRequired>
            <section id="messagesSection" className="h-full flex flex-col  w-full px-3 ">

                <>
                    <div className="messageCard w-full h-16  bg-gray-200 hover:bg-gray-200/80 rounded-tl-lg rounded-tr-lg mt-4 p-3 flex dark:bg-gray-900 shadow-lg">
                        <div className="pp w-10 h-full rounded-md bg-gray-600"></div>

                        <div>
                            <h4 className="text-sm ml-2">{currentChatDetails.name}</h4>
                            <p className="text-sm ml-2 text-gray-400">Hi bro! how are you?</p>
                        </div>
                    </div>

                    <div className="flex  w-full flex-col justify-between bg-gray-100 dark:bg-gray-800/30 p-3  grow">
                        <section className="mb-5 flex h-full flex-col justify-end gap-y-3">
                            {
                                chatMessages.map((message, key) => (
                                    // If current message is sent by user
                                    message.fields.sender === user.id ?
                                        <div className="ml-auto rounded-2xl bg-gradient-to-r flex flex-col from-indigo-500 via-purple-500 to-pink-500 p-2 px-3 dark:text-white" key={key}>
                                            {message.fields.attachments.length !== 0 ?
                                                <Attachments key={key} attachments={message.fields.attachments} />
                                                : ""}
                                            <span className="text-white">{message.fields.message}</span>
                                        </div>
                                        :
                                        // If current message is received by the logged in user
                                        <div className="mr-auto rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 p-2 px-3 dark:text-white" key={key}>
                                            {message.fields.attachments.length !== 0 ?
                                                <Attachments key={key} attachments={message.fields.attachments} />
                                                : ""}
                                            <span className="text-white">{message.fields.message}</span>
                                        </div>
                                ))
                            }

                        </section>

                        <form onSubmit={sendMessage} className="flex gap-x-2">
                            <div className="w-full  relative">
                                { selectedFiles.length !== 0 && 
                                <div id="selectedFiles" className="rounded-md overflow-x-scroll absolute bottom-full dark:bg-gray-800/60 w-full p-3 flex gap-x-3 bg-gray-300/40">
                                    {
                                        selectedFiles.map((filename, index) =>
                                            <div className="selectedFile flex flex-col gap-y-2 bg-gray-500/30 dark:bg-gray-900 p-3 w-24" key={index}>
                                                <FontAwesomeIcon icon={faFile} />
                                                <p>{filename.slice(0, 6)}...</p>


                                            </div>
                                        )
                                    }
                                    <FontAwesomeIcon icon={faMinimize} className="fixed right-0 top-0 only:dark:bg-gray-900 "/>
                                </div>}
                                <input type="text" className="mt-4 form-input bg-gray-300 w-full rounded-full border-none dark:bg-gray-800 px-4 text-white outline-none ring-offset-cyan-700 transition-all duration-150 focus:ring-2 focus:ring-offset-0" placeholder="Type your message here" ref={msgInput} />
                            </div>
                            <div className="flex items-end">
                                <Attach
                                    setFilesData={setFilesData} filesData={filesData} websocket={websocket}
                                    attachmentsForm={attachmentsForm}
                                    setSelectedFiles={setSelectedFiles}
                                    selectedFiles={selectedFiles}
                                />
                                <button type="submit" className="btn rounded-full p-3 px-4 ml-2 hover:contrast-150 duration-150">
                                    <FontAwesomeIcon icon={faPaperPlane} className="text-white" />
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            </section>

        </AuthRequired>
    )
}
