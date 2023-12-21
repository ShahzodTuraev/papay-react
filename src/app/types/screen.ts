import { BoArticle } from "./boArticle";
import { Product } from "./product";
import { Restaurant } from "./user";

export interface AppRootState {
  homePage: HomePageState;
  // restaurantPage: restaurantPageState;
}

export interface HomePageState {
  topRestaurants: Restaurant[];
  bestRestaurant: Restaurant[];
  trendProducts: Product[];
  bestBoArticles: BoArticle[];
  trenBoArticles: BoArticle[];
  newsBoArticles: BoArticle[];
}
