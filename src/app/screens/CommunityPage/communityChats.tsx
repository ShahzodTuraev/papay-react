import { Avatar, Box, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/socket";

const CommunityChats = () => {
  /**INITILIZATION**/
  const [messageList, setMessageList] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.connect();
    socket?.on("connect", function () {
      console.log("CLIENT: connected");
    });

    socket?.on("newMsg", (new_message: any) => {
      console.log("CLIENT: new message");
      alert(new_message);
    });

    socket?.on("greetMsg", (new_message: any) => {
      console.log("CLIENT: greet message");
    });

    socket?.on("infoMsg", (msg: any) => {
      console.log("CLIENT: infoMsg");

      setOnlineUsers(msg.total);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);
  return (
    <Stack className="chat_frame">
      <Box className="chat_top">Jonli Muloqot {onlineUsers}</Box>
      <Box className="chat_content">
        <Stack className="chat_main">
          <Box flexDirection={"row"} sx={{ display: "flex", m: "10px 0" }}>
            <div className="msg_left">Bu yer jonli muloqot</div>
          </Box>
          <Box
            flexDirection={"row"}
            sx={{ display: "flex", m: "10px 0" }}
            alignItems={"flex-end"}
            justifyContent={"flex-end"}
          >
            <div className="msg_right">bu sizning habaringiz</div>
          </Box>
          <Box flexDirection={"row"} sx={{ display: "flex", m: "10px 0" }}>
            <Avatar alt="martin" src="/community/cute_girl.jpeg" />
            <div className="msg_left">buyerda boshqalarning habari</div>
          </Box>
        </Stack>
      </Box>
      <Box className="chat_bott">
        <input
          type="text"
          name="message"
          className="msg_input"
          placeholder="Xabar jo'natish"
        />
        <button className="send_msg_btn">
          <SendIcon style={{ color: "#fff" }} />
        </button>
      </Box>
    </Stack>
  );
};

export default CommunityChats;
