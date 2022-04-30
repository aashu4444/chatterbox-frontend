import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { url } from "../components/Globals";

export const UserContext = createContext();

export const UserState = props => {
    const [loggedin, setLoggedin] = useState(false);
    const [user, setUser] = useState({});
    const [authToken, setAuthToken] = useState("");


    useEffect(() => {
        const auth_token = localStorage.getItem("auth_token");
        setAuthToken(auth_token);
        if (auth_token !== null || auth_tokne!=="" || auth_token !== undefined) {
            axios.get(url(`/api/user/get_by_auth_token/?auth_token=${auth_token}`))
                .then(res => {
                    setUser(res.data);
                    setLoggedin(true);
                })
                .catch(res => "");
        };

    }, []);

    return <UserContext.Provider value={
        {
            user,
            setUser,
            loggedin,
            setLoggedin,
            authToken,
        }
    }>
        {props.children}
    </UserContext.Provider>
};