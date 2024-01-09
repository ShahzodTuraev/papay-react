import { serverApi } from "../../lib/config";
import axios from "axios";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import {
  BoArticle,
  SearchArticleObj,
  SearchMemberArticlesObj,
} from "../../types/boArticle";
import { FollowSearchObj, Follower, Following } from "../../types/follow";

class FollowApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  public async getTargetArticles(data: SearchArticleObj): Promise<BoArticle[]> {
    try {
      let url = `/community/target?bo_id=${data.bo_id}&page=${data.page}&limit=${data.limit}`;
      if (data.order) url += `&order=${data.order}`;
      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });
      console.log("state:", result.data.state);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", result?.data?.message);
      const articles: BoArticle[] = result.data.data;
      return articles;
    } catch (err: any) {
      console.log(`ERROR::: getTargetArticles ${err.message}`);
      throw err;
    }
  }

  public async getMemberFollowers(data: FollowSearchObj): Promise<Follower[]> {
    try {
      const url = `/follow/followers?mb_id=${data.mb_id}&page=${data.page}&limit=${data.limit}`;

      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });
      console.log("state:", result.data.state);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", result?.data?.message);
      const followers: Follower[] = result.data.data;
      return followers;
    } catch (err: any) {
      console.log(`ERROR::: getMemberFollowers ${err.message}`);
      throw err;
    }
  }

  public async getMemberFollowings(
    data: FollowSearchObj
  ): Promise<Following[]> {
    try {
      const url = `/follow/followings?mb_id=${data.mb_id}&page=${data.page}&limit=${data.limit}`;

      const result = await axios.get(this.path + url, {
        withCredentials: true,
      });
      console.log("state:", result.data.state);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", result?.data?.message);
      const followings: Following[] = result.data.data;
      return followings;
    } catch (err: any) {
      console.log(`ERROR::: getMemberFollowings ${err.message}`);
      throw err;
    }
  }

  public async subscribe(mb_id: string): Promise<boolean> {
    try {
      const result = await axios.post(
        this.path + "/follow/subscribe",
        { mb_id: mb_id },
        {
          withCredentials: true,
        }
      );
      console.log("state:", result.data.state);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", result?.data?.message);
      return result.data.data === "subscribed";
    } catch (err: any) {
      console.log(`ERROR::: subscribe ${err.message}`);
      throw err;
    }
  }

  public async unsubscribe(mb_id: string): Promise<boolean> {
    try {
      const result = await axios.post(
        this.path + "/follow/unsubscribe",
        { mb_id: mb_id },
        {
          withCredentials: true,
        }
      );
      console.log("state:", result.data.state);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", result?.data?.message);
      return result.data.data === "unsubscribed";
    } catch (err: any) {
      console.log(`ERROR::: subscribe ${err.message}`);
      throw err;
    }
  }
}

export default FollowApiService;
