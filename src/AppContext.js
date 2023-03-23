import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useRef, useState } from "react";


export const AppContext = createContext();

export function AppWrapper(props) {
    const router = useRouter();

    const [barRef, setBarRef] = useState(useRef(null));

    const value = {
        barRef, setBarRef
    }

    useEffect(() => {
        const handleRouterChangeStart = (url) => {
            barRef.current.continuousStart();
        };

        router.events.on('routeChangeStart', handleRouterChangeStart);
        router.events.on('routeChangeComplete', url => {barRef.current.complete()});
    }, [router])

    return (
        <AppContext.Provider value={
            value
        }>
            {props.children}
        </AppContext.Provider>
    )
}