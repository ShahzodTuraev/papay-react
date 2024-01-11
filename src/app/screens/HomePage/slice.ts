import { createSlice } from "@reduxjs/toolkit"; //obj
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
    //reducerlarning mapsadi initial valueni o'zgartirish
    //ma'lumotni borib redux storega yozadigan actionlar. Ular yuqoridagi top restaurant , bestRestaurant... larning qiymatini o'zgartiruvchilar.
    setTopRestaurants: (state, action) => {
      //TopRestauarntning qiymatini o'zgartiradi.
      state.topRestaurants = action.payload; //actiondan keyalayotgan dataning qiymatini payload orqali olib, topRestaurants ning qiymatini o'zgartiraman.
    }, //set bilan yozilgan hammasi hompageslicening actionlari
    setBestRestaurants: (state, action) => {
      state.bestRestaurant = action.payload;
    },
    setTrendProducts: (state, action) => {
      state.trendProducts = action.payload;
    },
    setBestBoArticles: (state, action) => {
      state.bestBoArticles = action.payload;
    },
    setTrendBoArticles: (state, action) => {
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
  setTrendBoArticles,
  setNewsBoArticles,
} = HomePageSlice.actions;

const HomePageReduser = HomePageSlice.reducer;
export default HomePageReduser;
