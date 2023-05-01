import { AppContext } from "@/AppContext";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { url } from "@/baseObjs";
import { useRouter } from "next/router";

export default function LeftPanel() {
    const { authToken, setCurrentChatDetails } = useContext(AppContext);
    const [connectedProfiles, setConnectedProfiles] = useState([]);
    const router = useRouter();
    const {query} = router;

    const getConnectedProfiles = async () => {
        const res = await axios.get(url('/user/get_connected_profiles'), {
            headers: {
                'auth-token': authToken,
            }
        });

        setConnectedProfiles(res.data);
    }


    useEffect(() => {
        getConnectedProfiles();
    }, [])

    return (
        <>
            <section id="leftPanel" className="md:w-1/3 h-full bg-gray-100 dark:bg-gray-800/30 rounded-tr-lg rounded-br-lg px-3 w-full" >
                <form className="w-full flex justify-center mt-2">
                    <input className="form-input w-full border-r-0  input rounded-lg rounded-tr-none rounded-br-none" placeholder="Search messages" type="text" name="query" id="" />
                    <button type="submit" className="btn px-3 rounded-tr-lg dark:border-0 rounded-br-lg border-[1px] border-l-0 border-gray-500"><FontAwesomeIcon icon={faMagnifyingGlass} className="text-white" /></button>
                </form>

                {
                    connectedProfiles.map((item, key) => (
                        // On Click : setCurrentChatDetails() to display the name of the user (message receiver) chatting with,
                        <Link href={`/messages/${item.id}`} key={key} onClick={e => setCurrentChatDetails({
                            name: `${item.first_name} ${item.last_name}`
                        })}>
                            <div className="messageCard w-full h-16 dark:bg-gray-800/30 bg-gray-200/40 hover:bg-gray-200/80 rounded-lg mt-4 p-3 flex ">
                                <div className="pp w-10 h-full rounded-md bg-gray-600"></div>

                                <div>
                                    <h4 className="text-sm ml-2">{item.first_name} {item.last_name}</h4>
                                    <p className="text-sm ml-2 text-gray-400">Hi bro! how are you?</p>
                                </div>
                            </div>
                        </Link>
                    ))
                }

            </section>
        </>
    )
}