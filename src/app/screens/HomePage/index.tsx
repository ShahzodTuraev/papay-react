import React, { useEffect } from "react";
import Statistics from "./statistics";
import TopRestaurants from "./topRestaurants";
import BestRestaurants from "./bestRestaurants";
import BestDishes from "./bestDishes";
import Advertisements from "./advertisements";
import Events from "./events";
import Recommentations from "./recommentations";
import "../../../css/home.css";

// REDUX
import { useDispatch, useSelector } from "react-redux"; // useSelector orqali o'qiladi
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setBestRestaurants, setTopRestaurants } from "./slice";
import { retrieveTopRestaurants } from "./selector";
import { Restaurant } from "../../../types/user";
import RestaurantApiService from "../../apiServices/restaurantApiService";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setTopRestaurants: (data: Restaurant[]) => dispatch(setTopRestaurants(data)),
  setBestRestaurants: (data: Restaurant[]) =>
    dispatch(setBestRestaurants(data)), //payload comand
});

const HomePage = () => {
  // INITIALIZATION
  const { setTopRestaurants, setBestRestaurants } = actionDispatch(
    useDispatch()
  ); // actionDispatchni ichidan useDispatch orqali qabul qilib olamiz

  // selector: store=> data storedan datani olib beradi
  useEffect(() => {
    //backend data request=>data
    const restaurantService = new RestaurantApiService();
    restaurantService
      .getTopRestaurants()
      .then((data) => {
        setTopRestaurants(data);
      })
      .catch((err) => console.log(err));
    restaurantService
      .getRestaurants({ page: 1, limit: 4, order: "mb_point" })
      .then((data) => {
        setBestRestaurants(data);
      })
      .catch((err) => console.log(err));
    // slice: data => storega datanin yozadi
  }, []);
  return (
    <div className="homepage">
      <Statistics />
      <TopRestaurants />
      <BestRestaurants />
      <BestDishes />
      <Advertisements />
      <Events />
      <Recommentations />
    </div>
  );
};

export default HomePage;
