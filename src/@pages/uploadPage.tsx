import UploadHeader from "../@components/@common/uploadHeader";
import TrackUpload from "../@components/upload/trackUpload";
import VocalUpload from "../@components/upload/vocalUpload";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function UploadPage() {
  const [userType, setUserType] = useState<string>("vocal");
  const [producerUploadState, setProducerUploadState] = useState<string>("Portfolio");

  return (
    <>
      <UploadHeader userType={userType} producerUploadType={producerUploadState} />
      {userType === "producer" ? <TrackUpload /> : <VocalUpload />}
    </>
  );
}
