import { createSlice } from "@reduxjs/toolkit"; //obj
import { RestaurantPageState } from "../../../types/screen";

const initialState: RestaurantPageState = {
  targetRestaurants: [],
  randomRestaurants: [],
  chosenRestaurant: null,
  targetProducts: [],
  chosenProduct: null,
};

const RestaurantPageSlice = createSlice({
  name: "restaurantPage",
  initialState,
  reducers: {
    setTargetRestaurants: (state, action) => {
      state.targetRestaurants = action.payload;
    },
    setRandomRestaurants: (state, action) => {
      state.randomRestaurants = action.payload;
    },
    setChosenRestaurant: (state, action) => {
      state.chosenRestaurant = action.payload;
    },
    setTargetProducts: (state, action) => {
      state.targetProducts = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
  },
});

export const {
  setTargetRestaurants,
  setRandomRestaurants,
  setChosenRestaurant,
  setTargetProducts,
  setChosenProduct,
} = RestaurantPageSlice.actions;

const RestaurantPageReducer = RestaurantPageSlice.reducer;
export default RestaurantPageReducer;
