import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CssVarsProvider } from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import IconButton from "@mui/joy/IconButton";
import Favorite from "@mui/icons-material/Favorite";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CallIcon from "@mui/icons-material/Call";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { retrieveTargetRestaurants } from "./selector";
import { Restaurant } from "../../../types/user";
import { setTargetRestaurants } from "./slice";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import { SearchObj } from "../../../types/others";
import { serverApi } from "../../../lib/config";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setTargetRestaurants: (data: Restaurant[]) =>
    dispatch(setTargetRestaurants(data)),
});
// REDUX SELECTOR
const targetRestaurantsRetriever = createSelector(
  retrieveTargetRestaurants,
  (targetRestaurants) => ({
    targetRestaurants,
  })
);

const AllRestaurants = () => {
  // INITIALIZATIONS
  const refs: any = useRef([]);
  const { setTargetRestaurants } = actionDispatch(useDispatch());
  const { targetRestaurants } = useSelector(targetRestaurantsRetriever);
  const [targetSearchObject, setTargetSearchObject] = useState<SearchObj>({
    page: 1,
    limit: 8,
    order: "mb_point",
  });
  useEffect(() => {
    const restaurantService = new RestaurantApiService();
    restaurantService
      .getRestaurants(targetSearchObject)
      .then((data) => setTargetRestaurants(data))
      .catch((err) => console.log(err));
  }, [targetSearchObject]);
  // HANDLERS
  const searchHandler = (category: string) => {
    targetSearchObject.page = 1;
    targetSearchObject.order = category;
    setTargetSearchObject({ ...targetSearchObject }); //yangi reference qiymatini kiritishimiz kerak.
  };

  const handlePaginationChange = (event: any, value: number) => {
    targetSearchObject.page = value;
    setTargetSearchObject({ ...targetSearchObject });
  };

  const targetLikeHandler = async (e: any, id: string) => {
    try {
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
      const memberService = new MemberApiService();
      const data = { like_ref_id: id, group_type: "member" };
      const like_result: any = await memberService.memberLikeTarget(data);
      assert.ok(like_result, Definer.general_err1);

      if (like_result.like_status > 0) {
        e.target.style.fill = "red";
        refs.current[like_result.like_ref_id].innerHTML++;
      } else {
        e.target.style.fill = "white";
        refs.current[like_result.like_ref_id].innerHTML--;
      }
      await sweetTopSmallSuccessAlert("success", 700, false);
    } catch (err: any) {
      console.log("targetLikeBest, ERROR:::", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="all_restaurant">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="fil_search_box">
            <Box className="fil_box" style={{ cursor: "pointer" }}>
              <a onClick={() => searchHandler("mb_point")}>Zo'r</a>
              <a onClick={() => searchHandler("mb_views")}>Mashhur</a>
              <a onClick={() => searchHandler("mb_likes")}>Trenddagi</a>
              <a onClick={() => searchHandler("createdAt")}>Yangi</a>
            </Box>
            <Box className="search_big_box">
              <form action="" className="search_form">
                <input
                  type="search"
                  className="searchInput"
                  name="resSearch"
                  placeholder="Qidiruv"
                />
                <Button
                  className="button_search"
                  variant="contained"
                  endIcon={<SearchIcon />}
                >
                  Izlash
                </Button>
              </form>
            </Box>
          </Box>
          <Stack className="all_res_box">
            <CssVarsProvider>
              {targetRestaurants.map((ele: Restaurant) => {
                const image_path = `${serverApi}/${ele.mb_image}`;
                return (
                  <Card
                    variant="outlined"
                    sx={{
                      minHeight: 410,
                      minWidth: 290,
                      mx: "17px",
                      my: "20px",
                    }}
                  >
                    <CardOverflow>
                      <AspectRatio ratio={1}>
                        <img src={image_path} alt="resto img" />
                      </AspectRatio>
                      <IconButton
                        area-label="Like minimal photography"
                        size="md"
                        variant="solid"
                        color="neutral"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        sx={{
                          position: "absolute",
                          zIndex: 2,
                          borderRadius: "50%",
                          right: "1rem",
                          bottom: -16,
                          transform: "traslate(50%)",
                          color: "rgba(0, 0, 0, .4)",
                        }}
                      >
                        <Favorite
                          onClick={(e) => targetLikeHandler(e, ele._id)}
                          style={{
                            fill:
                              ele?.me_liked && ele?.me_liked[0]?.my_favorite
                                ? "red"
                                : "white",
                          }}
                        />
                      </IconButton>
                    </CardOverflow>
                    <Typography level="h2" sx={{ fontSize: "md", mt: 1 }}>
                      {ele.mb_nick}
                    </Typography>
                    <Typography level="body-md" sx={{ mt: 0 }}>
                      <Link
                        href=""
                        startDecorator={<LocationOnRoundedIcon />}
                        textColor="neutral.700"
                      >
                        {ele.mb_address}
                      </Link>
                    </Typography>
                    <Typography level="body-md" sx={{ mt: 0, mb: 1 }}>
                      <Link
                        href=""
                        startDecorator={<CallIcon />}
                        textColor="neutral.700"
                      >
                        {ele.mb_phone}
                      </Link>
                    </Typography>
                    <CardOverflow
                      variant="soft"
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        py: 1.5,
                        px: "var(--Card-padding)",
                        borderTop: "1px solid rgba(0,0,0,.1)",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "10px",
                        }}
                      >
                        <Typography
                          level="body-sm"
                          sx={{
                            fontWeight: "md",
                            color: "text.secondary",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          {ele.mb_views}{" "}
                          <VisibilityIcon
                            sx={{ fontSize: 20, marginLeft: "5px" }}
                          />
                        </Typography>
                        <Box sx={{ width: 2, bgcolor: "divider" }} />
                        <Typography
                          level="body-sm"
                          sx={{
                            fontWeight: "md",
                            color: "text.secondary",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <div
                            ref={(element) => (refs.current[ele._id] = element)}
                          >
                            {ele.mb_likes}
                          </div>
                          <FavoriteIcon
                            sx={{ fontSize: 20, marginLeft: "5px" }}
                          />
                        </Typography>
                      </Box>
                    </CardOverflow>
                  </Card>
                );
              })}
            </CssVarsProvider>
          </Stack>

          <Stack className="bottom_box">
            <img
              className="design_img"
              src="/icons/top_left_design.svg"
              style={{ transform: "matrix(1, 0, 0, -1, 0, 0)" }}
            />
            <Pagination
              count={
                targetSearchObject.page >= 3 ? targetSearchObject.page + 1 : 3
              }
              page={targetSearchObject.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color="secondary"
                />
              )}
              onChange={handlePaginationChange}
            />
            <img
              className="design_img"
              src="/icons/top_left_design.svg"
              style={{ transform: "rotate(180deg)" }}
            />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default AllRestaurants;
