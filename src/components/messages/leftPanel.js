import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function LeftPanel() {
    return (
        <>
            <section id="leftPanel" className="md:w-1/3 h-full bg-gray-100 dark:bg-gray-800/30 rounded-tr-lg rounded-br-lg px-3" >
                <form className="w-full flex justify-center mt-2">
                    <input className="form-input w-full border-r-0  input rounded-lg rounded-tr-none rounded-br-none" placeholder="Search messages" type="text" name="query" id="" />
                    <button type="submit" className="btn px-3 rounded-tr-lg dark:border-0 rounded-br-lg border-[1px] border-l-0 border-gray-500"><FontAwesomeIcon icon={faMagnifyingGlass} className="text-white" /></button>
                </form>

                <Link href="/">
                    <div className="messageCard w-full h-16 dark:bg-gray-800/30 bg-gray-200/40 hover:bg-gray-200/80 rounded-lg mt-4 p-3 flex ">
                        <div className="pp w-10 h-full rounded-md bg-gray-600"></div>

                        <div>
                            <h4 className="text-sm ml-2">Ashutosh Prajapati</h4>
                            <p className="text-sm ml-2 text-gray-400">Hi bro! how are you?</p>
                        </div>
                    </div>
                </Link>
            </section>
        </>
    )
}