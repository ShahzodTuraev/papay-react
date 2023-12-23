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
    setBestRestaurants: (state, action) => {
      state.bestRestaurant = action.payload;
    },
    setTrendProducts: (state, action) => {
      state.trendProducts = action.payload;
    },
    setBestBoArticles: (state, action) => {
      state.bestBoArticles = action.payload;
    },
    setTrenBoArticles: (state, action) => {
      state.trenBoArticles = action.payload;
    },
    setNewsBoArticles: (state, action) => {
      state.newsBoArticles = action.payload;
    },
  },
});

export const {
  //ishlatish
  setTopRestaurants,
  setBestRestaurants,
  setTrendProducts,
  setBestBoArticles,
  setTrenBoArticles,
  setNewsBoArticles,
} = HomePageSlice.actions;

const HomePageReduser = HomePageSlice.reducer;
export default HomePageReduser;
