import axios from "axios";
import { url } from "../Globals";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Link from "next/link";

const Friends = () => {
    const [friends, setFriends] = useState([]);
    const { authToken } = useContext(UserContext);
    const getFriends = async () => {
        if (authToken !== "") {

            const res = await axios.get(url('/api/friend/getFriends'), {
                headers: {
                    'auth-token': authToken,
                }
            });

            setFriends(res.data);
        }
    }

    useEffect(() => {
        getFriends();
    }, [authToken]);

    return (
        <>
            {friends.map((item, key) =>
                <Link href={`/messages/${item.pk}`}  key={key}>
                    <a className="">
                        <div className="flex p-3 rounded-md hover:bg-slate-100 transition-all duration-200">
                            <img src={url('/media/' + item.fields.profile_image)} alt="Profile photo" className="w-12 h-12 rounded-full" />
                            <div className="mx-3">
                                <h3>{item.fields.user.first_name} {item.fields.user.last_name}</h3>
                                <p className="text-sm text-slate-500">Some dangerous text is here.</p>
                            </div>
                        </div>
                    </a>
                </Link>
            )}
        </>
    )
}

export default Friends