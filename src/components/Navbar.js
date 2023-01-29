import Link from 'next/link';
import {useTheme} from "next-themes";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const {systemTheme , theme, setTheme} = useTheme ();


  const navLinks = [
    {href: "/", text: "Home"},
    {href: "/", text: "About"},
    {href: "/", text: "Contact"},
    {href: "/", text: "Messages"}
  ]

  function toggleDarkMode(e){
    if (theme === "dark"){
      setTheme("light");
    }
    else{
      setTheme("dark");
    }

  }
  return (
    <>
      <header class="text-gray-600 dark:text-gray-300 body-font">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-blue-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span class="ml-3 text-xl dark:text-white">Chatterbox</span>
          </a>
          <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
            {navLinks.map((navLink) => 
              <Link href={navLink.href} class="mr-5 opacity-60 hover:opacity-100 smooth">{navLink.text}</Link>
            )}
            
          </nav>
          <Link href="/login" class="smooth inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 dark:bg-gray-900 dark:hover:bg-gray-800">Login
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
          <div className="w-24 smooth dark-btn-bg h-10 rounded-full bg-blue-500 my-3 mx-3 relative px-2 cursor-pointer flex items-center justify-between" onClick={toggleDarkMode}>
          <FontAwesomeIcon icon={faMoon} className="w-6 h-6" />
          <FontAwesomeIcon icon={faSun} className="w-6 h-6 text-white" />
              <div className="w-8 h-8 bg-blue-400 dark:bg-gray-800 rounded-full absolute top-1 smooth" style={theme==="dark"?{left:"60%"}:{left:"8%"}}>
                
                
              </div>
          </div>

        </div>
      </header>
    </>
  )
}
