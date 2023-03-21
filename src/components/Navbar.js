import Link from 'next/link';
import { useTheme } from "next-themes";
import { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faRightToBracket, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import LoadingBar from 'react-top-loading-bar';
import { AppContext, useAppContext } from '@/AppContext';


export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const {barRef, setBarRef} = useContext(AppContext);


  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/", text: "About" },
    { href: "/search", text: "Search" },
    { href: "/messages", text: "Messages" }
  ]

  function toggleDarkMode(e) {
    if (theme === "dark") {
      setTheme("light");
    }
    else {
      setTheme("dark");
    }

  }

  useEffect(() => {
    setBarRef(barRef);
  })
  return (
    <>
      <header className="text-gray-600 dark:text-gray-300 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl dark:text-white">Chatterbox</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            {navLinks.map((navLink, key) =>
              <Link href={navLink.href} key={key} className="mr-5 opacity-60 hover:opacity-100 smooth">{navLink.text}</Link>
            )}

          </nav>
          <Link href="/login" className="smooth inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 dark:bg-gray-900 dark:hover:bg-gray-800">Login
            &nbsp;<FontAwesomeIcon icon={faRightToBracket} />
          </Link>
          <Link href="/signup" className="smooth inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 dark:bg-gray-900 dark:hover:bg-gray-800 md:ml-2">Sign up

          </Link>
          <div className="w-24 smooth dark-btn-bg h-10 rounded-full bg-blue-500 my-3 mx-3 relative px-2 cursor-pointer flex items-center justify-between" onClick={toggleDarkMode}>
            <FontAwesomeIcon icon={faMoon} className="w-6 h-6" />
            <FontAwesomeIcon icon={faSun} className="w-6 h-6 text-white" />
            <div className="w-8 h-8 bg-blue-400 dark:bg-gray-800 rounded-full absolute top-1 smooth" style={theme === "dark" ? { left: "60%" } : { left: "8%" }}>


            </div>
          </div>

        </div>
        <LoadingBar color='#f11946' ref={barRef} />
      </header>
    </>
  )
}
