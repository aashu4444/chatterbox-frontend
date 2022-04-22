import { useRouter } from 'next/router';
import { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const logout = () => {
    const router = useRouter();
    const {setLoggedin, setUser} = useContext(UserContext);

    useEffect(() => {
        localStorage.removeItem("auth_token");
        setLoggedin(false);
        setUser({});
        router.push("/");
    }, []);

    return (
        <div className='w-screen h-screen justify-center bg-slate-100 flex items-center'>
            <h2 className="text-xl font-bold">Please wait while we are logging you out...</h2>
        </div>
    )
}

export default logout