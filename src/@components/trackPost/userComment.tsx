import styled from "styled-components";
import { AddCommentIc, CloseBtnIc, CommentBtnIc } from "../../assets";
import CommentWrite from "./commentWrite";
import EachUseComment from "./eachUserComment";
// import comments from "../../core/trackPost/userComments";
import { useCallback, useEffect, useState } from "react";
import { UploadDataType } from "../../type/uploadDataType";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getComment } from "../../core/api/trackPost";
import {UserCommentType} from '../../type/userCommentsType'
import axios from "axios";
import{postComment} from '../../core/api/trackPost'

interface CommentPropsType{
  closeComment:any;
  beatId:number;
}

export default function UserComment(props: CommentPropsType) {
  const { closeComment, beatId } = props;
  const [isCompleted, setIsCompleted] = useState<boolean>(true);
  const [comments, setComments]=useState<UserCommentType[]>()
  const [uploadData, setUploadData] = useState<UploadDataType>({
    content: "",
    wavFile: null,
  });

  function getUploadData(text: string, audioFile: File | null) {
    setUploadData({
      content: text,
      wavFile: audioFile,
    });
  }

  //get
  const { data } = useQuery(["beatId",beatId], ()=>getComment(beatId)
  , {
    refetchOnWindowFocus: false, 
    retry: 0, 
    onSuccess: data => {
      if (data?.status === 200) {
        // console.log(data);
        // console.log("성공");
        setComments(data?.data.data.commentList)
      }    
    },
    onError: error => {
      console.log("실패");
    }
  });

  //post
  function uploadComment(){
    setIsCompleted(true);
    console.log("클릭됨")
    if(uploadData.content&&uploadData.wavFile){      
      mutate(uploadData)
    }
  } 
  // useEffect(()=>{
  //   if(uploadData.content&&uploadData.wavFile){      
  //     mutate(uploadData)
  //   }
  // },[isCompleted])
  
  const queryClient = useQueryClient();

  const {mutate} = useMutation(postComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("beatId");
      setUploadData({
        content: "",
        wavFile: null,
      });
      getUploadData("", null)
      setIsCompleted(false)
    
      console.log("성공")      
    }
  });

  useEffect(()=>{
    if(uploadData.content&&uploadData.wavFile){      
      console.log(uploadData.wavFile)
    }
  },[uploadData])

  return (
    <CommentContainer>
      <CloseCommentBtn>
        <CloseBtnIc onClick={closeComment} />
      </CloseCommentBtn>
 
      <CommentWrite getUploadData={getUploadData} isCompleted={isCompleted}/>
      <AddWrapper>
        <div></div>
        <AddCommentIcon onClick={uploadComment} />
      </AddWrapper>                                  
    
      {comments&&comments.map((data, index) => {
        return <EachUseComment key={index} data={comments[index]}/>; //여기가 각각의 데이터
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
