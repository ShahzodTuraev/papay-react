import React from "react";
import { Box, Link, Stack } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";

import moment from "moment";
import { BoArticle } from "../../../types/boArticle";
import { serverApi } from "../../../lib/config";

const TargetArticles = (props: any) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  // const {article} = props
  return (
    <Stack>
      {props.targetBoArticles?.map((article: BoArticle) => {
        const art_img_url = article?.art_image
          ? `${serverApi}/${article.art_image}`
          : "/community/famous_boy.jpg";
        return (
          <Link
            className="all_article_box"
            sx={{ textDecoration: "none", height: "180px" }}
            href={``}
          >
            <Box
              className="all_article_img"
              sx={{ backgroundImage: `url(${art_img_url})` }}
            ></Box>
            <Box className="all_article_container">
              <Box
                className="article_author"
                alignItems={"center"}
                display={"flex"}
              >
                <img
                  src="/community/cooker.png"
                  alt="avatar"
                  width={"35px"}
                  style={{ borderRadius: "50%", backgroundSize: "cover" }}
                />
                <span className="all_article_author_user">
                  {article?.member_data.mb_nick}
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
                    {moment(article.createdAt).format("YY-MM-DD HH:MM")}
                  </span>
                  <Checkbox
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    id={article?._id}
                  />
                  <span>{article?.art_likes}</span>
                  <RemoveRedEyeIcon sx={{ m: "0 10px" }} />
                  <span>{article?.art_views}</span>
                </Box>
              </Box>
            </Box>
          </Link>
        );
      })}
    </Stack>
  );
};

export default TargetArticles;
