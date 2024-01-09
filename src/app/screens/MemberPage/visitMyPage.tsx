import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { TabContext, TabList, TabPanel } from "@mui/lab";
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
  const [followRebuild, setFollowRebuild] = useState<Date>(new Date());
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
        .then((data) => {
          setChosenSingleBoArticle(data);
          setValue("6");
        })
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
                          count={
                            memberArticleSearchObj.page >= 3
                              ? memberArticleSearchObj.page + 1
                              : 3
                          }
                          page={memberArticleSearchObj.page}
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
                    <MemberFollowers
                      mb_id={props.verifiedMemberData?._id}
                      actions_enabled={true}
                      setFollowRebuild={setFollowRebuild}
                      followRebuild={followRebuild}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value="3">
                  <Box className="menu_name">Following</Box>
                  <Box className="write_content">
                    <MemberFollowing
                      actions_enabled={true}
                      mb_id={props.verifiedMemberData?._id}
                      setFollowRebuild={setFollowRebuild}
                      followRebuild={followRebuild}
                    />
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
                    <TViewer chosenSingleBoArticle={chosenSingleBoArticle} />
                  </Box>
                </TabPanel>
              </Box>
            </Stack>

            <Stack className="my_page_right">
              <Box className="order_info_box">
                <a onClick={() => setValue("5")} className="settings_btn">
                  <Settings />
                </a>
                <Box
                  className="user_img_wrap"
                  sx={{ backgroundImage: `url(${chosenMember?.mb_image})` }}
                >
                  <img
                    src={
                      chosenMember?.mb_type === "RESTAURANT"
                        ? "/icons/restaurant.svg"
                        : "/icons/avatar.svg"
                    }
                    alt="user"
                    className="user_corner_icon"
                  />
                </Box>
                <p className="user_name">{chosenMember?.mb_nick}</p>
                <p className="user_type">{chosenMember?.mb_type}</p>
                <Box className="social_wrap">
                  <Facebook className="social_icons" />
                  <Instagram className="social_icons" />
                  <YouTube className="social_icons" />
                  <Telegram className="social_icons" />
                </Box>
                <Box className="follow_status">
                  <span style={{ marginRight: "20px" }}>
                    Follower: {chosenMember?.mb_subscriber_cnt}
                  </span>
                  <span>Followings: {chosenMember?.mb_follow_cnt}</span>
                </Box>
                <p className="user_desc">
                  {chosenMember?.mb_description ??
                    "qo'shimcha ma'lumot kiritilmagan"}
                </p>
                <Button
                  style={
                    value === "4"
                      ? { borderBottom: "3px solid coral" }
                      : { opacity: "auto" }
                  }
                  onClick={() => setValue("4")}
                  variant="contained"
                >
                  Maqola yozish
                </Button>
              </Box>
              <Box className="menu_wrapper">
                <Box
                  style={
                    value === "1"
                      ? { borderBottom: "3px solid coral" }
                      : { opacity: "auto" }
                  }
                  onClick={() => setValue("1")}
                  className="tab_menu"
                >
                  <img src="/icons/Pencil.svg" alt="icon" /> Maqolalarim
                </Box>
                <Box
                  style={
                    value === "2"
                      ? { borderBottom: "3px solid coral" }
                      : { opacity: "auto" }
                  }
                  onClick={() => setValue("2")}
                  className="tab_menu"
                >
                  <img src="/icons/Group.svg" alt="icon" />
                  Follower
                </Box>
                <Box
                  style={
                    value === "3"
                      ? { borderBottom: "3px solid coral" }
                      : { opacity: "auto" }
                  }
                  onClick={() => setValue("3")}
                  className="tab_menu"
                >
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
