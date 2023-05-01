import LeftPanel from "@/components/messages/leftPanel";
import Navbar from "@/components/Navbar";
import MessagePanel from "@/components/messages/messagePanel";
import { useState, useEffect } from "react";
import { handleScreenSizeChange } from '@/baseObjs';
import AuthRequired from "@/components/AuthRequired";
import Title from "@/components/Title";

export default function Messages() {
    const [smallDevice, setSmallDevice] = useState(false);
    const [currentUserToChat, setCurrentUserToChat] = useState(null);

    useEffect(() => {
        handleScreenSizeChange(setSmallDevice);
    }, [])

    return (
        <AuthRequired>
            <Title>Chat</Title>
            <section className="flex flex-col h-screen">
                <Navbar />
                <section id="messages" className="flex w-full h-full grow">
                    <LeftPanel />
                    {smallDevice === false ? <MessagePanel  /> : ""}
                </section>
            </section>
        </AuthRequired>
    )
}