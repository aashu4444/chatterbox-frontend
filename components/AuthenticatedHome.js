import { useContext } from 'react'
import Navbar from './Navbar';
import ProfilePhoto from './User/ProfilePhoto';
import { UserContext } from '../context/UserContext';
import { config } from './Globals';
import axios from 'axios';

const AuthenticatedHome = () => {
    const { user } = useContext(UserContext);

    const post = async e => {
        e.preventDefault();

        const res = await axios.post(url("/api/post/create/"), new FormData(e.target));

        console.log(res);

    }
    return (
        <>
            <Navbar />
            <div className="w-1/3 shadow-lg m-3 p-3 shadow-slate-300 rounded-md">
                <div className="flex">
                    <ProfilePhoto a={1} className="w-10 h-10 mr-3" />
                    <div className="flex flex-col">
                        <p>{user.first_name} {user.last_name}</p>
                        <p className='text-sm text-gray-400'>Share a post to your friends or {config.site_name} users. </p>
                    </div>
                </div>
                <form onSubmit={post}>
                    <textarea name="text" id="text" rows="3" placeholder='Type something here...' className='border-2 rounded-md p-1 border-orange-500 outline-none focus:ring-2 transition-all duration-200 ring-orange-400 mt-2 w-full'></textarea>

                    <div className="flex justify-end">
                        <button type="submit" className="btn bg-orange-400 text-white uppercase rounded-md p-2 px-4 hover:bg-orange-600 transitiona-all duration-200">Post</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AuthenticatedHome;