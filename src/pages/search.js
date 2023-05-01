import Navbar from "@/components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faMagnifyingGlass,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import AuthRequired from "@/components/AuthRequired";
import AuthRequiredServer, {
  ValidateUser,
} from "@/components/AuthRequiredServer";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/AppContext";
import axios from "axios";
import { url } from "@/baseObjs";
import { useRouter } from "next/router";
import Link from "next/link";

function Search({
  query,
  user,
  foundUsers,
  sentConnectionRequests,
  authToken,
}) {
  const headers = {
    "auth-token": authToken,
  };

  const {axiosRequest} = useContext(AppContext);

  const [userQuery, setUserQuery] = useState(query);
  const [SentConnectionRequests, setSentConnectionRequests] = useState(
    sentConnectionRequests
  );
  const router = useRouter();

  const sendConnectionRequest = async (receiverId) => {
    const payload = new FormData();
    payload.set("receiver_id", receiverId);

    const res = await axiosRequest.post(url(`/user/connection_request`), payload, {
      headers,
    });

    setSentConnectionRequests((latest) => [...latest, res.data]);
  };

  const cancelConnectionRequest = async ConnectionRequest => {
    const res = await axiosRequest.options(url(`/user/connection_request`), {
      data:{
        request_id: ConnectionRequest.id
      },
      headers
    });


    setSentConnectionRequests((latest) => latest.filter(item => item.id !== ConnectionRequest.id));
  }

  useEffect(() => {
  }, []);

  return (
    <AuthRequiredServer>
      <Navbar />
      <section className="mt-5">
        <form
          className="w-full px-4 flex justify-center"
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/search?query=${userQuery}`);
          }}
        >
          <input
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            className="form-input w-full md:w-1/2 border-r-0  input rounded-lg rounded-tr-none rounded-br-none"
            placeholder="Search"
            type="text"
            name="query"
            id=""
          />
          <button
            type="submit"
            className="btn px-3 rounded-tr-lg dark:border-0 rounded-br-lg border-[1px] border-l-0 border-gray-500"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>

        <div
          id="searchResults"
          className="flex flex-col gap-y-8 items-center w-full px-4 mt-5"
        >
          {foundUsers.map((foundUser, key) => (
            <div
              key={key}
              className="w-full h-20 sensitiveDiv md:w-1/2 rounded-lg p-3 flex dark:bg-gray-600/10"
            >
              <div className="profilePhoto bg-gray-800/50 w-14 rounded-lg h-full"></div>
              <div className="flex flex-col ml-3 grow">
                <h3 className=" dark:text-gray-200">
                  {foundUser.first_name} {foundUser.last_name}
                </h3>
                <p className=" dark:text-gray-400">
                  Pro Coder of the year award
                </p>
              </div>

              {foundUser.connected_profiles.includes(user.id) === false &&
              SentConnectionRequests.filter(
                (item) => item.receiver.id === foundUser.id
              ).length !== 1 ? (
                <button
                  className="btn w-14 rounded-lg h-full ml-3"
                  onClick={(e) => sendConnectionRequest(foundUser.id)}
                >
                  <FontAwesomeIcon icon={faUserPlus} />
                </button>
              ) : (
                <button className="btn w-14 rounded-lg h-full ml-3" onClick={e => cancelConnectionRequest(SentConnectionRequests.filter(item => item.receiver.id === foundUser.id)[0])}>
                  <FontAwesomeIcon icon={faCheck} />
                  </button>
              )}
              
            </div>
          ))}
        </div>
      </section>
    </AuthRequiredServer>
  );
}

export async function getServerSideProps(context) {
  const { query } = context.query;
  const authToken = context.req.cookies.auth_token;
  let user = await ValidateUser(context);
  const headers = {
    "auth-token": authToken,
  };

  const res = await axios.get(url(`/user/filter?query=${query}`), {
    headers: headers,
  });

  const sentConnectionRequests_Response = await axios.get(
    url(`/user/connection_request?requests_type=sent`),
    {
      headers: headers,
    }
  );

  return {
    props: {
      query: query !== undefined ? query : "",
      authToken,
      user,
      foundUsers: res.data.filter((item) => item.id !== user.id),
      sentConnectionRequests: sentConnectionRequests_Response.data,
    },
  };
}

export default Search;
