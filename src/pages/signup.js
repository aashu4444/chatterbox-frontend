import Navbar from "../components/Navbar";
import Link from "next/link";
import { useRef, useState } from "react";
import axios from "axios";
import { url, siteName } from "@/baseObjs";
import Alert from "@/components/alert";
import Logo from "@/components/Logo";
import Title from "@/components/Title";


export default function Signup() {
  const signupForm = useRef(null);
  const [errorText, setErrorText] = useState("");
  const [errorClass, setErrorClass] = useState("!hidden");
  const [successClass, setSuccessClass] = useState("!hidden");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(url("/user/create"), signupForm.current, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Show success message by removing it's 'hidden' class and reset the signup form
      setSuccessClass("");
      signupForm.current.reset();

      // Hide error messages
      setErrorClass("!hidden");
    } catch (error) {
      const { status, data } = error.response;

      if (status === 401) {
        // Destructure message from response data
        const message = Object.values(data)[0][0].message;

        setErrorText(message);

        // Show the error message by removing it's 'hidden' class
        setErrorClass("");

        // Hide success messages
        setSuccessClass("!hidden");
      }
    }
  };
  return (
    <>
    <Title>Create a new account on {siteName}</Title>
      <Navbar />
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex items-center w-full flex-col">
            <Logo width={100} height={100} />

            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight ">
              Create a new account
            </h2>
          </div>

          <Alert type="success" cls={successClass}>
            Your account successfully created!
            <Link href="/login" className="underline">
              &nbsp;Click here&nbsp;
            </Link>{" "}
            to login.
          </Alert>

          <Alert type="warning" cls={errorClass}>
            {errorText}
          </Alert>

          <form
            className="mt-8 space-y-6"
            ref={signupForm}
            onSubmit={handleSignup}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div className="flex mb-3">
                <div className="grow mr-3">
                  <label htmlFor="first-name" className="sr-only">
                    First Name
                  </label>
                  <input
                    id="first-name"
                    name="first_name"
                    type="text"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 input placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="First Name"
                  />
                </div>
                <div className="grow">
                  <label htmlFor="last-name" className="sr-only">
                    Last Name
                  </label>
                  <input
                    id="last-name"
                    name="last_name"
                    type="text"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 input placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 input placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative input block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                Aleready have an account?&nbsp;
                <Link
                  href="/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Login
                </Link>
                .
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent btn py-2 px-4 text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
