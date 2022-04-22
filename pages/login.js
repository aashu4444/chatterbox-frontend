import Navbar from '../components/Navbar';
import Link from 'next/link';
import axios from 'axios';
import { url } from '../components/Globals';
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../context/UserContext';

const login = () => {
    const router = useRouter();
    const {setLoggedin, setUser} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const formFields = [
        { title: "Username", placeholder: "Enter your username", id: "username" },
        { title: "Password", placeholder: "Enter your password", id: "password", type: "password" }

    ];

    const login_user = async e => {
        e.preventDefault();

        setLoading(true);
        const res = await axios.post(url("/api/user/login/"), new FormData(e.target)).catch(error => {
            if (error.response !== undefined && error.response.code === 401) {
                setInvalidCredentials(true);
            }

            return error
        });

        if (invalidCredentials === false) {
            const auth_token = res.data;

            localStorage.setItem("auth_token", auth_token);

            // Fetch the user's data - This will update the Navbar and other components that are realeated to the UserContext
            const {data} = await axios.get(url(`/api/user/get_by_auth_token/?auth_token=${auth_token}`));
            setUser(data);
            setLoggedin(true);

            router.push("/"); // Redirect to home page
        };
    }

    return (
        <section className='flex flex-col'>
            <Navbar />
            <div className='flex justify-center items-center'>
                <div id="signup-form" className="rounded-3xl w-96 mt-4 shadow-md border-orange-300 border-2 mx-3">
                    <h2 className="text-xl rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl  text-theme-color text-center bg-theme-light font-semibold p-4 py-3">Login to ChatterBox</h2>
                    <form className='p-4 flex flex-col gap-y-4' onSubmit={login_user}>
                        {formFields.map((item, key) =>
                            <label htmlFor="first_name" className='flex flex-col' key={key}>
                                <span className='text-theme-color text-sm mb-1'>{item.title}</span>
                                <input id={item.id} name={item.id} type={item.type === undefined ? "text" : item.type} className='rounded-md theme-input outline-none transition-all duration-400 focus:ring-2 focus:ring-orange-300' placeholder={item.placeholder} />
                            </label>
                        )}

                        <button type='submit' className='transition-all duration-200 hover:contrast-150 bg-theme-color text-white py-2 shadow-md rounded-full disabled:opacity-50' disabled={loading}>Login {loading === true && <i className="fa fa-spinner fa-spin"></i>}</button>

                        <p className='text-sm text-center text-gray-500'>Don&apos;t have any acccount <Link href="/signup"><a className="text-theme-color">Signup</a></Link></p>

                    </form>
                </div>
            </div>
        </section>
    )
}

export default login;