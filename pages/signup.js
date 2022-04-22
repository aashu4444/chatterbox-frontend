import Navbar from '../components/Navbar';
import Link from 'next/link';
import axios from 'axios';
import { url } from '../components/Globals';
import { useState } from 'react';

const signup = () => {
    const [errors, setErrors] = useState([]);
    const [accountCreated, setAccountCreated] = useState(false);
    const formFields = [
        { title: "First name", placeholder: "Enter your first name", id: "first_name" },
        { title: "Last name", placeholder: "Enter your last name", id: "last_name" },
        { title: "Username", placeholder: "Enter your username", id: "username" },
        { title: "Email address", placeholder: "Enter your email address", id: "email" },
        { title: "Phone number", placeholder: "Enter your phone number", id: "phone" },
        { title: "Password", placeholder: "Enter your password", id: "password", type: "password" }

    ];

    const createAccount = async e => {
        e.preventDefault();

        const res = await axios.post(url("/api/user/create/"), new FormData(e.target)).catch(error => {
            const errors = error.response.data;
            setErrors(errors);
        });

        if (res !== undefined){
            setAccountCreated(true);
        }
    }

    return (
        <section className='flex flex-col'>
            <Navbar />
            <div className='flex justify-center items-center'>
                <div id="signup-form" className="rounded-3xl w-96 mt-4 shadow-md border-orange-300 border-2 mx-3">
                    <h2 className="text-xl rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl  text-theme-color text-center bg-theme-light font-semibold p-4 py-3">Signup to ChatterBox</h2>
                    <form className='p-4 flex flex-col gap-y-4' onSubmit={createAccount}>
                        {accountCreated===true?
                        <span className="text-green-500">Your account has been successfully created!</span>
                        :""}

                        {formFields.map((item, key) =>
                            <label htmlFor={item.id} className='flex flex-col' key={key}>
                                <span className='text-theme-color text-sm mb-1'>{item.title}</span>
                                <input id={item.id} name={item.id} type={item.type === undefined ? "text" : item.type} className='rounded-md theme-input outline-none transition-all duration-400 focus:ring-2 focus:ring-orange-300' placeholder={item.placeholder} />
                                <span className='text-xs mt-1 text-red-600'>{errors[item.id]}</span>
                            </label>
                        )}


                        <div className='flex flex-col'>
                            <span className='text-theme-color text-sm mb-1'>Profile image</span>

                            <div>
                                <label htmlFor="profile_image" className='btn-rounded cursor-pointer'>
                                    Upload image
                                    <input name="profile_image" id="profile_image" type="file" hidden />
                                </label>
                            </div>
                        </div>




                        <button type='submit' className='transition-all duration-200 hover:contrast-150 bg-theme-color text-white py-2 shadow-md rounded-full'>Sign up</button>

                        <p className='text-sm text-center text-gray-500'>Aleready have an account? <Link href="/login"><a className="text-theme-color">Login</a></Link></p>

                    </form>
                </div>
            </div>
        </section>
    )
}

export default signup