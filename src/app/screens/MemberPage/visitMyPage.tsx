import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import {
  ArrowBack,
  ArrowForward,
  Facebook,
  Instagram,
  Settings,
  Telegram,
  YouTube,
} from "@mui/icons-material";
import MemberPosts from "./memberPosts";
import MemberFollowers from "./memberFollowers";
import MemberFollowing from "./memberFollowing";
import MySittings from "./mySittings";

const VisitMyPage = () => {
  /** INITIALIZINGS **/
  const [value, setValue] = useState("1");

  /** HANDLERS **/
  const handlerChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="my_page">
      <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
        <Stack className="my_page_frame">
          <TabContext value={value}>
            <Stack className="my_page_left">
              <Box display={"flex"} flexDirection={"column"}>
                <TabPanel value="1">
                  <Box className="menu_name">Mening Maqolalarim</Box>
                  <Box className="menu_content">
                    <MemberPosts />
                    <Stack
                      sx={{ my: "40px" }}
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Box className="bottom_box">
                        <Pagination
                          count={3}
                          page={1}
                          renderItem={(item) => (
                            <PaginationItem
                              components={{
                                previous: ArrowBack,
                                next: ArrowForward,
                              }}
                              {...item}
                              color="secondary"
                            />
                          )}
                        />
                      </Box>
                    </Stack>
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <Box className="menu_name">Followers</Box>
                  <Box className="menu_content">
                    <MemberFollowers actions_enabled={true} />
                  </Box>
                </TabPanel>
                <TabPanel value="3">
                  <Box className="menu_name">Following</Box>
                  <Box className="write_content">
                    <MemberFollowing actions_enabled={true} />
                  </Box>
                </TabPanel>
                <TabPanel value="4">
                  <Box className="menu_name">Maqola yozish</Box>
                  <Box className="menu_content"></Box>
                </TabPanel>
                <TabPanel value="5">
                  <Box className="menu_name">Ma'lumolarni o'zgartirish</Box>
                  <Box className="menu_content">
                    <MySittings />
                  </Box>
                </TabPanel>
                <TabPanel value="6">
                  <Box className="menu_name">Tanlangan Maqolalar</Box>
                  <Box className="menu_content"></Box>
                </TabPanel>
              </Box>
            </Stack>

            <Stack className="my_page_right">
              <Box className="order_info_box">
                <a onClick={() => setValue("5")} className="settings_btn">
                  <Settings />
                </a>
                <Box className="user_img_wrap">
                  <img
                    src="/icons/avatar.svg"
                    alt="user"
                    className="user_corner_icon"
                  />
                </Box>
                <p className="user_name">Angelina Cute</p>
                <p className="user_type">Foydalanuvchi</p>
                <Box className="social_wrap">
                  <Facebook className="social_icons" />
                  <Instagram className="social_icons" />
                  <YouTube className="social_icons" />
                  <Telegram className="social_icons" />
                </Box>
                <Box className="follow_status">
                  <span style={{ marginRight: "20px" }}>Follower: 3</span>
                  <span>Followings: 7</span>
                </Box>
                <p className="user_desc">Salom mening ismim Angelina</p>
                <Button onClick={() => setValue("4")} variant="contained">
                  Maqola yozish
                </Button>
              </Box>
              <Box className="menu_wrapper">
                <Box onClick={() => setValue("1")} className="tab_menu">
                  <img src="/icons/Pencil.svg" alt="icon" /> Maqolalarim
                </Box>
                <Box onClick={() => setValue("2")} className="tab_menu">
                  <img src="/icons/Group.svg" alt="icon" />
                  Follower
                </Box>
                <Box onClick={() => setValue("3")} className="tab_menu">
                  <img src="/icons/User.svg" alt="icon" />
                  Following
                </Box>
              </Box>
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
};

export default VisitMyPage;
