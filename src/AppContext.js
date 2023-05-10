import axios, { Axios } from "axios";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { socketUrl, url } from "./baseObjs";
import Cookies from "js-cookie";

export const AppContext = createContext();

export function AppWrapper(props) {
  const router = useRouter();
  const axiosRequest = axios.create();

  const [infoTitle, setInfoTitle] = useState("Unexpected Error Occured!");
  const [infoDesc, setInfoDesc] = useState(
    "We encountered an error in this application. Make sure you filled everything correct or not did any action against the rules of this app!"
  );
  const [barRef, setBarRef] = useState(useRef(null));
  const [user, setUser] = useState(null);
  const [authToken, setJwtToken] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const authorizedAxiosRequest = axios.create({
    headers: {
      "auth-token": authToken,
    },
  });

  const cancelConnectionRequest = async (connection_request, setRequests=undefined) => {
    const res = await axiosRequest.options(url("/user/connection_request"), {
      data: {
        request_id: connection_request.id,
      },

      headers: {
        "auth-token": authToken,
      },
    });

    if (setRequests){
      setRequests((recent) =>
        recent.filter((req) => req.id !== connection_request.id)
      );
    }
  };

  const [currentChatDetails, setCurrentChatDetails] = useState({
    name: undefined,
  });
  const headers = {
    "auth-token": authToken,
  };

  const loading = () => {
    barRef.current.continuousStart();
  };
  const loadingComplete = () => {
    barRef.current.complete();
  };

  // Add request interceptor
  axiosRequest.interceptors.request.use(
    (config) => {
      loading();
      return config;
    },
    (error) => {
      loading();
      return Promise.reject(error);
    }
  );

  // Add response interceptor
  axiosRequest.interceptors.response.use(
    (response) => {
      loadingComplete();
      return response;
    },
    (error) => {
      if (
        typeof error.response.data === "string" &&
        error.response.data.length < 150
      ) {
        setInfoDesc(error.response.data);
      }

      setShowInfo(true);
      loadingComplete();
      return Promise.reject(error);
    }
  );

  const setAuthToken = (token) => {
    document.cookie = `auth_token=${token}`;
    setJwtToken(token);
  };

  const validateUser = async (token = authToken) => {
    // Validate the user from server
    if (
      token !== "null" &&
      token !== "" &&
      token !== null &&
      token !== undefined
    ) {
      try {
        const user_res = await axios.get(url("/user/validate"), {
          headers: {
            "auth-token": token,
          },
        });
        setUser(user_res.data);
      } catch (error) {
        // If user verification is failed
        if (error.response?.status === 401) {
          // Code something if user is not logged in.
          setUser(null);
        }
      }
    } else {
    }
  };

  const value = {
    barRef,
    setBarRef,
    user,
    setUser,
    loading,
    loadingComplete,
    validateUser,
    authToken,
    setAuthToken,
    setJwtToken,
    currentChatDetails,
    setCurrentChatDetails,
    axiosRequest,
    headers,
    infoTitle,
    setInfoTitle,
    infoDesc,
    setInfoDesc,
    showInfo,
    setShowInfo,
    authorizedAxiosRequest,
    cancelConnectionRequest,
  };

  useEffect(() => {
    // Get auth token from cookies
    let fetchedAuthToken = document.cookie.slice("auth_token".length + 1);
    if (fetchedAuthToken.indexOf(";") !== -1) {
      fetchedAuthToken = fetchedAuthToken.slice(
        0,
        fetchedAuthToken.indexOf(";")
      );
    }
    setAuthToken(fetchedAuthToken);

    const handleRouterChangeStart = (url) => {
      barRef && barRef.current?.continuousStart();
    };

    router.events.on("routeChangeStart", handleRouterChangeStart);
    router.events.on("routeChangeComplete", (url) => {
      barRef.current?.complete();
    });

    // Check whether the user is logged in or not when the page loads
    validateUser(fetchedAuthToken);
  }, [router]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}
