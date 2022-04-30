import axios from 'axios';
import { url } from '../components/Globals';
import Navbar from '../components/Navbar';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { config } from '../components/Globals';

const sendinvites = () => {
    const [searching, setSearching] = useState(false);
    const [foundPeoples, setFoundPeoples] = useState([]);
    const { authToken } = useContext(UserContext);
    const user = {
        "model": "main_user.main_user",
        "pk": 4,
        "fields": {
            "user": {
                "first_name": "Ashutosh",
                "last_name": "Prajapati",
                "email": "prajapatiaashu4444@gmail.com"
            },
            "phone": "8602676778",
            "profile_image": "profile_images/12658_tI4bxFb.jpg"
        }
    };

    const sendInvite = async user => {
        console.log(authToken)
        const res = await axios.post(url("/api/invite/send/"), { target_user_id: user.pk }, {
            headers: {
                "auth-token": authToken,
            }
        });

        console.log(res);
    };


    const searchPeoples = async e => {
        e.preventDefault();

        const query = e.target.querySelector("#query").value;

        setSearching(true);
        const res = await axios.get(url(`/api/user/search/?query=${query}&addIsInvited=1`), {
            headers: {
                "auth-token":authToken,
            }
        });

        setSearching(false);

        setFoundPeoples([]);

    };


    return (
        <>
            <Navbar />
            <div className='w-full mt-10 px-5'>
                <form onSubmit={searchPeoples}>

                    <center className=''>
                        <input type="text" id="query" placeholder='Search peoples to invite.' className='text-orange-300 p-3 w-full md:w-1/2  min-w-96 rounded-md ring-1 focus:ring-2 ring-orange-300 transition-all duration-200 outline-none' />
                        <button className="btn mt-2 ml-0 w-full md:mt-0 md:w-auto md:ml-2" disabled={searching}>{searching === true ? <i className="fa fa-spinner fa-spin"></i> : <i className="fa fa-search"></i>}</button>
                    </center>
                </form>

                <div className="results">
                    {foundPeoples.map((item, key) =>
                        <div className="shadow p-3 rounded-md mx-10 flex gap-x-3" key={key}>
                            <img src={url(`/media/${item.fields.profile_image}`)} alt={`${item.first_name} ${item.last_name}'s profile picture`} className={`rounded-full w-8 h-8`} />
                            <div className="flex flex-col">
                                {item.fields.user.first_name} {item.fields.user.last_name}
                                <p className='text-sm text-gray-400'>{item.fields.user.username}</p>
                            </div>
                            <button className="btn ml-auto">Send</button>
                        </div>



                    )}


                    {foundPeoples.length === 0 && <center className="mt-5"><p>Enter your query in above search box to search peoples on {config.site_name}</p></center>}
                </div>
            </div>
        </>
    )
}

export default sendinvites