import { serverApi } from "../../lib/config";
import axios from "axios";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import { Member, MemberUpdateData } from "../../types/user";
import { MemberLiken } from "../../types/others";

class MemberApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  public async loginRequest(login_data: any) {
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

  public async signupRequest(signup_data: any) {
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

  public async logOutRequest() {
    try {
      const result = await axios.get(this.path + "/logout", {
        withCredentials: true, // bu bo'lmasa server cookies bilan oldi berdisini uzadi.
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", result?.data?.message);
      const logout_result = result.data.state;
      return logout_result === "success";
    } catch (err: any) {
      console.log(`ERROR::: logOutRequest ${err.message}`);
    }
  }

  public async memberLikeTarget(data: any) {
    try {
      const result = await axios.post(this.path + "/member-liken", data, {
        withCredentials: true,
      });
      console.log("likeresult:", result);

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state !== "fail", result?.data?.message);
      console.log("state: ", result.data.data);
      const like_result: MemberLiken = result.data.data;

      return like_result;
    } catch (err: any) {
      console.log(`ERROR::: memberLikeTarget ${err.message}`);
    }
  }

  public async getChosenMember(id: string) {
    try {
      const result = await axios.get(this.path + `/member/${id}`, {
        withCredentials: true,
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state: ", result.data.data);
      const member: any = result.data.data;

      return member;
    } catch (err: any) {
      console.log(`ERROR::: getChosenMember ${err.message}`);
    }
  }

  public async updateMemberData(data: MemberUpdateData) {
    try {
      let formData = new FormData();
      formData.append("mb_nick", data.mb_nick || "");
      formData.append("mb_phone", data.mb_phone || "");
      formData.append("mb_address", data.mb_address || "");
      formData.append("mb_description", data.mb_description || "");
      formData.append("mb_image", data.mb_image || "");
      const result = await axios(`${this.path}/member/update`, {
        method: "POST",
        data: formData,
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state: ", result.data.data);
      const member: Member = result.data.data;
      localStorage.setItem("member_data", JSON.stringify(member));
      return member;
    } catch (err: any) {
      console.log(`ERROR::: updateMemberData ${err.message}`);
    }
  }
}

export default MemberApiService;
