import { AppContext } from "@/AppContext";
import { useContext } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { url } from "@/baseObjs";

export default function AuthRequired(props) {
  return props.user === null ? (
    // If user is not logged in
    <>
      <Navbar />
      <h1 className="text-2xl">Authentication required to access this page.</h1>
    </>
  ) : (
    // If user is authenticated
    props.children
  );
}

export async function ValidateUser(context) {
  const authToken = context.req.cookies.auth_token;
  let user = null;

  const res = await axios.get(url(`/user/validate`), {
    headers: {
      "auth-token": authToken,
    },
  });
  user = res.data;

  return user;
}

export async function getServerSideProps(context) {
  let user = await ValidateUser(context);
  console.log("Something wrong here?");

  return {
    props: {
      user,
    },
  };
}
