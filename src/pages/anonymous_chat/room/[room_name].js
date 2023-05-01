import Navbar from "@/components/Navbar";
import axios from "axios";
import { useRouter } from "next/router";
import { siteName, url } from "@/baseObjs";
import { useEffect, useState } from "react";
import AnonymousMessagePanel from "@/components/AnonymousChat/AnonymousMessagePanel";
import Title from "@/components/Title";

const ChatRoom = ({ messages, room }) => {
  const [roomChatMessages, setRoomChatMessages] = useState(messages);
  const router = useRouter();
  const { room_name, username } = router.query;

  return (
    <section className="flex flex-col h-screen">
      <Title>{room_name} : Anonymous Chat Room on {siteName}</Title>
      <div className="h-auto">
        <Navbar />
      </div>

      <AnonymousMessagePanel
        isAnonymous={true}
        room={room}
        username={username}
        roomChatMessages={roomChatMessages}
        setRoomChatMessages={setRoomChatMessages}
        roomName={room_name}
      />
    </section>
  );
};


export async function getServerSideProps(context) {
  const { room_name, username } = context.query;

  try {
    const RoomRes = await axios.get(
      url(`/anonymous_chat/room?roomName=${room_name}`)
    );

    const res = await axios.get(
      url(`/anonymous_chat/messages?roomName=${room_name}`)
    );


    return {
      props: {
        messages: JSON.parse(res.data),
        room: RoomRes.data,
      },
    };
  } catch (error) {
    if (error.response.status === 404) {
      return {
        props: {
          messages: [],
          room: {},
          error: error.response.data,
        },
      };
    }
  }
}

export default ChatRoom;
