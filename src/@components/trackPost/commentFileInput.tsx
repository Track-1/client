import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { FileUploadButtonIc } from "../../assets";
import useUploadAudioFile from "../../hooks/common/useUploadAudioFile";
import { commentWriteData } from "../../recoil/trackPost/commentWriteData";

export default function CommentFileInput() {
  const [comment, setComment] = useRecoilState(commentWriteData);
  const { audioInit, uploadAudiofile } = useUploadAudioFile();

  // const commentFile = useRef<HTMLInputElement | null>(null);

  // function handleUploadFile(e: React.ChangeEvent<HTMLInputElement>) {
  //   const currentFile = e.target.files && e.target.files[0];
  //   currentFile && setComment({ ...comment, commentAudioFile: currentFile, commentAudioFileName: currentFile?.name });

  //   if (e.target.files !== null) {
  //     const file = e.target.value;
  //     const audioFileName: string = getAudioFileName(file);
  //     const audioFileType: string = getAudioFileType(file, audioFileName.length);
  //     if (e.target.files?.length === 0) {
  //       // alert("파일삽입이 취소되었습니다.")
  //     } else {
  //       if (!checkAudioFileType(audioFileType)) {
  //         alert("Only wav, mp3 format audio can be uploaded.\nwav, mp3형식의 오디오만 업로드할 수 있습니다.");
  //         setComment({ ...comment, commentAudioFile: null, commentAudioFileName: "file_upload.mp3" });
  //       }
  //     }
  //   }
  // }

  useEffect(() => {
    if (!audioInit?.audioFile || audioInit?.fileName === "") return;
    setComment({ ...comment, commentAudioFileName: audioInit?.fileName, commentAudioFile: audioInit?.audioFile });
  }, [audioInit]);

  return (
    <>
      <InputTitle>{comment?.commentAudioFileName}</InputTitle>
      <label>
        <FileUploadButtonIcon />
        <FileInput type="file" accept=".mp3, .wav" onChange={uploadAudiofile} />
      </label>
    </>
  );
}

const FileUploadButtonIcon = styled(FileUploadButtonIc)`
  width: 4rem;
  margin-left: 1.2rem;

  cursor: pointer;
`;

const FileInput = styled.input`
  height: 0;
  width: 0;

  ${({ theme }) => theme.fonts.hashtag}

  color: ${({ theme }) => theme.colors.gray3};
  background-color: transparent;

  border-bottom: 0.2rem solid ${({ theme }) => theme.colors.gray3};
`;

const InputTitle = styled.strong`
  ${({ theme }) => theme.fonts.hashtag}
  color: ${({ theme }) => theme.colors.gray3};

  border-bottom: 0.2rem solid ${({ theme }) => theme.colors.gray3};
`;
