import { AppContext } from "@/AppContext";
import { url, siteName } from "@/baseObjs";
import Navbar from "@/components/Navbar";
import Title from "@/components/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";

const AnonymousChat = () => {
  const { axiosRequest } = useContext(AppContext);
  const [roomName, setRoomName] = useState("");
  const [username, setUsername] = useState("");
  const [canCreateRoom, setCanCreateRoom] = useState(!roomName === "");
  const [canJoinRoom, setCanJoinRoom] = useState(!username === "");
  const [validating, setValidating] = useState(false);
  const router = useRouter();
  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState({});

  const createRoom = async (e) => {
    const res = await axiosRequest.post(url(`/anonymous_chat/room`), {
      roomName,
      username,
    });

    router.push(`/anonymous_chat/room/${roomName}`);
  };

  const joinRoom = async (e) => {
    const res = await axiosRequest.put(
      url(`/anonymous_chat/room?roomName=${roomName}&username=${username}`)
    );

    setRedirect(true);
  };

  const validateInput = async (input) => {
    try {
      const res = await axios.get(
        url(`/anonymous_chat/room?roomName=${roomName}`)
      );


      setCanCreateRoom(false);
      setCanJoinRoom(username!=='' && username.includes(" ") ==false)
    } catch (error) {
      // Code when given room name does not exist
      console.log(error);
      setCanCreateRoom(true);
      setCanJoinRoom(false);
    }

    setValidating(false);
  };

  useEffect(() => {
    if (redirect === true) {
      router.push({
        pathname: `/anonymous_chat/room/${roomName}`,
        query: { username },
        as: `/anonymous_chat/room/${roomName}?username=${username}`,
      });
    }
  }, [redirect]);

  return (
    <>
      <Title>Create or Join rooms on {siteName}</Title>
      <Navbar />
      <section id="AnonymousChat" className="w-full justify-center  flex">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex gap-y-3 mt-4 relative md:w-1/2 flex-col sm:w-full sm:mx-5"
        >
          <label htmlFor="roomName">
            Room Name
            <input
              type="text"
              className="form-input mt-2 input w-full rounded-full"
              placeholder="Enter a room name"
              value={roomName}
              name="roomName"
              id="roomName"
              onChange={(e) => {
                setRoomName(e.target.value);
              }}
              onKeyUp={(e) => {
                setValidating(true);
                setTimeout(() => {
                  validateInput(0);
                }, 600);
              }}
              required
            />
          </label>

          <label htmlFor="username">
            Username
            <input
              type="text"
              className="form-input mt-2 input w-full rounded-full"
              placeholder="Enter username"
              name="username"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              onKeyUp={(e) => {
                setValidating(true);
                setTimeout(() => {
                  validateInput(1);
                }, 600);
              }}
              required
            />
          </label>

          <div className="flex flex-row w-full gap-x-2">
            <button
              onClick={createRoom}
              className="btn rounded-full px-3 disabled:bg-rose-400 disabled:pointer-events-none"
              disabled={!canCreateRoom || validating}
            >
              Create
            </button>
            <button
              onClick={joinRoom}
              className="btn rounded-full px-3 disabled:bg-rose-400 disabled:pointer-events-none"
              disabled={!canJoinRoom || validating}
            >
              Join
            </button>
          </div>
          {validating && (
            <p className="animate-pulse">
              Validating{" "}
              <FontAwesomeIcon icon={faSpinner} className="fa-spin-pulse" />
            </p>
          )}
        </form>
      </section>
    </>
  );
};

export default AnonymousChat;
