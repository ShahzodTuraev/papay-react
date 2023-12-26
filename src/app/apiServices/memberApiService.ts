import { serverApi } from "../../lib/config";
import axios from "axios";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import { Member } from "../../types/user";

class MemberApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  async loginRequest(login_data: any) {
    try {
      const result = await axios.post(this.path + "/login", login_data, {
        withCredentials: true,
      });
      console.log("state:", result.data.state);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", result?.data?.message);
      const member: Member = result.data.data;
      localStorage.setItem("member_data", JSON.stringify(member));
      return member;
    } catch (err: any) {
      console.log(`ERROR::: loginRequest ${err.message}`);
      throw err;
    }
  }

  async signupRequest(signup_data: any) {
    try {
      const result = await axios.post(this.path + "/signup", signup_data, {
        withCredentials: true,
      });
      console.log("state:", result.data.state);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", result?.data?.message);
      const member: Member = result.data.data;
      localStorage.setItem("member_data", JSON.stringify(member));
      return member;
    } catch (err: any) {
      console.log(`ERROR::: signupRequest ${err.message}`);
      throw err;
    }
  }

  async logOutRequest() {
    try {
      const result = await axios.get(this.path + "/logout", {
        withCredentials: true, // bu bo'lmasa server cookies bilan oldi berdisini uzadi.
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", result?.data?.message);
      const logout_result = result.data.stater;
      return logout_result == "success";
    } catch (err: any) {
      console.log(`ERROR::: logOutRequest ${err.message}`);
    }
  }
}

export default MemberApiService;