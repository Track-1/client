import UploadHeader from "../@components/@common/uploadHeader";
import TrackUpload from "../@components/upload/trackUpload";
import VocalUpload from "../@components/upload/vocalUpload";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function UploadPage() {
  const navivation = useNavigate();
  const [type, setType] = useState<string>("track");

  function changeType(e: React.MouseEvent<HTMLButtonElement>) {
    if (type === "track") {
      setType("vocal");
    } else {
      setType("track");
    }
  }

  return (
    <>
      <UploadHeader />
      <button type="button" onClick={changeType} style={{ backgroundColor: "blue" }}>테스트 버튼</button>
      {type === "track" ? <TrackUpload /> : <VocalUpload />}
    </>
  );
}
