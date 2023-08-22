import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import TrackUpload from "../@components/upload/trackUpload";
import UploadHeader from "../@components/upload/uploadHeader";
import VocalUpload from "../@components/upload/vocalUpload";
import TrackUploadDefaultImg from "../assets/image/trackUploadDefaultImg.png";
import VocalUploadDefaultImg from "../assets/image/vocalUploadDefaultImg.png";
import { clickCategoryHeader } from "../recoil/categorySelect";
import { LoginUserType } from "../recoil/loginUserData";
import { UploadInfoDataType } from "../type/uploadInfoDataType";
import { checkUserType, isProducer } from "../utils/common/userType";
import usePlayer from "../utils/hooks/usePlayer";

export default function UploadPage() {
  const loginUserType = useRecoilValue(LoginUserType);
  const location = useLocation();
  const producerUploadType = isProducer(loginUserType) ? location.state.producerUploadType : "Portfolio";
  const prevPage = location.state?.prevPage;

  const [uploadData, setUploadData] = useState<UploadInfoDataType>({
    title: "",
    category: "Select",
    audioFile: null,
    content: "",
    keyword: [],
    jacketImage: getDefaultImage(),
  });
  const { pausesPlayerAudio, closePlayer } = usePlayer();
  const [isClickedCategory, setIsClickedCategory] = useRecoilState(clickCategoryHeader);

  useEffect(() => {
    setIsClickedCategory(true);
  }, []);

  useEffect(() => {
    window.onpopstate = function (event) {
      // alert("뒤로가기");
      pausesPlayerAudio();
      closePlayer();
    };
  }, []);

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
        prevPage={prevPage}
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
