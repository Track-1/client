import styled from "styled-components";
import { FolderUploadIc, UploadFileIc } from "../../assets";
import UploadInfoBox from "./UploadInfoBox";
import { useState } from "react";

export default function FileUploadInfo() {
  const [fileName, setFileName] = useState("");
  const [isTextOverflow, setIsTextOverflow] = useState(false);
  const [audioType, setAudioType] = useState("");

  //오디오 업로드
  function uploadAudiofile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files !== null) {
      const file = e.target.value;
      const inputAudioFile = e.target!.files[0];
      const audioFileName: string = getAudioFileName(file);
      const audioFileType: string = getAudioFileType(file, audioFileName.length);
      const onlyFileName: string = getOnlyFileName(file);

      if (checkAudioFileType(audioFileType)) {
        setAudioAttribute(audioFileName, audioFileType, onlyFileName);
        // setUploadData((prevState) => {
        //   return { ...prevState, audioFile: inputAudioFile };
        // });
      } else {
        alert("Only wav, mp3 format audio can be uploaded.\nwav, mp3형식의 오디오만 업로드할 수 있습니다.");
      }
    }
  }

  function checkMaxInputLength(length: number, limit: number): boolean {
    return length <= limit;
  }

  function checkAudioFileType(type: string) {
    return type === ".mp3" || type === ".wav" || type === ".MP3" || type === ".WAV";
  }

  function getAudioFileName(file: string): string {
    return file.substring(file.lastIndexOf("\\") + 1);
  }

  function getAudioFileType(file: string, fileLength: number): string {
    return file.substring(file.lastIndexOf("\\") + 1).substring(fileLength - 4);
  }

  function getOnlyFileName(file: string): string {
    return file.substring(file.lastIndexOf("\\") + 1, file.length - 4);
  }

  function setAudioAttribute(name: string, type: string, editName: string) {
    if (checkMaxInputLength(editName.length, 13)) {
      setIsTextOverflow(false);
      setFileName(name);
    } else {
      setIsTextOverflow(true);
      setFileName(editName);
    }
    setAudioType(type);
  }

  return (
    <UploadInfoBox>
      <InfoType>
        <UploadFileIc />
        <InfoTypeText>File Upload</InfoTypeText>
      </InfoType>
      <InfoInput>
        <InputWrapper>
          <InputFileTextWrapper fileName={fileName}>
            <FileName value={fileName} isTextOverflow={isTextOverflow} disabled />
            {isTextOverflow && <FileAttribute isTextOverflow={isTextOverflow}>{audioType}</FileAttribute>}
            <input
              type="file"
              id="wavFileUpload"
              style={{ display: "none" }}
              accept=".wav,.mp3, .WAV, .MP3"
              onChange={uploadAudiofile}
              readOnly
            />
          </InputFileTextWrapper>
          <label htmlFor="wavFileUpload" style={{ cursor: "pointer" }}>
            <FolderUploadIcon />
          </label>
        </InputWrapper>
      </InfoInput>
    </UploadInfoBox>
  );
}
const InfoType = styled.div`
  display: flex;
  align-items: center;

  width: 20.7rem;
  height: 100%;

  color: ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.body1};
`;

const InfoTypeText = styled.div`
  margin-left: 1rem;
`;

const InfoInput = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 100%;
`;

// -------여기까지 공통----------


const InputWrapper = styled.div`
  display: flex;
`;

const InputFileTextWrapper = styled.div<{ fileName: string }>`
  height: 4.7rem;
  width: 20.8rem;

  display: flex;
  align-items: center;
  border-bottom: 0.1rem solid
    ${(props) => (props.fileName !== "" ? ({ theme }) => theme.colors.white : ({ theme }) => theme.colors.gray3)};
`;

const FileName = styled.input<{ isTextOverflow: boolean }>`
  height: 2.5rem;
  width: ${(props) => (props.isTextOverflow ? "16.4rem" : "100%")};

  display: flex;
  align-items: center;

  text-overflow: ${(props) => (props.isTextOverflow ? "ellipsis" : "default")};

  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.white};
  margin-top: 1.686rem;
  cursor: default;
`;

const FileAttribute = styled.div<{ isTextOverflow: boolean }>`
  height: 2.5rem;
  width: ${(props) => (props.isTextOverflow ? "100%" : 0)};
  width: 100%;

  display: flex;
  align-items: center;
  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.white};
  margin-top: 1.686rem;
`;

const FolderUploadIcon = styled(FolderUploadIc)`
  width: 4rem;
  height: 4rem;
  margin-left: 1.2rem;
  margin-top: 1.3rem;
`;
