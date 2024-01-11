import { CloudDownload } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import { verifyMemberData } from "../../apiServices/verify";
import { MemberUpdateData } from "../../../types/user";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import MemberApiService from "../../apiServices/memberApiService";

const MySittings = (props: any) => {
  // INITIALIZATIONS
  const [file, setFile] = useState(verifyMemberData?.mb_image);
  const [memberUpdate, setMemberUpdate] = useState<MemberUpdateData>({
    mb_nick: "",
    mb_description: "",
    mb_address: "",
    mb_image: "",
    mb_phone: "",
  });

  // HANDLERS
  const changeMemberNickHandler = (e: any) => {
    memberUpdate.mb_nick = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  const changeMemberPhoneHandler = (e: any) => {
    memberUpdate.mb_phone = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  const changeMemberDeskHandler = (e: any) => {
    memberUpdate.mb_description = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  const changeMemberAddressHandler = (e: any) => {
    memberUpdate.mb_address = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };

  const handleImagePreviewer = (e: any) => {
    try {
      const file = e.target.files[0];
      const fileType = file["type"],
        validTypes = ["image/jpg", "image/jpeg", "image/png"];
      assert.ok(validTypes.includes(fileType) && file, Definer.input_err2);
      memberUpdate.mb_image = file;
      setMemberUpdate({ ...memberUpdate });
      setFile(URL.createObjectURL(file));
    } catch (err) {
      console.log(`ERROR ::: handleImagePreviewer ${err}`);
      sweetErrorHandling(err).then();
    }
  };

  const handleSubmitButton = async (e: any) => {
    try {
      const memberService = new MemberApiService();
      const result = await memberService.updateMemberData(memberUpdate);
      assert.ok(result, Definer.general_err1);
      await sweetTopSmallSuccessAlert(
        "Information modified successfully",
        700,
        false
      );
      window.location.reload();
    } catch (err) {
      console.log(`ERROR ::: handleSubmitButton ${err}`);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <Stack className="my_settings_page">
      <Box className="member_media_frame">
        <img
          src={file}
          alt="avatar"
          style={{ borderRadius: "50%" }}
          width={"100px"}
          height={"100px"}
        />
        <div className="media_change_box">
          <span>Rasm Yuklash</span>
          <p>JPG, JPEG, PNG rasmlarni yuklay olasiz!</p>
          <div className="up_del_box">
            <Button
              onChange={handleImagePreviewer}
              component="label"
              style={{ minWidth: "0" }}
            >
              <CloudDownload />
              <input type="file" hidden />
            </Button>
          </div>
        </div>
      </Box>
      <Box className="input_frame">
        <div className="log_input">
          <label className="spec_label">Ism</label>
          <input
            className="spec_input mb_nick"
            type="text"
            placeholder={verifyMemberData?.mb_nick}
            name="mb_nick"
            onChange={changeMemberNickHandler}
          />
        </div>
      </Box>
      <Box className="input_frame">
        <div className="short_input">
          <label className="spec_label">Telefon Raqam</label>
          <input
            type="text"
            className="spec_input mb_phone"
            placeholder={verifyMemberData?.mb_phone}
            name="mb_phone"
            onChange={changeMemberPhoneHandler}
          />
        </div>
        <div className="short_input">
          <label className="spec_label">Manzil</label>
          <input
            type="text"
            className="spec_input mb_address"
            placeholder={verifyMemberData?.mb_address ?? "manzil kiritilmagan"}
            name="mb_address"
            onChange={changeMemberAddressHandler}
          />
        </div>
      </Box>
      <Box className="input_frame">
        <div className="long_input">
          <label className="spec_label">Ma'lumot</label>
          <textarea
            onChange={changeMemberDeskHandler}
            className="spec_textarea mb_description"
            placeholder={
              verifyMemberData?.mb_description ?? "ma'lumot kiritilmagan"
            }
            name="mb_description"
          ></textarea>
        </div>
      </Box>
      <Box display={"flex"} justifyContent={"flex-end"} sx={{ mt: "25px" }}>
        <Button variant={"contained"} onClick={handleSubmitButton}>
          Saqlash
        </Button>
      </Box>
    </Stack>
  );
};

export default MySittings;
