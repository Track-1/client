import TrackUpload from "../@components/upload/trackUpload";
import VocalUpload from "../@components/upload/vocalUpload";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import { UploadInfoDataType } from "../type/uploadInfoDataType";
import { useState } from "react";
import TrackUploadDefaultImg from "../assets/image/trackUploadDefaultImg.png";
import VocalUploadDefaultImg from "../assets/image/vocalUploadDefaultImg.png";
import { checkUserType } from "../utils/common/userType";
import UploadHeader from "../@components/@common/uploadHeader";
import { LoginUserType } from "../recoil/loginUserData";

export default function UploadPage() {
  const loginUserType = useRecoilValue(LoginUserType);
  const { producerUploadType } = useParams();

  const [uploadData, setUploadData] = useState<UploadInfoDataType>({
    title: "",
    category: "Select",
    audioFile: null,
    introduce: "",
    keyword: [],
    jacketImage: getDefaultImage(),
  });

  const [uploadDataRef, setUploadDataRef] = useState<React.MutableRefObject<HTMLTextAreaElement | null> | null>(null);

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
        uploadData={uploadData}
        setUploadData={setUploadData}
        uploadDataRef={uploadDataRef}
      />
      {checkUserType(loginUserType) ? (
        <TrackUpload uploadData={uploadData} setUploadData={setUploadData} setUploadDataRef={setUploadDataRef} />
      ) : (
        <VocalUpload uploadData={uploadData} setUploadData={setUploadData} setUploadDataRef={setUploadDataRef} />
      )}
    </>
  );
}
