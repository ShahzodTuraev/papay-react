import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectHomePage = (state: AppRootState) => state.homePage; //state- butun application statei
export const retrieveTopRestaurants = createSelector(
  selectHomePage, //selectHomePagedan HomePageni olib ber
  (HomePage) => HomePage.topRestaurants //homPagening ichidan TopRestaurants ni olib retriveTopRestaurantsga joylandi.
);
export const retrieveBestRestaurants = createSelector(
  selectHomePage,
  (HomePage) => HomePage.bestRestaurant
);
export const retrieveTrendProducts = createSelector(
  selectHomePage,
  (HomePage) => HomePage.trendProducts
);
export const retrieveBestBoArticles = createSelector(
  selectHomePage,
  (HomePage) => HomePage.bestBoArticles
);
export const retrieveTrendBoArticles = createSelector(
  selectHomePage,
  (HomePage) => HomePage.trenBoArticles
);
export const retrieveNewsBoArticles = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newsBoArticles
);
