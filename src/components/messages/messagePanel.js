import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function MessagePanel() {
    return (
        <>
            <section id="messagesSection" className="h-full w-full px-3">
                
                <div className="flex h-full w-full flex-col justify-between bg-gray-100 dark:bg-gray-800/30 p-3 rounded-lg">
                    <section className="mb-5 flex h-full flex-col justify-end gap-y-3">
                        <div className="ml-auto rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2 px-3 dark:text-white">
                            <span className="text-white">Hi! WhatsApp. What does QNA Mean to you?</span>
                        </div>

                        <div className="mr-auto w-auto rounded-2xl bg-gradient-to-r from-green-400 to-blue-500 p-2 px-3 dark:text-white">
                            <span className="text-white">QNA Mean question and answers!</span>
                        </div>
                    </section>
                    <form action="/" className="flex gap-x-2">
                        <input type="text" className="form-input bg-gray-300 w-full rounded-full border-none dark:bg-gray-800 px-4 text-white outline-none ring-offset-cyan-700 transition-all duration-150 focus:ring-2 focus:ring-offset-0" placeholder="Type your message here" />
                        <button type="submit" className="btn rounded-full p-2 px-4 hover:contrast-150 duration-150">
                            <FontAwesomeIcon icon={faPaperPlane} className="text-white" />
                        </button>
                    </form>
                </div>
            </section>

        </>
    )
}