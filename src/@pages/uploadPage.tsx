import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useParams, useLocation } from "react-router-dom";
import { UploadInfoDataType } from "../type/uploadInfoDataType";
import TrackUploadDefaultImg from "../assets/image/trackUploadDefaultImg.png";
import VocalUploadDefaultImg from "../assets/image/vocalUploadDefaultImg.png";
import { checkUserType } from "../utils/common/userType";
import { LoginUserType } from "../recoil/loginUserData";
import TrackUpload from "../@components/upload/trackUpload";
import VocalUpload from "../@components/upload/vocalUpload";
import UploadHeader from "../@components/upload/uploadHeader";

export default function UploadPage() {
  const loginUserType = useRecoilValue(LoginUserType);
  const location = useLocation();
  const producerUploadType = location.state.data1;
  const prevPage = location.state.data2;
  // const { producerUploadType } = useParams();

  console.log(location.state.data1);
  console.log(producerUploadType);

  const [uploadData, setUploadData] = useState<UploadInfoDataType>({
    title: "",
    category: "Select",
    audioFile: null,
    content: "",
    keyword: [],
    jacketImage: getDefaultImage(),
  });

  function getDefaultImage(): FormData {
    let defaultImage = new FormData();
    checkUserType(loginUserType)
      ? defaultImage.append("defaultImage", TrackUploadDefaultImg)
      : defaultImage.append("defaultImage", VocalUploadDefaultImg);

    return defaultImage;
  }

  return (
    <>
      <UploadHeader
        userType={loginUserType}
        producerUploadType={producerUploadType}
        prevPage= {prevPage}
        uploadData={uploadData}
        setUploadData={setUploadData}
      />
      {checkUserType(loginUserType) ? (
        <TrackUpload uploadData={uploadData} setUploadData={setUploadData} />
      ) : (
        <VocalUpload uploadData={uploadData} setUploadData={setUploadData} />
      )}
    </>
  );
}
