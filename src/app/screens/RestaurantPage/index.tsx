import React from "react";
import { Container } from "@mui/material";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ChosenDish from "./chosenDish";
import AllRestaurants from "./allRestaurants";
import OneRestaurant from "./oneRestaurant";
import "../../../css/restaurant.css";

const RestaurantPage = (props: any) => {
  let restaurant = useRouteMatch();

  return (
    <div className="restaurant_page">
      <Switch>
        <Route path={`${restaurant.path}/dish/:dish_id`}>
          <ChosenDish onAdd={props.onAdd} />
        </Route>
        <Route path={`${restaurant.path}/:restaurant_id`}>
          <OneRestaurant onAdd={props.onAdd} />
        </Route>
        <Route path={`${restaurant.path}`}>
          <AllRestaurants />
        </Route>
      </Switch>
    </div>
  );
};

export default RestaurantPage;
