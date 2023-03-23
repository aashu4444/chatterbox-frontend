import LeftPanel from "@/components/messages/leftPanel";
import Navbar from "@/components/Navbar";
import MessagePanel from "@/components/messages/messagePanel";

export default function Messages() {
    return (
        <section className="flex flex-col h-screen">
            <Navbar />
            <section id="messages" className="flex w-full h-full grow">
                <LeftPanel />
                <MessagePanel />
            </section>
        </section>
    )
}