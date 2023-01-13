import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { UploadIc } from "../../assets";
import { useRecoilState, useRecoilValue } from "recoil";
import { endPost, postContent, postContentLength, postIsCompleted, postWavFile } from "../../recoil/postIsCompleted";

interface PropsType {
  getUploadData: (content: string, wavFile: File | null) => any;
  // isCompleted: boolean;
}

export default function CommentWrite(props: PropsType) {
  // const { getUploadData, isCompleted } = props;
  const { getUploadData } = props;
  const isCompleted = useRecoilValue(postIsCompleted);

  const commentText = useRef<HTMLTextAreaElement | null>(null);
  const commentFile = useRef<any>(null);

  const [commentLength, setCommentLength] = useRecoilState<number>(postContentLength);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("file_upload.mp3");
  const [comment, setComment] = useRecoilState<string>(postContent);
  const [wavFile, setWavFile] = useRecoilState<any>(postWavFile);
  const [isEnd, setIsEnd] = useRecoilState<boolean>(endPost);

  useEffect(() => {
    const currentText = commentText.current!.value;
    console.log(commentFile.current!.files);

    isCompleted && getUploadData(currentText, uploadedFile);
    console.log(isCompleted);
    if (!isCompleted && !comment && commentFile) {
      commentText.current!.value = "";
    }
  }, [isCompleted]);

  useEffect(() => {
    // console.log("텍스트",commentText.current!.value)
    // console.log("파일",uploadedFile)

    setComment(commentText.current!.value);
    setWavFile(uploadedFile);
  }, [commentLength]);

  function changeCommentLength(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const currentLength = e.target.value.length;
    setCommentLength(currentLength);
  }

  function getFile(e: React.ChangeEvent<HTMLInputElement>) {
    const currentFile = e.target.files && e.target.files[0];
    currentFile && setUploadedFile(currentFile);

    currentFile && changeFileName(currentFile.name);
    setIsEnd(true);
  }

  function changeFileName(fileName: string) {
    setFileName(fileName);
  }

  return (
    //post
    <WriteContainer>
      <ProfileImage
        src={"https://track1-default.s3.ap-northeast-2.amazonaws.com/default_user2.png"}
        alt="프로필 이미지"
      />
      <InfoBox>
        <TitleWrapper>
          <InputTitle>{fileName}</InputTitle>
          <label htmlFor="userFile">
            <div>
              <UploadIcon />
            </div>
          </label>
          <FileInput type="file" accept=".mp3, .wav" id="userFile" onChange={getFile} ref={commentFile} />
          <CountWrapper>
            <InputCount commentLength={commentLength}>{commentLength}</InputCount>/ 150
          </CountWrapper>
        </TitleWrapper>
        <InputWrapper>
          <InputBox
            placeholder="트랙 음악을 다운받아서 보컬 녹음 파일을 업로드해보세요!"
            maxLength={150}
            onChange={changeCommentLength}
            ref={commentText}
          />
        </InputWrapper>
      </InfoBox>
    </WriteContainer>
  );
}

const WriteContainer = styled.article`
  height: 17.1rem;

  border: 0.2rem solid transparent;
  border-top-left-radius: 85.5rem;
  border-bottom-left-radius: 85.5rem;
  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(to right, ${({ theme }) => theme.colors.white}, ${({ theme }) => theme.colors.sub3});
  background-origin: border-box;
  background-clip: content-box, border-box;

  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  height: 10rem;
  width: 10rem;

  margin-left: 2.7rem;
  margin-right: 1.2rem;

  border-radius: 10rem;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  display: flex;

  align-items: center;
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

const UploadIcon = styled(UploadIc)`
  margin-left: 1.4rem;

  cursor: pointer;
`;

const CountWrapper = styled.div`
  display: flex;

  color: ${({ theme }) => theme.colors.gray3};

  ${({ theme }) => theme.fonts.description}

  margin-left: 54.1rem;
`;

const InputCount = styled.strong<{ commentLength: number }>`
  color: ${({ commentLength, theme }) => (commentLength === 0 ? theme.colors.gray3 : theme.colors.white)};
`;

const InputWrapper = styled.div`
  height: 7.9rem;

  margin-top: 1rem;
`;

const InputBox = styled.textarea`
  width: 79rem;

  vertical-align: top;

  color: ${({ theme }) => theme.colors.white};

  overflow: auto;

  background-color: transparent;
  outline: none;
  border: none;
`;
