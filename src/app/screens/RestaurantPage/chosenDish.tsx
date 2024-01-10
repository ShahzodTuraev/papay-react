import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { retrieveChosenProduct, retrieveChosenRestaurant } from "./selector";
import { Restaurant } from "../../../types/user";
import { setChosenProduct, setChosenRestaurant } from "./slice";
import { Product } from "../../../types/product";
import ProductApiService from "../../apiServices/productApiService";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import { serverApi } from "../../../lib/config";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import assert from "assert";
import { verifyMemberData } from "../../apiServices/verify";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
  setChosenRestaurant: (data: Restaurant) =>
    dispatch(setChosenRestaurant(data)),
});
// REDUX SELECTOR
const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  })
);
const chosenRestaurantRetriever = createSelector(
  retrieveChosenRestaurant,
  (chosenRestaurnt) => ({
    chosenRestaurnt,
  })
);

const ChosenDish = (props: any) => {
  // INITIALIZATIONS
  let { dish_id } = useParams<{ dish_id: string }>();
  const { setChosenProduct, setChosenRestaurant } = actionDispatch(
    useDispatch()
  );
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { chosenRestaurnt } = useSelector(chosenRestaurantRetriever);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const dishRelatedProcess = async () => {
    try {
      const productService = new ProductApiService();
      const product: Product = await productService.getChosenDish(dish_id);
      setChosenProduct(product);
      const restaurantService = new RestaurantApiService();
      const restaurnt = await restaurantService.getChosenRestaurant(
        product.restaurant_mb_id
      );
      setChosenRestaurant(restaurnt);
    } catch (err) {
      console.log("DishRelatedProcess:", err);
    }
  };
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());

  useEffect(() => {
    dishRelatedProcess().then();
  }, [productRebuild]);
  // HANDLER

  const targetLikeHandler = async (e: any) => {
    try {
      assert.ok(verifyMemberData, Definer.auth_err1);
      const memberService = new MemberApiService();
      const data = { like_ref_id: e.target.id, group_type: "product" };
      const like_result: any = await memberService.memberLikeTarget(data);
      assert.ok(like_result, Definer.general_err1);
      await sweetTopSmallSuccessAlert("success", 700, false);
      setProductRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeProduct, ERROR:::", err);
      sweetErrorHandling(err).then();
    }
  };
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
            {chosenProduct?.product_images?.map((ele, index) => {
              const image_path = `${serverApi}/${ele}`;
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
              slidesPerView={chosenProduct?.product_images.length}
              centeredSlides={false}
              spaceBetween={20}
            >
              {chosenProduct?.product_images?.map((ele, order) => {
                const image_path = `${serverApi}/${ele}`;
                return (
                  <SwiperSlide
                    className="bottom_dish_image"
                    style={{ cursor: "pointer" }}
                    key={order}
                  >
                    <img src={image_path} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Stack>
        </Stack>

        <Stack className="chosen_dish_info_container">
          <Box className="chosen_dish_info_box">
            <strong className="dish_txt">{chosenProduct?.product_name}</strong>
            <span className="resto_name">{chosenRestaurnt?.mb_nick}</span>
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
                    id={chosenProduct?._id}
                    onClick={targetLikeHandler}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite style={{ color: "red" }} />}
                    checked={
                      chosenProduct?.me_liked &&
                      !!chosenProduct.me_liked[0]?.my_favorite
                    }
                  />
                  <span>{chosenProduct?.product_likes}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>{chosenProduct?.product_views}</span>
                </div>
              </div>
            </Box>
            <p className="dish_desc_info">
              {chosenProduct?.product_description
                ? chosenProduct?.product_description
                : "no description"}
            </p>
            <div className="dish_desc_bottom">
              <Marginer
                direction="horizontal"
                height="1"
                width="100%"
                bg="#000"
              />
              <div className="dish_price_box">
                <span>Narxi:</span>
                <span>{`$ ${chosenProduct?.product_price}`}</span>
              </div>
              <div className="button_box">
                <Button
                  onClick={() => props.onAdd(chosenProduct)}
                  variant="contained"
                >
                  Savatga qo'shish
                </Button>
              </div>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
};

export default ChosenDish;
