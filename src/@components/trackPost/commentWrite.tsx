import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FileUploadButtonIc, UploadIc } from "../../assets";
import { useRecoilState, useRecoilValue } from "recoil";
import { endPost, postContentLength } from "../../recoil/postIsCompleted";
import { LoginUserImg } from "../../recoil/loginUserData";
import { isLogin } from "../../utils/common/isLogined";
import defaultImage from "../../assets/image/commentDefaultImg.png";

interface PropsType {
  getUploadData: (content: string, audioFile: File | null, fileName: string) => any;
  isCompleted: boolean;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  comments: any;
}

export default function CommentWrite(props: PropsType) {
  const { getUploadData, isCompleted, comments } = props;

  const commentText = useRef<HTMLTextAreaElement | null>(null);
  const commentFile = useRef<HTMLInputElement | null>(null);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("file_upload.mp3");

  const [commentLength, setCommentLength] = useRecoilState<number>(postContentLength);

  const imgSrc = useRecoilValue(LoginUserImg);
  const [isEnd, setIsEnd] = useRecoilState<boolean>(endPost);

  const [ing, setIng] = useState<boolean>(false);

  useEffect(() => {
    const currentText = commentText.current!.value;

    getUploadData(currentText, uploadedFile, fileName);
  }, [ing]);

  function changeCommentLength(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const currentLength = e.target.value.length;
    setCommentLength(currentLength);
    setIng(!ing);
  }

  function getFile(e: React.ChangeEvent<HTMLInputElement>) {
    const currentFile = e.target.files && e.target.files[0];
    currentFile && setUploadedFile(currentFile);
    currentFile && changeFileName(currentFile.name);
    setIng(!ing);
  }

  function changeFileName(fileName: string) {
    setFileName(fileName);
  }

  useEffect(() => {
    if (commentFile.current !== null) {
      commentFile.current.value = "";
      setFileName("file_upload.mp3");
    }
    if (commentText.current !== null) {
      commentText.current.value = "";
    }
  }, [comments]);

  return (
    <form>
      <WriteContainer>
        <ImageContainer>
          <ProfileImageWrapper>
            {isLogin() ? (
              <ProfileImage src={imgSrc} alt="프로필 이미지" />
            ) : (
              <ProfileImage src={defaultImage} alt="프로필 이미지" />
            )}
          </ProfileImageWrapper>
        </ImageContainer>
        <InfoBox>
          <TitleWrapper>
            <InputTitle>{fileName}</InputTitle>
            <label htmlFor="userFile">
              <div>
                <FileUploadButtonIcon />
              </div>
            </label>
            <FileInput
              type="file"
              accept=".mp3, .wav"
              id="userFile"
              className="file"
              onChange={getFile}
              ref={commentFile}
            />
            <CountWrapper>
              <InputCount commentLength={commentLength}>
                {commentLength}
                <p>/ 150</p>
              </InputCount>
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
    </form>
  );
}

const WriteContainer = styled.article`
  display: flex;

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

const ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 9rem;
  height: 9rem;
  border-radius: 9rem;
  position: absolute;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  margin-top: -9rem;
  margin-left: 3rem;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;

  position: absolute;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 12rem;
`;

const TitleWrapper = styled.div`
  height: 2.5rem;
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

const CountWrapper = styled.div`
  display: flex;

  color: ${({ theme }) => theme.colors.gray3};

  ${({ theme }) => theme.fonts.description}

  margin-left: 54.1rem;
`;

const InputCount = styled.strong<{ commentLength: number }>`
  display: flex;
  justify-content: flex-end;

  width: 10rem;
  margin-left: -10rem;
  margin-right: 2rem;

  ${({ theme }) => theme.fonts.description}

  color: ${({ commentLength, theme }) => (commentLength === 0 ? theme.colors.gray3 : theme.colors.white)};

  & > p {
    margin-left: 0.5rem;
    color: ${({ theme }) => theme.colors.gray3};
  }
`;

const InputWrapper = styled.div`
  height: 7.9rem;

  margin-top: 1rem;
`;

const InputBox = styled.textarea`
  width: 79rem;

  vertical-align: top;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.description}

  overflow: auto;

  background-color: transparent;
  outline: none;
  border: none;
  resize: none;
`;

const FileUploadButtonIcon = styled(FileUploadButtonIc)`
  width: 4rem;
  margin-left: 1.2rem;

  cursor: pointer;
`;
