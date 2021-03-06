import Link from 'next/link';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { url } from '../components/Globals';

const Invitespanel = () => {
    const [sentInvites, setSentInvites] = useState([]);
    const [recievedInvites, setRecievedInvites] = useState([]);
    const [invitesType, setInvitesType] = useState("recieved");
    const { authToken } = useContext(UserContext);


    const getInvites = async () => {
        if (invitesType === "recieved" && recievedInvites.length === 0) {
            const res = await axios.get(url("/api/invite/getRecievedInvites"), {
                headers: {
                    "auth-token": authToken,
                }
            });

            setRecievedInvites(res.data);

        }

        else if (invitesType === "sent" && sentInvites.length === 0) {
            const res = await axios.get(url("/api/invite/getSentInvites"), {
                headers: {
                    "auth-token": authToken,
                }
            });

            setSentInvites(res.data);

        }
    }


    const acceptInvite = async (user) => {
        console.log(user.fields.sender)
        const res = await axios.put(url("/api/invite/accept/"), {
            target_user_id: user.fields.sender.main_user_id

        }, {
            headers: {
                "auth-token":authToken,
            }
        });

        console.log(res.data, );
    }

    useEffect(() => {
        getInvites();
    }, []);

    return (
        <div className='w-96 shadow-md rounded-md shadow-slate-300'>
            <header className='flex justify-between p-4 bg-slate-300 rounded-md'>
                <h2 className="text-xl">Invites</h2>
                <Link href="/sendinvites">
                    <i className="fa fa-plus cursor-pointer"></i>
                </Link>
            </header>
            <div className="p-4">
                <div className="flex justify-between">
                    <p>Type:</p>
                    <div>
                        <select name="types" id="types" value={invitesType} onChange={e => setInvitesType(e.target.value)}>
                            <option value="sent">Sent</option>
                            <option value="recieved">Recieved</option>
                        </select>
                    </div>
                </div>

                <div>
                    {invitesType === "sent" ?
                        sentInvites.map((item, key) => <p>A Sent Invite available</p>)
                        :
                        recievedInvites.map((item, key) =>
                            <div className='flex gap-x-3 shadow-md rounded-md p-3' key={key}>

                                <div className="w-10 h-10 rounded-full bg-slate-600"></div>

                                <div className='grow text-sm'>
                                    <p>{item.fields.sender.first_name} {item.fields.sender.last_name}</p>
                                    <p className='text-sm text-gray-300'>Some small to edit later</p>
                                </div>

                                <div className='flex'>
                                    <button className="btn" onClick={e => acceptInvite(item)}>A</button>
                                    <button className="btn ml-2">D</button>
                                </div>
                            </div>)

                    }
                </div>

            </div>

        </div>
    )
}

export default Invitespanel