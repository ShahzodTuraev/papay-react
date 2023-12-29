import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import { Restaurant } from "../../types/user";
import { SearchObj } from "../../types/others";
class RestaurantApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }
  async getTopRestaurants(): Promise<Restaurant[]> {
    //qogan joydayam promise ishlat
    try {
      const url = "/restaurants?order=top&page=1&limit=4",
        result = await axios.get(this.path + url, { withCredentials: true });
      assert.ok(result, Definer.general_err1);
      console.log("result:::", result);
      const top_restaurants: Restaurant[] = result.data.data;
      return top_restaurants;
    } catch (err: any) {
      console.log(`ERROR ::: getTopRestaurants ${err.message}`);
      throw err;
    }
  }

  async getRestaurants(data: SearchObj): Promise<Restaurant[]> {
    try {
      const url = `/restaurants?order=${data.order}&page=${data.page}&limit=${data.limit}`,
        result = await axios.get(this.path + url, { withCredentials: true });
      assert.ok(result, Definer.general_err1);
      // console.log("result:::", result);
      const top_restaurants: Restaurant[] = result.data.data;
      return top_restaurants;
    } catch (err: any) {
      console.log(`ERROR ::: getRestaurants ${err.message}`);
      throw err;
    }
  }

  async getChosenRestaurant(id: string): Promise<Restaurant> {
    try {
      const url = `/restaurants/${id}`,
        result = await axios.get(this.path + url, { withCredentials: true });
      assert.ok(result, Definer.general_err1);
      const restaurant: Restaurant = result.data.data;
      return restaurant;
    } catch (err: any) {
      console.log(`ERROR ::: getChosenRestaurant ${err.message}`);
      throw err;
    }
  }
}

export default RestaurantApiService;
