import Attachments from "./Attachments";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/AppContext";

const Message = ({ chatMessages }) => {
  const { user } = useContext(AppContext);
  const [renderMessages, setRenderMessages] = useState(false);
  const [skeletonSize, setSkeletonSize] = useState([1,2,3,4,5,6,7]);

  useEffect(() => {
    if (chatMessages.length > 0) {
      setRenderMessages(true);
    } else {
    }
  }, [chatMessages]);

  if (renderMessages) {
    return chatMessages.map((message, key) =>
      // If current message is sent by user
      message.fields.sender === user.id ? (
        <div
          className="ml-auto rounded-2xl bg-gradient-to-r flex flex-col from-indigo-500 via-purple-500 to-pink-500 p-2 px-3 dark:text-white"
          key={key}
        >
          {message.fields.attachments.length !== 0 ? (
            <Attachments key={key} attachments={message.fields.attachments} />
          ) : (
            ""
          )}
          <span className="text-white">{message.fields.message}</span>
        </div>
      ) : (
        // If current message is received by the logged in user
        <div
          className="mr-auto rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 p-2 px-3 dark:text-white"
          key={key}
        >
          {message.fields.attachments.length !== 0 ? (
            <Attachments key={key} attachments={message.fields.attachments} />
          ) : (
            ""
          )}
          <span className="text-white">{message.fields.message}</span>
        </div>
      )
    );
  } else {
    // Render skeleton
    return (
      skeletonSize.map((item, index) => {
        return (index+1) % 2 === 0 ? <div className="mr-auto rounded-2xl w-60 bg-gradient-to-r dark:bg-gray-800/60 p-2 px-3 dark:text-white skeleton">&nbsp;</div>
        :
        <div className="ml-auto rounded-2xl w-72 bg-gradient-to-r dark:bg-gray-800/60 p-2 px-3 dark:text-white skeleton">&nbsp;&nbsp;</div>
      })
    );
  }
};

export default Message;
