import Navbar from "@/components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import AuthRequired from "@/components/AuthRequired";
import { useState } from "react";
import Received from "@/components/con_reqs/received";
import Sent from "@/components/con_reqs/sent";

export default function Search() {
    const [nav, setNav] = useState(0);
    return (
        <AuthRequired>
            <Navbar />
            <section className="mt-5">
                <div className="w-full mx-auto md:w-1/2 flex dark:bg-gray-900 shadow-md gap-x-3 px-4 relative">
                    {/* <button className={`w-full py-3 rounded-xl ${nav===0?'dark:bg-gray-800': ''}`} onClick={e => setNav(0)}>
                        Sent
                    </button> */}
                    <div className="indicator bg-gray-800 w-1/2 h-full absolute top-0 left-0 rounded-xl  transition-all" style={{left: nav===1?'50%':'0'}}>

                    </div>
                    <button className={`w-full py-3 rounded-xl bg-transparent z-10`} onClick={e => setNav(0)}>
                        Sent
                    </button>

                    <button className={`w-full py-3 rounded-xl z-10`} onClick={e => setNav(1)}>
                        Received
                    </button>
                </div>

                {nav === 0 ?
                    <Sent />

                    : <Received />}

            </section>
        </AuthRequired>
    )
}