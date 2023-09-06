import useInputText from "./useInputText";
import { TEXT_LIMIT } from "../../core/common/textLimit";
import useUploadImageFile from "./useUploadImageFile";
import useUploadAudioFile from "./useUploadAudioFile";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { QUERIES_KEY } from "../../core/common/queriesKey";
import { getUploadEditInfo } from "../../api/portfolioEdit/getUploadEditInfo";
import { useSetRecoilState } from "recoil";
import { UploadData } from "../../recoil/upload/uploadData";
import { useLocation, useParams } from "react-router-dom";
import { UPLOAD_TYPE } from "../../core/common/uploadType";

export default function useUploadValue(initEmptyData: boolean) {
  const { imageFile, previewImage, setPreviewImage, handleUploadImageFile } = useUploadImageFile();
  const [title, changeTitle, setTitle] = useInputText("", TEXT_LIMIT.UPLOAD_TITLE);
  const { audioFile, audioFileName, setAudioFileName, audioFileType, isTextOverflow, handleUploadAudioFile } =
    useUploadAudioFile();
  const [description, changeDescription, setDescription] = useInputText("", TEXT_LIMIT.DESCRIPTION);

  const setUploadData = useSetRecoilState(UploadData);
  const { trackId } = useParams();

  const pathName = useLocation().pathname;
  const uploadType = getUploadType();

  function getUploadType() {
    return pathName.includes(UPLOAD_TYPE.VOCAL_SEARCHING) ? UPLOAD_TYPE.VOCAL_SEARCHING : UPLOAD_TYPE.PORTFOLIO;
  }

  useEffect(() => {
    setUploadData((prev) => ({
      ...prev,
      trackTitle: title,
      trackImageFile: imageFile,
      trackAudioFile: audioFile,
      trackCategory: "1",
      trackKeyword: ["hello", "world"],
      trackIntroduction: description,
      trackAudioFileName: audioFileName,
    }));
  }, [imageFile, title, audioFile, description]);

  const { data } = useQuery(
    QUERIES_KEY.GET_UPLOAD_EDIT_INFO,
    () => getUploadEditInfo("producer", uploadType, trackId),
    {
      enabled: !initEmptyData,
    },
  );

  useEffect(() => {
    if (data?.status === 200) {
      console.log(data);
      setTitle(data?.data.data.trackTitle);
      setPreviewImage(data?.data.data.trackImageFile);
      setDescription(data?.data.data.userIntroduction);
      setAudioFileName(data?.data.trackTitle); //변경해야됨
    }
  }, [data]);

  return {
    title: { title, changeTitle },
    image: { imageFile, previewImage, handleUploadImageFile },
    audio: { audioFile, audioFileName, audioFileType, isTextOverflow, handleUploadAudioFile },
    description: { description, changeDescription },
    uploadType,
  };
}
