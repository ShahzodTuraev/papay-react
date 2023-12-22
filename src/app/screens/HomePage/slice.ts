import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../types/screen";
const initialState: HomePageState = {
  topRestaurants: [],
  bestRestaurant: [],
  trendProducts: [],
  bestBoArticles: [],
  trenBoArticles: [],
  newsBoArticles: [],
};

const HomePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setTopRestaurants: (state, action) => {
      state.topRestaurants = action.payload;
    },
    bestRestaurant: (state, action) => {
      state.bestRestaurant = action.payload;
    },
    trendProducts: (state, action) => {
      state.trendProducts = action.payload;
    },
    bestBoArticles: (state, action) => {
      state.bestBoArticles = action.payload;
    },
    trenBoArticles: (state, action) => {
      state.trenBoArticles = action.payload;
    },
    newsBoArticles: (state, action) => {
      state.newsBoArticles = action.payload;
    },
  },
});

export const {
  //ishlatish
  setTopRestaurants,
  bestRestaurant,
  trendProducts,
  bestBoArticles,
  trenBoArticles,
  newsBoArticles,
} = HomePageSlice.actions;

const HomePageReduser = HomePageSlice.reducer;
export default HomePageReduser;
