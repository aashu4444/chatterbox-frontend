import { useContext, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { url, siteName } from "@/baseObjs";
import Alert from "@/components/alert";
import { useRouter } from "next/router";
import { AppContext } from "@/AppContext";
import Logo from "@/components/Logo";
import Title from "@/components/Title";

export default function Login() {
  const [invalidCreds, setInvalidCreds] = useState(false);
  const loginForm = useRef(null);
  const router = useRouter();

  const { validateUser, loading, loadingComplete, setAuthToken } =
    useContext(AppContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    loading();

    try {
      const res = await axios.post(url("/user/login"), loginForm.current, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Set auth token cookie
      document.cookie = `auth_token=${res.data}`;

      setAuthToken(res.data);

      // Remove warning message
      setInvalidCreds(false);

      // validate the user to make changes in UI
      validateUser();

      // Redirect the user to home page
      router.push("/");
    } catch (error) {
      setInvalidCreds(true);
    }

    loadingComplete();
  };

  return (
    <>
    <Title>Login to your {siteName} account</Title>
      <Navbar />
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Logo width={100} height={100} className="mx-auto" />

            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight ">
              Sign in to your account
            </h2>
          </div>

          {/* Show message if credentials are incorrect */}
          {invalidCreds ? (
            <Alert type="warning">Incorrect username or password!</Alert>
          ) : (
            ""
          )}

          <form
            className="mt-8 space-y-6"
            ref={loginForm}
            method="POST"
            onSubmit={handleLogin}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
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
              <div>
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
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent btn py-2 px-4 text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
