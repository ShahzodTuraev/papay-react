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
import { useHistory } from "react-router-dom";
import CommunityApiService from "../../apiServices/communityApiService";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import FollowApiService from "../../apiServices/followApiService";
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

const VisitOtherPage = (props: any) => {
  /** INITIALIZINGS **/
  const [articleRebuild, setArticleRebuild] = useState<Date>(new Date());
  const [followRebuild, setFollowRebuild] = useState<Date>(new Date());
  const { verifiedMemberData, chosen_mb_id, chosen_art_id } = props;
  const history = useHistory();
  const [value, setValue] = useState("1");

  const {
    setChosenMember,
    setChosenMemberBoArticles,
    setChosenSingleBoArticle,
  } = actionDispatch(useDispatch());
  const { chosenMember } = useSelector(chosenMemberRetriever);
  const { chosenMemberBoArticles } = useSelector(
    chosenMemberBoArticleRetriever
  );
  const [memberArticleSearchObj, seMemberArticleSearchObj] =
    useState<SearchMemberArticlesObj>({
      mb_id: chosen_mb_id,
      page: 1,
      limit: 5,
    });
  const { chosenSingleBoArticle } = useSelector(chosenSingleBoArticleRetriever);
  useEffect(() => {
    if (chosen_mb_id === verifiedMemberData?._id) {
      history.push("/member-page");
    }
    const communityService = new CommunityApiService();
    if (chosen_art_id) {
      communityService
        .getChosenArticle(chosen_art_id)
        .then((data) => {
          setChosenSingleBoArticle(data);
          setValue("4");
        })
        .catch((err) => console.log(err));
    }
    communityService
      .getMeberCommunityArticles(memberArticleSearchObj)
      .then((data) => setChosenMemberBoArticles(data))
      .catch((err) => console.log(err));
  }, [memberArticleSearchObj, chosen_mb_id, articleRebuild]);
  useEffect(() => {
    if (chosen_mb_id === verifiedMemberData?._id) {
      history.push("/member-page");
    }
    const memberService = new MemberApiService();

    memberService
      .getChosenMember(memberArticleSearchObj.mb_id)
      .then((data) => setChosenMember(data))
      .catch((err) => console.log(err));
  }, [verifiedMemberData, chosen_mb_id, followRebuild]);
  /** HANDLERS **/
  const handlerChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const renderChosenArticleHandler = async (art_id: string) => {
    try {
      const communityService = new CommunityApiService();
      communityService
        .getChosenArticle(art_id)
        .then((data) => {
          setChosenSingleBoArticle(data);
          setValue("4");
        })
        .catch((err) => console.log(err));
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  const handlePaginationChange = (event: any, value: number) => {
    memberArticleSearchObj.page = value;
    seMemberArticleSearchObj({ ...memberArticleSearchObj });
  };

  const subscribeHandler = async (e: any) => {
    try {
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
      const followService = new FollowApiService();
      await followService.subscribe(e.target.value);
      await sweetTopSmallSuccessAlert("subscribed successfully", 700, false);
      setFollowRebuild(new Date());
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const unsubscribeHandler = async (e: any) => {
    try {
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
      const followService = new FollowApiService();
      await followService.unsubscribe(e.target.value);
      await sweetTopSmallSuccessAlert("unsubscribed successfully", 700, false);
      setFollowRebuild(new Date());
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
                  <Box className="menu_name">Maqolalar</Box>
                  <Box className="menu_content">
                    <MemberPosts
                      setArticleRebuild={setArticleRebuild}
                      chosenMemberBoArticles={chosenMemberBoArticles}
                      renderChosenArticleHandler={renderChosenArticleHandler}
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
                      actions_enabled={false}
                      mb_id={chosen_mb_id}
                      setFollowRebuild={setFollowRebuild}
                      followRebuild={followRebuild}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value="3">
                  <Box className="menu_name">Following</Box>
                  <Box className="write_content">
                    <MemberFollowing
                      actions_enabled={false}
                      mb_id={chosen_mb_id}
                      setFollowRebuild={setFollowRebuild}
                      followRebuild={followRebuild}
                    />
                  </Box>
                </TabPanel>

                <TabPanel value="4">
                  <Box className="menu_name">Tanlangan Maqola</Box>
                  <Box className="menu_content">
                    <TViewer chosenSingleBoArticle={chosenSingleBoArticle} />
                  </Box>
                </TabPanel>
              </Box>
            </Stack>

            <Stack className="my_page_right">
              <Box className="order_info_box">
                <Box className="user_img_wrap">
                  <img
                    src="/icons/avatar.svg"
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
                {chosenMember?.me_followed &&
                chosenMember.me_followed[0]?.my_following ? (
                  <Button
                    style={{ background: "rgba(247, 9, 9, 0.72)" }}
                    variant="contained"
                    value={chosenMember?._id}
                    onClick={unsubscribeHandler}
                  >
                    Bekor qilish
                  </Button>
                ) : (
                  <Button
                    value={chosenMember?._id}
                    onClick={subscribeHandler}
                    style={{ background: "#30945e" }}
                    variant="contained"
                  >
                    Follow qilish
                  </Button>
                )}
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
                  <img src="/icons/Pencil.svg" alt="icon" /> Maqolalar
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

export default VisitOtherPage;
