import Link from "next/link";
import { useTheme } from "next-themes";
import { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faRightToBracket,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import LoadingBar from "react-top-loading-bar";
import { AppContext } from "@/AppContext";
import { ValidateUser } from "./AuthRequiredServer";
import Logo from '../../public/Logo.png';
import Image from "next/image";
import { useRouter } from "next/router";

function Navbar({ name }) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { barRef, setBarRef, user, setUser } = useContext(AppContext);
  const switchStyle = { left: theme === "dark" ? "60%" : "8%" };

  const anonymousNavLinks = [
    { href: "/", text: "Home" },
    { href: "/anonymous_chat", text: "Anonymous Chat" },
  ]

  const authenticated_navLink = [
    { href: "/search", text: "Search" },
    { href: "/messages", text: "Messages" },
    { href: "/connection_requests", text: "Connection Requests" },
  ];

  const [navLinks, setNavlinks] = useState([...anonymousNavLinks]);

  

  function toggleDarkMode(e) {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  useEffect(() => {
    setBarRef(barRef);

    // Push authenticated nav links in 'navLinks' Array
    if (user !== null && user !== "") {
      setNavlinks([...anonymousNavLinks, ...authenticated_navLink])
    }
    console.log(user)
  }, [user]);
  return (
    <>
      <header className="text-gray-600 dark:text-gray-300 body-font">
        <div className="container mx-auto flex flex-wrap p-5 justify-between flex-row items-center  md:justify-center ">
          <a className="flex title-font font-medium items-center text-gray-900  md:mb-0 self-center justify-self-center">
            <Image src={Logo} width={43} height={43} />

            <span className="ml-3 text-xl dark:text-white">Chatterbox</span>
          </a>

          <div className="w-10 h-auto flex flex-col gap-y-2 cursor-pointer md:hidden">
            <div className="bg-white w-full h-1"></div>
            <div className="bg-white w-full h-1"></div>
            <div className="bg-white w-full h-1"></div>
          </div>
          <nav className="md:ml-auto md:flex flex-wrap items-center text-base justify-center hidden ">
            {navLinks.map((navLink, key) => (
              <Link
                href={navLink.href}
                key={key}
                className="mr-5 opacity-60 hover:opacity-100 smooth"
              >
                {navLink.text}
              </Link>
            ))}
          </nav>
          {user === null ? (
            <div className="hidden md:block">
              <Link
                href="/login"
                className="smooth inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 dark:bg-gray-900 dark:hover:bg-gray-800"
              >
                Login &nbsp;
                <FontAwesomeIcon icon={faRightToBracket} />
              </Link>
              <Link
                href="/signup"
                className="smooth inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 dark:bg-gray-900 dark:hover:bg-gray-800 md:ml-2"
              >
                Sign up
              </Link>
            </div>
          ) : (
            // If user is logged in
            <Link href="/logout" className="cursor-pointer">
              {user.first_name}
            </Link>
          )}
          <div
            className="w-24 smooth dark-btn-bg h-10 rounded-full bg-blue-500 my-3 mx-3 relative px-2 cursor-pointer  md:flex items-center justify-between hidden dark:bg-gray-800/30"
            onClick={toggleDarkMode}
          >
            <FontAwesomeIcon icon={faMoon} className="w-6 h-6" />
            <FontAwesomeIcon icon={faSun} className="w-6 h-6 text-white" />
            <div
              className="w-8 h-8 bg-blue-400 dark:bg-gray-800 rounded-full absolute top-1 smooth"
              style={switchStyle}
            ></div>
          </div>
        </div>
        <LoadingBar color="#f11946" ref={barRef} />
      </header>
    </>
  );
}

export default Navbar;
