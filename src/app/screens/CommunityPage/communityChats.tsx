import { Avatar, Box, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useState } from "react";

const CommunityChats = () => {
  /**INITILIZATION**/
  const [messageList, setMessageList] = useState([]);
  return (
    <Stack className="chat_frame">
      <Box className="chat_top">Jonli Muloqot</Box>
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
