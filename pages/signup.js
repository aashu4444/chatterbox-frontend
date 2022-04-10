import Navbar from '../components/Navbar';
import Link from 'next/link';

const signup = () => {
    const formFields = [
        { title: "First name", placeholder: "Enter your first name", id: "firstName" },
        { title: "Last name", placeholder: "Enter your last name", id: "lastName" },
        { title: "Email address", placeholder: "Enter your email address", id: "email" },
        { title: "Phone number", placeholder: "Enter your phone number", id: "phoneNumber" },
        { title: "Password", placeholder: "Enter your first name", id: "password" }

    ];

    return (
        <section className='flex flex-col'>
            <Navbar />
            <div className='flex justify-center items-center'>
                <div id="signup-form" className="rounded-3xl w-96 mt-4 shadow-md border-orange-300 border-2 mx-3">
                    <h2 className="text-xl rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl  text-theme-color text-center bg-theme-light font-semibold p-4 py-3">Signup to ChatterBox</h2>
                    <form className='p-4 flex flex-col gap-y-4'>
                        {formFields.map((item, key) => 
                            <label htmlFor="first_name" className='flex flex-col' key={key}>
                                <span className='text-theme-color text-sm mb-1'>{item.title}</span>
                                <input id={item.id} name={item.id} type="text" className='rounded-md theme-input outline-none transition-all duration-400 focus:ring-2 focus:ring-orange-300' placeholder={item.placeholder} />
                            </label>
                        )}

                        <button type='submit' className='transition-all duration-200 hover:contrast-150 bg-theme-color text-white py-2 shadow-md rounded-full'>Sign up</button>

                        <p className='text-sm text-center text-gray-500'>Aleready have an account? <Link href="/login"><a className="text-theme-color">Login</a></Link></p>

                    </form>
                </div>
            </div>
        </section>
    )
}

export default signup