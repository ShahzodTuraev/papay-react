import React, { useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Marginer from "../../components/marginer";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "../../../css/restaurant.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";

const chosen_list = Array.from(Array(3).keys());

const ChosenDish = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <div className="chosen_dish_page">
      <Container className="dish_container">
        <Stack className="chosen_dish_slider">
          <Swiper
            className="dish_swiper"
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {chosen_list.map((ele, index) => {
              const image_path = `/others/sandwich.jpeg`;
              return (
                <SwiperSlide key={index}>
                  <img
                    src={image_path}
                    style={{ width: "100%", height: "452px" }}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Stack className="bottom_dish_slider">
            <Swiper
              className=" bottom_dish_wrap"
              slidesPerView={3}
              centeredSlides={false}
              spaceBetween={20}
            >
              {[1, 2, 3, 4].map((ele, order) => {
                return (
                  <SwiperSlide
                    className="bottom_dish_image"
                    style={{ cursor: "pointer" }}
                    key={order}
                  >
                    <img src="/others/sandwich.jpeg" />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Stack>
        </Stack>

        <Stack className="chosen_dish_info_container">
          <Box className="chosen_dish_info_box">
            <strong className="dish_txt">Sweet Sandvich</strong>
            <span className="resto_name">Texas De Brazil</span>
            <Box className="rating_box">
              <Rating name="half-rating" defaultValue={3.5} precision={0.5} />
              <div className="evaluation_box">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "20px",
                  }}
                >
                  <Checkbox
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite style={{ color: "red" }} />}
                    checked={true}
                  />
                  <span>98 ta</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>1000 ta</span>
                </div>
              </div>
            </Box>
            <p className="dish_desc_info">Juda mazali sendvich</p>
            <div className="dish_desc_bottom">
              <Marginer
                direction="horizontal"
                height="1"
                width="100%"
                bg="#000"
              />
              <div className="dish_price_box">
                <span>Narxi:</span>
                <span>$11</span>
              </div>
              <div className="button_box">
                <Button variant="contained">Savatga qo'shish</Button>
              </div>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
};

export default ChosenDish;
