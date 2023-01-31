import TrackUpload from "../@components/upload/trackUpload";
import VocalUpload from "../@components/upload/vocalUpload";
import { useRecoilValue } from "recoil";
import { UserType } from "../recoil/main";
import { useParams } from "react-router-dom";
import { UploadInfoDataType, UploadInfoRefType } from "../type/uploadInfoDataType";
import { useState } from "react";
import TrackUploadDefaultImg from "../assets/image/trackUploadDefaultImg.png";
import VocalUploadDefaultImg from "../assets/image/vocalUploadDefaultImg.png";
import { isMaker } from "../utils/common/userType";

export default function UploadPage() {
  const userType = useRecoilValue(UserType);
  const { producerUploadType } = useParams();

  const [uploadData, setUploadData] = useState<UploadInfoDataType>({
    title: "",
    category: "Select",
    wavFile: null,
    introduce: "",
    keyword: [],
    jacketImage: getDefaultImage(),
  });

  const [uploadDataRef, setUploadDataRef] = useState<UploadInfoRefType>({
    introduceRef: null,
  });

  function getDefaultImage(): FormData {
    let defaultImage = new FormData();
    isMaker(userType)
      ? defaultImage.append("defaultImage", TrackUploadDefaultImg)
      : defaultImage.append("defaultImage", VocalUploadDefaultImg);

    return defaultImage;
  }

  return (
    <>
      {isMaker(userType) ? (
        <TrackUpload
          userType={userType}
          producerUploadType={producerUploadType}
          uploadData={uploadData}
          uploadDataRef={uploadDataRef}
          setUploadData={setUploadData}
          setUploadDataRef={setUploadDataRef}
        />
      ) : (
        <VocalUpload
          userType={userType}
          producerUploadType={producerUploadType}
          uploadData={uploadData}
          uploadDataRef={uploadDataRef}
          setUploadData={setUploadData}
          setUploadDataRef={setUploadDataRef}
        />
      )}
    </>
  );
}
