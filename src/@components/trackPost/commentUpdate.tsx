import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CommentUpldatCompleteIc, FileUploadButtonIc, UploadIc } from "../../assets";
import { useRecoilState, useRecoilValue } from "recoil";
import { postContentLength, postIsCompleted } from "../../recoil/postIsCompleted";
import { LoginUserImg } from "../../recoil/loginUserData";
import { useMutation, useQueryClient } from "react-query";
import { updateComment } from "../../core/api/trackPost";

interface PropsType {
    getUploadData: (content: string, wavFile: File | null, fileName:string) => any;
    comment:string;
    fileGetName:string;
    isUpdated:boolean;
    setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>
    // commentId:number;
   // setCommentId: React.Dispatch<React.SetStateAction<number>>
}

export default function CommentUpdate(props:PropsType) {
    const { getUploadData, comment, fileGetName, isUpdated, setIsUpdated } = props;

    const commentText = useRef<HTMLTextAreaElement | null>(null);
    const commentFile = useRef<HTMLInputElement | null>(null);
  
    const [editedFile, setEditedFile] = useState<File | null>(null);
    const [editedFileName, setEditedFileName] = useState<string>(fileGetName);
  
    const [commentLength, setCommentLength] = useState<number>(0);
    //const isCompleted = useRecoilValue(postIsCompleted);
    const imgSrc = useRecoilValue(LoginUserImg);

    const [isUpdating, setIsUpdating]=useState<boolean>(false);

    useEffect(() => {
      const currentText = commentText.current!.value;
  
      getUploadData(currentText, editedFile, editedFileName);
      console.log("지나감1")
    }, [isUpdating]);
  
    
    function changeCommentLength(e: React.ChangeEvent<HTMLTextAreaElement>) {
      const currentLength = e.target.value.length;
      setCommentLength(currentLength);
      setIsUpdating(!isUpdating)
    }
  
    function updateFile(e: React.ChangeEvent<HTMLInputElement>) {
      const currentFile = e.target.files && e.target.files[0];
      currentFile && setEditedFile(currentFile);
      currentFile && changeFileName(currentFile.name);
      setIsUpdating(!isUpdating)
    }
  
    function changeFileName(fileName: string) {
        setEditedFileName(fileName);
    }

    function submitUpdateComment(){
        setIsUpdated(true);
    }

    useEffect(()=>{
        fileGetName===""&&setEditedFileName("file_upload.mp3")
    },[])
  
    return (
        <>
      <WriteContainer>
        <ProfileImage
          src={imgSrc}
          alt="프로필 이미지"
        />
        <InfoBox>
          <TitleWrapper>
            <InputTitle>{editedFileName}</InputTitle>
            <label htmlFor="updateFile">
              <div>
                <FileUploadButtonIcon />
              </div>
            </label>
            <FileInput type="file" accept=".mp3, .wav" id="updateFile" onChange={updateFile} ref={commentFile} />
            <CountWrapper>
              <InputCount commentLength={commentLength}>{commentLength}/ 150</InputCount>
            </CountWrapper>
          </TitleWrapper>
          <InputWrapper>
            <InputBox
              defaultValue={comment}
              maxLength={150}
              onChange={changeCommentLength}
              ref={commentText}
            />
          </InputWrapper>
        </InfoBox>
        
      </WriteContainer>
      <CommentUpldatCompleteIcon onClick={submitUpdateComment}/>
      </>
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
    width: 10rem;
    margin-left: -2rem;

    ${({ theme }) => theme.fonts.description}
  
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
    ${({ theme }) => theme.fonts.description}
  
    overflow: auto;
  
    background-color: transparent;
    outline: none;
    border: none;
    resize: none;
  `;
  
const CommentUpldatCompleteIcon=styled(CommentUpldatCompleteIc)`
    width: 13.9rem;

    margin-left: 80rem;
    margin-top: 1.8rem;
`

const FileUploadButtonIcon=styled(FileUploadButtonIc)`
  width: 4rem;
  margin-left: 1.2rem;
`