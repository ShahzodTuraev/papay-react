import { Box, Link } from "@mui/material";
import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import { BoArticle } from "../../../types/boArticle";
import { serverApi } from "../../../lib/config";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";

const MemberPosts = (props: any) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const {
    chosenMemberBoArticles,
    renderChosenArticleHandler,
    setArticleRebuild,
  } = props;
  /*HANDLERS*/
  const targetLikeHandler = async (e: any) => {
    try {
      e.stopPropagation();
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
      const memberService = new MemberApiService();
      const like_result = await memberService.memberLikeTarget({
        like_ref_id: e.target.id,
        group_type: "community",
      });
      assert.ok(like_result, Definer.general_err1);
      await sweetTopSmallSuccessAlert("success", 700, false);
      setArticleRebuild(new Date());
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <Box className="post_container">
      {chosenMemberBoArticles.map((article: BoArticle) => {
        const image_path = article.art_image
          ? `${serverApi}/${article.art_image}`
          : "/community/default_img.jpeg";
        return (
          <Link
            key={article._id}
            className="all_article_box"
            sx={{ textDecoration: "none" }}
            href={``}
          >
            <Box
              className="all_article_img"
              sx={{ backgroundImage: `url(${image_path})` }}
            ></Box>
            <Box className="all_article_container">
              <Box
                className="article_author"
                alignItems={"center"}
                display={"flex"}
              >
                <img
                  src={
                    article?.member_data?.mb_image
                      ? `${serverApi}/${article.member_data.mb_image}`
                      : "/auth/default_uer.svg"
                  }
                  alt="avatar"
                  width={"35px"}
                  style={{ borderRadius: "50%", backgroundSize: "cover" }}
                />
                <span className="all_article_author_user">
                  {article?.member_data?.mb_nick}
                </span>
              </Box>
              <Box
                sx={{ display: "flex", mt: "15px" }}
                flexDirection={"column"}
              >
                <span className="all_article_title">{article?.bo_id}</span>
                <p className="all_article_desc">{article?.art_subject}</p>

                <Box className="article_bott_box">
                  <span>
                    {moment(article?.createdAt).format("YY-MM-DD HH:MM")}
                  </span>
                  <Checkbox
                    {...label}
                    onClick={targetLikeHandler}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite sx={{ color: "red" }} />}
                    checked={
                      article?.me_liked && article.me_liked[0]?.my_favorite
                        ? true
                        : false
                    }
                    id={article._id}
                  />
                  <span>{article?.art_likes} ta</span>
                  <RemoveRedEyeIcon sx={{ m: "0 10px" }} />
                  <span>{article?.art_views} ta</span>
                </Box>
              </Box>
            </Box>
          </Link>
        );
      })}
    </Box>
  );
};

export default MemberPosts;
