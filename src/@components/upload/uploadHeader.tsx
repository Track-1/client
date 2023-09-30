import styled from "styled-components";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { UploadData } from "../../recoil/upload/uploadData";
import useUploadAPI from "../../hooks/queries/upload/useUploadAPI";
import { UPLOAD_TYPE } from "../../core/common/uploadType";
import useUploadEditAPI from "../../hooks/queries/upload/useUploadEditAPI";
import { useLocation } from "react-router-dom";
import { ROLE } from "../../core/common/roleType";
import { setCookie } from "../../utils/common/cookie";
import { UploadAbleBtnIc, UploadUnableBtnIc } from "../../assets";

export default function UploadHeader() {
  const [uploadData, setUploadData] = useRecoilState(UploadData);
  const { uploadAPI } = useUploadAPI();
  const { uploadEditAPI, trackId } = useUploadEditAPI();
  const [isUploadActive, setIsUploadActive] = useState(false);
  const pathname = useLocation().pathname;

  useEffect(() => {
    isActive() ? setIsUploadActive(true) : setIsUploadActive(false);
  }, [uploadData]);

  useEffect(() => {
    if (pathname.includes("upload")) return;

    if (uploadData.imageFile) {
      setUploadData((prev) => ({
        ...prev,
        imageFileSame: false,
      }));
    } else {
      setUploadData((prev) => ({
        ...prev,
        imageFileSame: true,
      }));
    }
  }, [uploadData.imageFile]);

  function isActive() {
    return (
      uploadData.title !== "" &&
      uploadData.audioFileName &&
      uploadData.category !== "-1" &&
      uploadData.keyword.length > 0
    );
  }

  function uploadFormData() {
    const formData = new FormData();

    const audioFile = uploadData.audioFile && new Blob([uploadData?.audioFile], { type: uploadData.audioFile?.type });
    const imageFile = uploadData.imageFile && new Blob([uploadData?.imageFile], { type: uploadData.imageFile?.type });

    if (pathname.includes(UPLOAD_TYPE.PORTFOLIO)) {
      formData.append("portfolioAudioFileName", uploadData.audioFileName);
      formData.append("portfolioTitle", uploadData.title);
      formData.append("portfolioCategory", uploadData.category);
      formData.append("portfolioContent", uploadData.introduction);
      for (let i = 0; i < uploadData.keyword.length; i++) {
        formData.append(`portfolioKeyword[${i}]`, uploadData.keyword[i]);
      }
      audioFile && formData.append("portfolioAudioFile", audioFile);
      imageFile && formData.append("portfolioImageFile", imageFile);
      uploadData.imageFileSame !== undefined &&
        formData.append("portfolioImageFileSame", uploadData.imageFileSame ? "true" : "false");
    } else {
      formData.append("trackAudioFileName", uploadData.audioFileName);
      formData.append("trackTitle", uploadData.title);
      formData.append("trackCategory", uploadData.category);
      formData.append("trackContent", uploadData.introduction);
      for (let i = 0; i < uploadData.keyword.length; i++) {
        formData.append(`trackKeyword[${i}]`, uploadData.keyword[i]);
      }
      audioFile && formData.append("trackAudioFile", audioFile);
      imageFile && formData.append("trackImageFile", imageFile);
      uploadData.imageFileSame !== undefined &&
        formData.append("trackImageFileSame", uploadData.imageFileSame ? "true" : "false");
    }

    return formData;
  }

  function handleUploadData() {
    const upload = uploadAPI();
    const uploadEdit = uploadEditAPI();

    const formData = uploadFormData();
    setCookie(
      "accessToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YWJsZU5hbWUiOiJwcm9kdWNlciIsInVzZXJJZCI6MywiaWF0IjoxNjkyMjAwMDkxLCJleHAiOjE2OTczODQwOTF9.3WlB_9XRaf0_rGC3J8iY6qHkSOU7nMUL-YXO-_cIFH0",
      {},
    );

    isUploadActive && pathname.includes("upload") ? upload(formData) : uploadEdit({ trackId, formData });
  }

  function uploadTypeText() {
    if (pathname.includes(ROLE.PRODUCER)) {
      return pathname.includes(UPLOAD_TYPE.PORTFOLIO) ? "Portfolio" : "Vocal Searching";
    } else {
      return UPLOAD_TYPE.PORTFOLIO;
    }
  }

  return (
    <Wrapper>
      <UploadTypeText>{uploadTypeText()}</UploadTypeText>
      {isUploadActive ? <UploadAbleBtnIcon onClick={handleUploadData} /> : <UploadUnableBtnIcon />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

const UploadTypeText = styled.div`
  color: ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.id};

  margin-left: 6.1rem;
`;

const UploadUnableBtnIcon = styled(UploadUnableBtnIc)`
  cursor: pointer;
  width: 24.6rem;
`;

const UploadAbleBtnIcon = styled(UploadAbleBtnIc)`
  cursor: pointer;
  width: 24.6rem;
`;
