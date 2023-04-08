import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import { UploadInfoDataType } from "../type/uploadInfoDataType";
import TrackUploadDefaultImg from "../assets/image/trackUploadDefaultImg.png";
import VocalUploadDefaultImg from "../assets/image/vocalUploadDefaultImg.png";
import { checkUserType } from "../utils/common/userType";
import { LoginUserType } from "../recoil/loginUserData";
import TrackUpload from "../@components/upload/trackUpload";
import VocalUpload from "../@components/upload/vocalUpload";
import UploadHeader from "../@components/upload/uploadHeader";
import usePlayer from "../utils/hooks/usePlayer";

export default function UploadPage() {
  const loginUserType = useRecoilValue(LoginUserType);
  const { producerUploadType } = useParams();

  const [uploadData, setUploadData] = useState<UploadInfoDataType>({
    title: "",
    category: "Select",
    audioFile: null,
    content: "",
    keyword: [],
    jacketImage: getDefaultImage(),
  });
  const { pausesPlayerAudio,closePlayer } = usePlayer();

  useEffect(()=>{
    window.onpopstate = function(event) {  
      alert("뒤로가기");
      pausesPlayerAudio();
      closePlayer();
     };
  },[])
  
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
      />
      {checkUserType(loginUserType) ? (
        <TrackUpload uploadData={uploadData} setUploadData={setUploadData} />
      ) : (
        <VocalUpload uploadData={uploadData} setUploadData={setUploadData} />
      )}
    </>
  );
}
