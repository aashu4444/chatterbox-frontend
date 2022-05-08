import Link from 'next/link';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { url } from './Globals';

const Navbar = () => {
    // TODO : replace the logic of animating user dropdown with css
    const { loggedin, user } = useContext(UserContext);
    const default_dropdown_style = {transform: 'scale(0)', opacity: 0};
    const [user_dropdown_style, setUser_dropdown_style] = useState(default_dropdown_style); // false: closed; true: opened
    return (
        
        <div className='p-4 bg-white px-4 flex shadow-md justify-between h-auto items-center'>
            <h2 className='poppins font-semibold text-2xl'>ChatterBox</h2>
            <ul className='flex gap-x-4 font-semibold text-slate-500 items-center'>
                <li className='flex gap-x-2'>
                    <Link href="/"><a>Home</a></Link>
                    <Link href="/messages"><a>Messages</a></Link>
                </li>
                {loggedin === false ?
                    <>
                        <li>
                            <Link href="/signup"><a>Sign up</a></Link>
                        </li>
                        <li>
                            <Link href="/login"><a>Login</a></Link>
                        </li>
                    </>

                    :

                    <>
                        <li className='relative'>
                            <img src={url(`/media/${user.profile_image}`)} alt="" className='rounded-full w-8 h-8 cursor-pointer' onClick={e => setUser_dropdown_style(user_dropdown_style.opacity===0?{transform: "scale(1)",transformOrigin: "top right", opacity: 1}:default_dropdown_style)} />

                            <div className="dropdown absolute right-0 w-72 shadow-inner shadow-lg rounded-md p-5 bg-white transition-transform duration-300 origin" style={user_dropdown_style}>
                                <ul className='text-sm'>
                                    <li className='pb-4'>Logged in as : {user.first_name} {user.last_name}</li>

                                    <Link href="/logout">
                                        <li className='hover:bg-slate-200 p-2 transition-all duration-200 rounded-md cursor-pointer'>Logout</li>
                                    </Link>
                                </ul>
                            </div>
                        </li>
                    </>
                }
            </ul>
        </div>
    )
}


export default Navbar;