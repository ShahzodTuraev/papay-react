import React from "react";
import { Box, Link, Stack } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";

import moment from "moment";

const TargetArticles = (props: any) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <Stack>
      {props.targetBoArticles?.map((article: any, index: string) => {
        const art_img_url = "/community/famous_boy.jpg";
        return (
          <Link
            className="all_article_box"
            sx={{ textDecoration: "none" }}
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
                <span className="all_article_author_user">martin</span>
              </Box>
              <Box
                sx={{ display: "flex", mt: "15px" }}
                flexDirection={"column"}
              >
                <span className="all_article_title">evalution</span>
                <p className="all_article_desc">
                  Texas De Brazil zor restaurnat!
                </p>

                <Box className="article_bott_box">
                  <span>{moment().format("YY-MM-DD HH:MM")}</span>
                  <Checkbox
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                  />
                  <span>98 ta</span>
                  <RemoveRedEyeIcon sx={{ m: "0 10px" }} />
                  <span>1000 ta</span>
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
