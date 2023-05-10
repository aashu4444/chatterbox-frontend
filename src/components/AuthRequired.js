import { AppContext } from "@/AppContext";
import { useContext, useEffect } from "react";
import Navbar from "./Navbar";

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