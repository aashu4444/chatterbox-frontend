import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <div className='p-4 bg-white px-4 flex shadow-md justify-between h-auto'>
        <h2 className='poppins font-semibold text-2xl'>ChatterBox</h2>
        <ul className='flex gap-x-4 font-semibold text-slate-500'>
            <li>
                <Link href="/"><a>Home</a></Link>
            </li>
            <li>
                <Link href="/signup"><a>Sign up</a></Link>
            </li>
            <li>
                <Link href="/login"><a>Login</a></Link>
            </li>
        </ul>
    </div>
  )
}

export default Navbar;