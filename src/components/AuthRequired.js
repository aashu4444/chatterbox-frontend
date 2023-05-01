import { AppContext } from "@/AppContext";
import { useContext } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { url } from "@/baseObjs";

export default function AuthRequired(props) {
  const {user} = useContext(AppContext);
  return user === null ? (
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