import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { FileUploadButtonIc } from "../../assets";
import useUploadAudioFile from "../../hooks/common/useUploadAudioFile";
import { commentUpdateData, commentWriteData } from "../../recoil/trackPost/commentWriteData";
import { CommentIsUpdateProp } from "../../type/trackPost/commentIsUpdateProp";

export default function CommentFileInput(props: CommentIsUpdateProp) {
  const { isUpdate } = props;
  const [comment, setComment] = useRecoilState(isUpdate ? commentUpdateData : commentWriteData);
  const { audioFile, audioFileName, handleUploadAudioFile } = useUploadAudioFile();

  useEffect(() => {
    if (!audioFile || audioFileName === "") return;
    setComment({ ...comment, commentAudioFileName: audioFileName, commentAudioFile: audioFile });
  }, [audioFile, audioFileName]);

  return (
    <CommentFileInputWrapper>
      <InputTitle>{comment?.commentAudioFileName}</InputTitle>
      <label>
        <FileUploadButtonIcon />
        <FileInput type="file" accept=".mp3, .wav" onChange={handleUploadAudioFile} />
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
