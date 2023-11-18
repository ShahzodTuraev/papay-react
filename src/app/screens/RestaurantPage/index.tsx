import React from "react";
import { Container } from "@mui/material";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ChosenDish from "./chosenDish";
import ChosenRestaurant from "./chosenRestaurant";
import AllRestaurants from "./allRestaurants";

const RestaurantPage = () => {
  let restaurant = useRouteMatch();

  return (
    <div className="restaurant_page">
      <Switch>
        <Route path={`${restaurant.path}/dish/:dish_id`}>
          <ChosenDish />
        </Route>
        <Route path={`${restaurant.path}/:restaurant_id`}>
          <ChosenRestaurant />
        </Route>
        <Route path={`${restaurant.path}`}>
          <AllRestaurants />
        </Route>
      </Switch>
    </div>
  );
};

export default RestaurantPage;
