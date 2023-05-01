import { AppContext } from "@/AppContext";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function logout() {
    const router = useRouter();
    const {setUser, loadingComplete, setAuthToken} = useContext(AppContext);


    const handleLogout = e => {

        // Clear auth token cookie
        setAuthToken(null);

        // Set the 'user' var to 'null' to make changes in the UI
        setUser(null);

        
        router.push("/")
    }
    
    useEffect(() => {
      handleLogout();

    }, [])
    
    return (
        <>
        <Navbar />
        <h1 className="text-2xl">Loggin out please wait....</h1>
        </>
    )
}