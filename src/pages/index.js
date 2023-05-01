import Modal from "@/components/Modal.js";
import Navbar from "../components/Navbar.js";
import landingImage from "../../public/landing_page_img.png";
import Image from "next/image.js";
import Link from "next/link.js";
import Head from 'next/head';

export default function Home() {
  const features = [
    {
      icon: (
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-10 h-10"
          viewBox="0 0 24 24"
        >
          <path d="M11 14H6a2 2 0 01-2-2V4a2 2 0 012-2h5a2 2 0 012 2v8a2 2 0 01-2 2zM20 14h-5a2 2 0 01-2-2V4a2 2 0 012-2h5a2 2 0 012 2v8a2 2 0 01-2 2z"></path>
          <path d="M15 20a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      ),

      heading: "Public Group Chats",
      desc: "Join and create public group chats and connect with others who share your interests. Discuss your favorite topics and make new friends from around the world. It is easy to create and join group on chatterbox!",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-moon w-10 h-10 "
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      ),

      heading: "Dark Mode",
      desc: "Chat late into the night without any worry with chatterbox's sleek and modern dark mode feature. Switch to a darker color palette  's easier on your eyes and gives you a more immersive chatting experience.",
    },
    {
      icon: (
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-10 h-10"
          viewBox="0 0 24 24"
        >
          <path d="M12 8v8M16 12l-4-4-4 4M4 15v2a2 2 0 002 2h12a2 2 0 002-2v-2"></path>
        </svg>
      ),

      heading: "File sharing",
      desc: "With Chatterbox, you can easily share files with your friends and colleagues. Whether you need to send a document, a photo, or any other type of file, Chatterbox makes it simple and convenient. ",
    },
  ];
  return (
    <>
    <Head>
      <title>Home : ChatterBox</title>
    </Head>
      <Navbar />
      <Modal />
      <section className="dark:text-gray-400 text-gray-600 dark:bg-gray-900 body-font">
        <div className="container mx-auto flex px-5 py-24 pt-0 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium dark:text-white  text-gray-900">
              Welcome to ChatterBox
              <br className="hidden lg:inline-block" />
              Chat, Share and Explore!
            </h1>
            <p className="mb-8 leading-relaxed">
              Chatterbox is an online chatting site that provides a platform for
              users to engage in real-time conversations with others from around
              the world. The site offers a user-friendly interface that allows
              users to create their own profiles, customize their chat settings,
              and interact with other users through private messages or group
              chats.
            </p>
            <div className="flex justify-center">
              <Link href='/signup' className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Sign up
              </Link>
              <Link href="/login" className="ml-4 inline-flex text-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800 border-0 py-2 px-6 focus:outline-none dark:hover:bg-gray-700 dark:hover:text-white rounded hover:bg-gray-200 text-lg">
                Login
              </Link>

            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <Image
              src={landingImage}
              width={720}
              height={600}
              className="object-cover object-center rounded"
            />
            {/* <img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600" /> */}
          </div>
        </div>
      </section>

      <section className="dark:text-gray-400 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl dark:text-white font-medium title-font mb-4">
              Why to use ChatterBox?
            </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto dark:text-gray-400 text-gray-800 text-opacity-80">
              Chatterbox is a great online chatting site for anyone who wants to
              connect with others from around the world in a fun and engaging
              way. Here are a few reasons why you might want to use Chatterbox:
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
            </div>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            {features.map((feature, key) => (
              <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                <div className="w-20 h-20 inline-flex items-center justify-center bg-indigo-100 dark:bg-gray-800 rounded-full  text-indigo-400 mb-5 flex-shrink-0">
                  {feature.icon}
                </div>
                <div className="flex-grow">
                  <h2 className=" text-lg title-font font-medium mb-3 dark:text-white">
                    {feature.heading}
                  </h2>
                  <p className="leading-relaxed text-base text-gray-700 dark:text-gray-400">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full flex justify-center">
            <Link
              href="/signup"
              className="flex items-center mx-auto mt-16 text-indigo-500 border-0 py-2 px-8 focus:outline-none hover:text-indigo-600 rounded text-lg"
            >
              Signup to start using ChatterBox{" "}
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
