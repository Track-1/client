import styled from "styled-components";
import { AddCommentIc, CloseBtnIc, CommentBtnIc } from "../../assets";
import CommentWrite from "./commentWrite";
import EachUseComment from "./eachUserComment";
// import comments from "../../core/trackPost/userComments";
import { useCallback, useEffect, useState, useMemo } from "react";
import { UploadDataType } from "../../type/uploadDataType";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { getComment } from "../../core/api/trackPost";
import { UserCommentType } from "../../type/userCommentsType";
import axios from "axios";
import { postComment } from "../../core/api/trackPost";
import { useRecoilState, useRecoilValue } from "recoil";
import { endPost, postContent, postContentLength, postIsCompleted, postWavFile } from "../../recoil/postIsCompleted";
import { playMusic, showPlayerBar } from "../../recoil/player";
import Player from "../@common/player";

interface CommentPropsType {
  closeComment: any;
  beatId: number;
}

export default function UserComment(props: CommentPropsType) {
  const { closeComment, beatId } = props;

  const [isCompleted, setIsCompleted] = useRecoilState<boolean>(postIsCompleted);
  const [comments, setComments] = useState<UserCommentType[]>();
  const [uploadData, setUploadData] = useState<UploadDataType>({
    content: "",
    wavFile: null,
  });
  const contentLength = useRecoilValue(postContentLength);
  const [content, setContent] = useRecoilState<string>(postContent);
  const [wavFile, setWavFile] = useRecoilState(postWavFile);
  const [isEnd, setIsEnd] = useRecoilState<boolean>(endPost);

  const audio = useMemo(() => new Audio(), []);

  // const [play, setPlay] = useRecoilState<boolean>(playMusic);
  // const [progress, setProgress] = useState<number>(0);
  // const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const [duration, setDuration] = useState<number>(0);
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  const [hoveredIndex, setHoneredIndex] = useState<number>(-1);

  function getUploadData(text: string, audioFile: File | null) {
    setUploadData({
      content: text,
      wavFile: audioFile,
    });
  }

  //get
  const { data } = useQuery(["beatId", beatId], () => getComment(beatId), {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      if (data?.status === 200) {
        // console.log(data);
        // console.log("성공");
        setComments(data?.data.data.commentList);
      }
    },
    onError: (error) => {
      console.log("실패");
    },
  });

  //post
  function uploadComment(uploadData: UploadDataType) {
    setIsCompleted(true);
    console.log("1");
  }

  useEffect(() => {
    if (content && wavFile) {
      // if(uploadData.content&&uploadData.wavFile){
      console.log("2");

      let formData = new FormData();
      formData.append("wavFile", wavFile);
      formData.append("content", content);

      mutate(formData);
    }
  }, [isCompleted]);

  const queryClient = useQueryClient();

  const { mutate } = useMutation(postComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("beatId");
      setUploadData({
        content: "",
        wavFile: null,
      });
      setContent("");
      setWavFile(null);
      setIsCompleted(false);
      setIsEnd(false);
    },
  });

  function clickComment(index: number) {
    setClickedIndex(index);
  }

  function hoverComment(index: number) {
    setHoneredIndex(index);
  }

  function getDuration(durationTime: number) {
    setDuration(durationTime);
  }

  return (
    <>
      <CommentContainer>
        <CloseCommentBtn>
          <CloseBtnIc onClick={closeComment} />
        </CloseCommentBtn>
        <form>
          <CommentWrite getUploadData={getUploadData} />
          <AddWrapper>
            <div></div>

            <AddCommentIcon onClick={() => uploadComment(uploadData)} />
          </AddWrapper>
        </form>

        <CommentWriteWrapper>
          {comments &&
            comments.map((data, index) => {
              return (
                <EachUseComment
                  key={index}
                  data={comments[index]}
                  audio={audio}
                  clickedIndex={clickedIndex}
                  hoveredIndex={hoveredIndex}
                  clickComment={clickComment}
                  hoverComment={hoverComment}
                  index={index}
                  comment={data}
                />
              ); //여기가 각각의 데이터
            })}
          <BlurSection />
        </CommentWriteWrapper>
      </CommentContainer>
    </>
  );
}

const CommentWriteWrapper = styled.div`
  /* position: fixed; */
`;

const CommentContainer = styled.section`
  width: 107.7rem;
  float: right;

  background-color: rgba(13, 14, 17, 0.75);
  backdrop-filter: blur(1.5rem);

  padding-left: 6.5rem;
  padding-top: 6.1rem;
  padding-right: 7.5rem;

  position: sticky;
  z-index: 1;
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
