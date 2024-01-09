import React, { useEffect, useState } from "react";
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
import TuiEditor from "./tuiEditor";
import TViewer from "./tViewer";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import {
  retrieveChosenMember,
  retrieveChosenMemberBoArticles,
  retrieveChosenSingleBoArticle,
} from "./selector";
import {
  setChosenMember,
  setChosenMemberBoArticles,
  setChosenSingleBoArticle,
} from "./slice";
import { Member } from "../../../types/user";
import { BoArticle, SearchMemberArticlesObj } from "../../../types/boArticle";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import CommunityApiService from "../../apiServices/communityApiService";
import MemberApiService from "../../apiServices/memberApiService";
// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
  setChosenMemberBoArticles: (data: BoArticle[]) =>
    dispatch(setChosenMemberBoArticles(data)),
  setChosenSingleBoArticle: (data: BoArticle) =>
    dispatch(setChosenSingleBoArticle(data)),
});
// REDUX SELECTOR
const chosenMemberRetriever = createSelector(
  retrieveChosenMember,
  (chosenMember) => ({
    chosenMember,
  })
);
const chosenSingleBoArticleRetriever = createSelector(
  retrieveChosenSingleBoArticle,
  (chosenSingleBoArticle) => ({
    chosenSingleBoArticle,
  })
);
const chosenMemberBoArticleRetriever = createSelector(
  retrieveChosenMemberBoArticles,
  (chosenMemberBoArticles) => ({
    chosenMemberBoArticles,
  })
);
const VisitMyPage = (props: any) => {
  /** INITIALIZINGS **/
  const { verifiedMemberData } = props;
  const {
    setChosenMember,
    setChosenMemberBoArticles,
    setChosenSingleBoArticle,
  } = actionDispatch(useDispatch());
  const { chosenMember } = useSelector(chosenMemberRetriever);
  const { chosenMemberBoArticles } = useSelector(
    chosenMemberBoArticleRetriever
  );
  const { chosenSingleBoArticle } = useSelector(chosenSingleBoArticleRetriever);
  const [value, setValue] = useState("1");
  const [memberArticleSearchObj, seMemberArticleSearchObj] =
    useState<SearchMemberArticlesObj>({ mb_id: "none", page: 1, limit: 5 });
  const [articleRebuild, setArticleRebuild] = useState<Date>(new Date());
  useEffect(() => {
    if (!localStorage.getItem("member_data")) {
      sweetFailureProvider("Please login first", true, true);
    }
    const communityService = new CommunityApiService();
    const memberService = new MemberApiService();
    communityService
      .getMeberCommunityArticles(memberArticleSearchObj)
      .then((data) => setChosenMemberBoArticles(data))
      .catch((err) => console.log(err));
    // setChosenMemberBoArticles,
    memberService
      .getChosenMember(verifiedMemberData?._id)
      .then((data) => setChosenMember(data))
      .catch((err) => console.log(err));
  }, [memberArticleSearchObj, articleRebuild]);
  /** HANDLERS **/
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handlePaginationChange = (event: any, value: number) => {
    memberArticleSearchObj.page = value;
    seMemberArticleSearchObj({ ...memberArticleSearchObj });
  };
  const renderChosenArticleHandler = async (art_id: string) => {
    try {
      const communityService = new CommunityApiService();
      communityService
        .getChosenArticle(art_id)
        .then((data) => setChosenSingleBoArticle(data))
        .catch((err) => console.log(err));
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
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
                    <MemberPosts
                      chosenMemberBoArticles={chosenMemberBoArticles}
                      renderChosenArticleHandler={renderChosenArticleHandler}
                      setArticleRebuild={setArticleRebuild}
                    />
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
                          onChange={handlePaginationChange}
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
                  <Box className="menu_content">
                    <TuiEditor />
                  </Box>
                </TabPanel>
                <TabPanel value="5">
                  <Box className="menu_name">Ma'lumolarni o'zgartirish</Box>
                  <Box className="menu_content">
                    <MySittings />
                  </Box>
                </TabPanel>
                <TabPanel value="6">
                  <Box className="menu_name">Tanlangan Maqolalar</Box>
                  <Box className="menu_content">
                    <TViewer text="hi tviewer" />
                  </Box>
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
