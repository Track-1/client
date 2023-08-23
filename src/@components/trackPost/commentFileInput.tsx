import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { FileUploadButtonIc } from "../../assets";
import useUploadAudioFile from "../../hooks/common/useUploadAudioFile";
import { commentWriteData } from "../../recoil/trackPost/commentWriteData";

export default function CommentFileInput() {
  const [comment, setComment] = useRecoilState(commentWriteData);
  const { audioInit, uploadAudiofile } = useUploadAudioFile();

  useEffect(() => {
    if (!audioInit?.audioFile || audioInit?.fileName === "") return;
    setComment({ ...comment, commentAudioFileName: audioInit?.fileName, commentAudioFile: audioInit?.audioFile });
  }, [audioInit]);

  return (
    <CommentFileInputWrapper>
      <InputTitle>{comment?.commentAudioFileName}</InputTitle>
      <label>
        <FileUploadButtonIcon />
        <FileInput type="file" accept=".mp3, .wav" onChange={uploadAudiofile} />
      </label>
    </CommentFileInputWrapper>
  );
}

const CommentFileInputWrapper = styled.header`
  display: flex;
  align-items: center;

  height: 4rem;
`;

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
