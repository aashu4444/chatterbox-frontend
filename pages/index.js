import Head from 'next/head';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import chat from '../images/chat.png';
import styles from "../styles/Home.module.css";
import background from "../images/background.svg";
import { loggedin } from '../components/Globals';
import { useRouter } from 'next/router';
import {useEffect, useContext} from 'react';
import { UserContext } from '../context/UserContext';
import AuthenticatedHome from '../components/AuthenticatedHome';


export default function Home() {
  const router = useRouter();
  const {loggedin} = useContext(UserContext);
  // const {name} = useContext(UserContext);

  useEffect(() => {
    console.log(name) 
  
  }, []);
  
  return loggedin === false ? (

    <>
    {/* <svg viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position:"fixed", zIndex:"-5", top:"-26%"}}><path d="M0 0H1440V749C1440 749 1277 565.5 720 749C163 932.5 0 749 0 749V0Z" fill="#FF2B9D" fill-opacity="0.26"></path></svg> */}
    <section className='relative w-full h-screen flex-col'>
      <Head>
        <title>Welcome to chatterbox</title>
        <meta name="description" content="Welcome to ChatterBox." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className='flex'>
        <Image src={chat} width="280" height={280} />
        <div>
          <h2 className='salsa text-2xl font-semibold'>Welcome to ChatterBox</h2>
        </div>
      </div>
    </section>
    </>
  ): <AuthenticatedHome />
}
