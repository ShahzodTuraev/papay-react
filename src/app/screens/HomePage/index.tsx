import React from "react";
import Statistics from "./statistics";
import TopRestaurants from "./topRestaurants";
import BestRestaurants from "./bestRestaurants";
import BestDishes from "./bestDishes";
import Advertisements from "./advertisements";
import Events from "./events";
import Recommentations from "./recommentations";
import "../../../css/home.css";

const HomePage = () => {
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
