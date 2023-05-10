import Navbar from "@/components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import AuthRequired from "@/components/AuthRequired";
import { AppContext } from "@/AppContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { url } from "@/baseObjs";
import Alert from "../alert";

export default function Received() {
  const { user, authToken, loading, loadingComplete, axiosRequest, headers } =
    useContext(AppContext);
  const [receivedRequests, setReceivedRequests] = useState([]);

  // A Function that removes accepted/declined request from received requests.
  const updateUI = (request) =>
    setReceivedRequests((latest) =>
      latest.filter((item) => item.id !== request.id)
    );

  const fetchReceivedRequests = async () => {
    try {
      const res = await axiosRequest.get(
        url("/user/connection_request?requests_type=received"),
        {
          headers,
        }
      );
      setReceivedRequests(res.data);
    } catch (error) {
      alert("Unable to fetch connection requests");
    }
  };

  const acceptRequest = async (request) => {
    try {
      const res = await axiosRequest.put(
        url("/user/connection_request"),
        {
          connection_request_id: request.id,
        },
        { headers }
      );
      updateUI(request);
    } catch (error) {
      alert("Unable to accept connection requests" + JSON.stringify(headers));
    }
  };

  const declineRequest = async (request) => {
    try {
      const res = await axiosRequest.delete(
        url("/user/connection_request"),
        {
          connection_request_id: request.id,
        },
        { headers }
      );

      updateUI(request);
    } catch (error) {
      alert("Unable to decline connection requests");
    }
  };

  useEffect(() => {
    fetchReceivedRequests();
  }, []);

  return (
    <AuthRequired>
      <section className="mt-5">
        <div
          id="searchResults"
          className="flex flex-col gap-y-8 items-center w-full px-4 mt-5"
        >
          {receivedRequests.map((item) => {
            return (
              <div
                className="w-full h-20 sensitiveDiv md:w-1/2 rounded-lg p-3 flex dark:bg-gray-600/10"
                key={item.id}
              >
                <div className="profilePhoto bg-gray-800/50 w-14 rounded-lg h-full"></div>
                <div className="flex flex-col ml-3 grow">
                  <h3 className=" dark:text-gray-200">
                    {item.sender.first_name} {item.sender.last_name}
                  </h3>
                  <p className=" dark:text-gray-400">{item.time}</p>
                </div>
                <button
                  className="btn w-14 rounded-lg h-full ml-3"
                  onClick={(e) => acceptRequest(item)}
                >
                  <FontAwesomeIcon icon={faCheckCircle} />
                </button>
                <button
                  className="btn w-14 rounded-lg h-full ml-3"
                  onClick={(e) => declineRequest(item)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            );
          })}

          {receivedRequests.length === 0 && (
            <Alert type="info" cls="md:mx-10">
              Oops! you don't have any received connection requests yet!!!
            </Alert>
          )}
        </div>
      </section>
    </AuthRequired>
  );
}
