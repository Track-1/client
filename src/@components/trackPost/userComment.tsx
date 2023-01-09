import styled from "styled-components";
import { AddCommentIc, CloseBtnIc, CommentBtnIc } from "../../assets";
import CommentWrite from "./commentWrite";
import EachUseComment from "./eachUserComment";
import comments from "../../core/trackPost/userComments";
import { useState } from "react";
import { UploadDataType } from "../../type/uploadDataType";
import { useMutation, useQuery } from "react-query";
import { getComment, postComment } from "../../core/api/trackPost";

interface CommentPropsType{
  closeComment:any;
  beatId:number;
}

export default function UserComment(props: CommentPropsType) {
  const { closeComment, beatId } = props;
  const [uploadData, setUploadData] = useState<UploadDataType>({
    text: "",
    file: null,
  });
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  function uploadComment() {
    setIsCompleted(true);
  }

  function getUploadData(text: string, audioFile: File | null) {
    setUploadData({
      text: text,
      file: audioFile,
    });
  }

  const { data } = useQuery(["beatId",beatId], ()=>getComment(beatId)
  , {
    refetchOnWindowFocus: false, 
    retry: 0, 
    onSuccess: data => {
      if (data?.status === 200) {
        console.log(data);
        console.log("성공");
        setUploadData(data?.data.data.commentList)
      }    
    },
    onError: error => {
      console.log("실패");
    }
  });

  return (
    <CommentContainer>
      <CloseCommentBtn>
        <CloseBtnIc onClick={closeComment} />
      </CloseCommentBtn>
      <CommentWrite getUploadData={getUploadData} isCompleted={isCompleted} />
      <AddWrapper>
        <div></div>
        <AddCommentIcon onClick={uploadComment} />
      </AddWrapper>
      {comments.map((data, index) => {
        // data.isMe ? : merge할 때 분기처리
        return <EachUseComment key={index} data={data} />;
      })}
      <BlurSection />
    </CommentContainer>
  );
}

const CommentContainer = styled.section`
  width: 107.7rem;
  float: right;

  background-color: rgba(13, 14, 17, 0.75);
  backdrop-filter: blur(1.5rem);

  padding-left: 6.5rem;
  padding-top: 6.1rem;
  padding-right: 7.5rem;

  position: absolute;
  top: 0;
  right: 0;
`;

const CloseCommentBtn = styled.div`
  width: 19.8rem;

  display: flex;
  flex-direction: column;

  margin-bottom: 2.7rem;
`;

const CloseText = styled.strong`
  ${({ theme }) => theme.fonts.id};

  color: ${({ theme }) => theme.colors.white};

  margin-left: 0.5rem;
`;

const CommentBtnIcon = styled(CommentBtnIc)`
  height: 2rem;
  width: 100%;
`;

const AddWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
`;

const AddCommentIcon = styled(AddCommentIc)`
  margin-top: 1.9rem;
  margin-bottom: 1.4rem;
`;

const BlurSection = styled.div`
  height: 32rem;
  width: 101.1rem;

  background: linear-gradient(360deg, #000000 27.81%, rgba(0, 0, 0, 0) 85.65%);

  bottom: 0;
  right: 0;
  position: sticky;
`;
