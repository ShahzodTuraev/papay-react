import {
  Avatar,
  Box,
  Button,
  Stack,
  Pagination,
  PaginationItem,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { retrieveMemberFollowers } from "./selector";
import { setMemberFollowers } from "./slice";
import { FollowSearchObj, Follower } from "../../../types/follow";
import FollowApiService from "../../apiServices/followApiService";
import { serverApi } from "../../../lib/config";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import { SearchMemberArticlesObj } from "../../../types/boArticle";
import { useHistory } from "react-router-dom";
import { verifyMemberData } from "../../apiServices/verify";
// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setMemberFollowers: (data: Follower[]) => dispatch(setMemberFollowers(data)),
});
// REDUX SELECTOR
const memberFollowersRetriever = createSelector(
  retrieveMemberFollowers,
  (memberFollowers) => ({
    memberFollowers,
  })
);

const MemberFollowers = (props: any) => {
  /**INSTALIZATIONS**/
  const { setFollowRebuild, followRebuild, mb_id } = props;
  const { setMemberFollowers } = actionDispatch(useDispatch());
  const { memberFollowers } = useSelector(memberFollowersRetriever);
  const [followersSearchObj, setFollowersSearchObj] = useState<FollowSearchObj>(
    { page: 1, limit: 5, mb_id: mb_id }
  );
  const history = useHistory();

  useEffect(() => {
    const followService = new FollowApiService();
    followService
      .getMemberFollowers(followersSearchObj)
      .then((data) => setMemberFollowers(data))
      .catch((err) => console.log(err));
  }, [followersSearchObj, followRebuild]);
  // HANDLERS
  const handlePaginationChange = (event: any, value: number) => {
    followersSearchObj.page = value;
    setFollowersSearchObj({ ...followersSearchObj });
  };
  const subscribeHandler = async (e: any, id: string) => {
    try {
      e.stopPropagation();
      assert.ok(verifyMemberData, Definer.auth_err1);
      const followService = new FollowApiService();
      await followService.subscribe(id);
      await sweetTopSmallSuccessAlert("subscribed successfully", 700, false);
      setFollowRebuild(new Date());
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  const visitMemberHandler = (mb_id: string) => {
    history.push(`/member-page/other?mb_id=${mb_id}`);
    document.location.reload();
  };
  return (
    <Stack>
      {memberFollowers.map((follower: Follower) => {
        const img_url = follower?.subscriber_member_data?.mb_image
          ? `${serverApi}/${follower.subscriber_member_data.mb_image}`
          : "/public/auth/default_uer.svg";
        return (
          <Box className="follow_box">
            <Stack className="right_wrap_user">
              <Avatar
                alt="avatar"
                src={img_url}
                sx={{ width: 89, height: 89, mr: "25px", cursor: "pointer" }}
                onClick={() => visitMemberHandler(follower?.subscriber_id)}
              />
              <div className="name_wrap">
                <span
                  style={{ cursor: "pointer" }}
                  className="username_text"
                  onClick={() => visitMemberHandler(follower?.subscriber_id)}
                >
                  {follower?.subscriber_member_data?.mb_type}
                </span>
                <span
                  style={{ cursor: "pointer" }}
                  className="name_text"
                  onClick={() => visitMemberHandler(follower?.subscriber_id)}
                >
                  {follower?.subscriber_member_data?.mb_nick}
                </span>
              </div>
            </Stack>
            {props.actions_enabled &&
              (follower?.me_followed &&
              follower.me_followed[0]?.my_following ? (
                <Button
                  sx={{ color: "#fff" }}
                  variant="contained"
                  className="following_already"
                  disabled
                >
                  FOLLOWING
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className="follow_btn"
                  startIcon={
                    <img
                      src="/icons/follow_icon.svg"
                      style={{ width: "40px" }}
                    />
                  }
                  onClick={(e) => subscribeHandler(e, follower?.subscriber_id)}
                >
                  Follow Back
                </Button>
              ))}
          </Box>
        );
      })}
      <Stack
        sx={{ my: "40px" }}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box className="bottom_box">
          <Pagination
            count={
              followersSearchObj.page >= 3 ? followersSearchObj.page + 1 : 3
            }
            page={followersSearchObj.page}
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
    </Stack>
  );
};

export default MemberFollowers;
