import Navbar from "@/components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faCheckCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import AuthRequired from "@/components/AuthRequired";
import { AppContext } from "@/AppContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { url } from "@/baseObjs";


export default function Sent() {
    const { user, authToken } = useContext(AppContext);
    const [sentRequests, setSentRequests] = useState([]);

    const fetchSentRequests = async () => {
        try {
            const res = await axios.get(url('/user/connection_request?requests_type=sent'), {
                headers: {
                    'auth-token': authToken
                }
            });
            setSentRequests(res.data);

        } catch (error) {
            alert("Unable to fetch connection requests");
        }
    };


    useEffect(() => {
        fetchSentRequests();

    }, [])



    return (
        <AuthRequired>
            <section className="mt-5">
                <div id="searchResults" className="flex flex-col gap-y-8 items-center w-full px-4 mt-5">
                    {sentRequests.map((item, key) => {
                        return (
                            <div className="w-full h-20 sensitiveDiv md:w-1/2 rounded-lg p-3 flex dark:bg-gray-600/10" key={key}>
                                <div className="profilePhoto bg-gray-800/50 w-14 rounded-lg h-full">

                                </div>
                                <div className="flex flex-col ml-3 grow">
                                    <h3 className=" dark:text-gray-200">{item.receiver.first_name} {item.receiver.last_name}</h3>
                                    <p className=" dark:text-gray-400">{item.time}</p>
                                </div>
                                <button className="btn w-14 rounded-lg h-full ml-3">
                                    <FontAwesomeIcon icon={faCheckCircle} />
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>
                        )
                    })}


                </div>
            </section>
        </AuthRequired>
    )
}