import LeftPanel from "@/components/messages/leftPanel";
import Navbar from "@/components/Navbar";
import MessagePanel from "@/components/messages/messagePanel";
import { useState, useEffect } from "react";
import { handleScreenSizeChange } from '@/baseObjs';
import AuthRequired from "@/components/AuthRequired";
import { useRouter } from "next/router";
import Title from "@/components/Title";

export default function Messages() {
    const [smallDevice, setSmallDevice] = useState(false);
    const router = useRouter()
    const {receiver_id} = router.query;


    useEffect(() => {
        handleScreenSizeChange(setSmallDevice);
    }, []);

    return (
        <AuthRequired>
            <Title>Chat</Title>
            <section className="flex flex-col h-screen">
                <Navbar />
                <section id="messages" className="flex w-full h-full grow">
                    {/* Hide left panel if the user is viewing the site in small devices */}
                    {smallDevice === false ? <LeftPanel /> : ""}
                    <MessagePanel receiver_id={receiver_id}  />
                </section>
            </section>
        </AuthRequired>
    )
}