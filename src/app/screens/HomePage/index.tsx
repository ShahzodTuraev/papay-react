import React, { useEffect } from "react";
import Statistics from "./statistics";
import TopRestaurants from "./topRestaurants";
import BestRestaurants from "./bestRestaurants";
import BestDishes from "./bestDishes";
import Advertisements from "./advertisements";
import Events from "./events";
import Recommentations from "./recommentations";
import "../../../css/home.css";

const HomePage = () => {
  // selector: store=> data storedan datani olib beradi
  useEffect(() => {
    //backend data request=>data
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
