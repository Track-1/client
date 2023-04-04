import styled from "styled-components";
import { AddCommentIc, CloseBtnIc, ClosedAddCommentIc } from "../../assets";
import CommentWrite from "./commentWrite";
import EachUserComment from "./eachUserComment";
import { useEffect, useState } from "react";
import { UploadDataType } from "../../type/uploadDataType";

import { useMutation, useQueryClient, useInfiniteQuery } from "react-query";
import { getComment, updateComment } from "../../core/api/trackPost";
import { UserCommentType } from "../../type/userCommentsType";
import { postComment } from "../../core/api/trackPost";
import { useRecoilState } from "recoil";
import { endPost, postContent, postIsCompleted, postWavFile } from "../../recoil/postIsCompleted";
import { playMusic, showPlayerBar } from "../../recoil/player";
import Player from "../@common/player";
import useInfiniteScroll from "../../utils/hooks/useInfiniteScroll";
import usePlayerInfos from "../../utils/hooks/usePlayerInfos";
import usePlayer from "../../utils/hooks/usePlayer";
import useInfiniteKey from "../../utils/hooks/useInfiniteKey";

interface PropsType {
  closeComment: () => void;
  beatId: number;
  isClosed: boolean | undefined;
}

export default function UserComment(props: PropsType) {
  const { closeComment, beatId, isClosed } = props;

  const [comments, setComments] = useState<UserCommentType[]>();
  const { key, excuteGetData } = useInfiniteKey();
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  const [currentAudioFile, setCurrentAudioFile] = useState<string>("");
  const [uploadData, setUploadData] = useState<UploadDataType>({
    content: "",
    audioFile: null,
    fileName: "",
  });

  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [audioFile, setAudioFile] = useState(null);
  const [isEnd, setIsEnd] = useRecoilState<boolean>(endPost);
  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const [commentId, setCommentId] = useState<number>(0);
  const [startUpload, setStartUpload] = useState<boolean>(false);
  const [startUpdate, setStartUpdate] = useState<boolean>(false);

  const [clickUpload, setClickUpload] = useState<boolean>(false);
  const [clickPost, setClickPost] = useState<boolean>(false);

  const { progress, audio, playPlayerAudio, pausesPlayerAudio } = usePlayer();

  //get
  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [key, getUploadData, isEnd],
    ({ pageParam = 1 }) => getData(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        // console.log(key);
        return lastPage?.response.length !== 0 ? lastPage?.nextPage : undefined;
      },
      refetchOnWindowFocus: false,
    },
  );

  console.log(isEnd);
  console.log(key);
  console.log(getUploadData);

  const { audioInfos } = usePlayerInfos(clickedIndex, data?.pages[0]?.response[clickedIndex], key);
  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);

  async function getData(page: number) {
    if (hasNextPage !== false) {
      const response = await getComment(page, beatId);
      setComments((prev) => (prev ? [...prev, ...response] : [...response]));
      return { response, nextPage: page + 1 };
    }
  }
  // get end
  //post
  const { mutate: post } = useMutation(() => postComment(uploadData, beatId), {
    onSuccess: () => {
      console.log(uploadData);
      if (clickPost === true) {
      queryClient.invalidateQueries("comments");
      setContent("");
      setAudioFile(null);
      //  setIsCompleted(false);
      console.log(clickPost);
        setIsEnd(!isEnd);
        setComments([]);
        setClickPost(false);
        setClickPost(false);
        setStartUpload(false);
        console.log("포스트성공");
        console.log(content);
        console.log(comments);
        setComments([]);
      } else {
        setClickPost(false);
      }
    },
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    post();
    console.log("포스트시작");
  }, [isCompleted]);
  //post end

  //update
  const { mutate: update } = useMutation(() => updateComment(uploadData, commentId), {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
      console.log("댓글성공");
      if (clickUpload === true) {
        setIsEnd(!isEnd);
        excuteGetData();
      } else {
        setClickUpload(false);
      }
      setClickUpload(false);
      setIsUpdated(false);
      setComments([]);
    },
  });

  useEffect(() => {
    update();
    console.log("지나감2");
  }, [isUpdated]);
  //update end

  useEffect(() => {
    if (comments) {
      audio.src = comments[clickedIndex].vocalWavFile;
      setCurrentAudioFile(comments[clickedIndex].vocalWavFile);
    }
  }, [clickedIndex]);

  useEffect(() => {
    if (currentAudioFile) {
      playPlayerAudio();
    }
  }, [currentAudioFile]);

  function getUploadData(text: string, audioFile: File | null, fileName: string) {
    setUploadData({
      content: text,
      audioFile: audioFile,
      fileName: fileName,
    });
  }

  function uploadComment() {
    setClickPost(true);
    setIsCompleted(!isCompleted);
    setStartUpload(true);
    console.log(key);
    console.log(key);

    //  post()
  }

  function clickComment(index: number) {
    setClickUpload(true);
    setClickedIndex(index);
  }

  return (
    <>
      <CommentContainer>
        <StickyContainer>
          <CloseCommentBtn>
            <CloseBtnIcon onClick={closeComment} />
          </CloseCommentBtn>
          <Form>
            <CommentWrite
              getUploadData={getUploadData}
              isCompleted={isCompleted}
              setIsCompleted={setIsCompleted}
              content={content}
              audioFile={audioFile}
            />
            <AddWrapper>
              <div></div>

              {!isClosed ? <AddCommentIcon onClick={uploadComment} /> : <ClosedAddCommentIcon />}
            </AddWrapper>
          </Form>
        </StickyContainer>

        <CommentWriteWrapper>
          {comments &&
            comments.map((data, index) => {
              return (
                <EachUserComment
                  key={index}
                  commentInfo={data}
                  audio={audio}
                  clickedIndex={clickedIndex}
                  clickComment={clickComment}
                  pauseAudio={pausesPlayerAudio}
                  currentIndex={index}
                  isMe={comments[index].isMe}
                  getUploadData={getUploadData}
                  isUpdated={isUpdated}
                  setIsUpdated={setIsUpdated}
                  setCommentId={setCommentId}
                />
              );
            })}
        </CommentWriteWrapper>
        <BlurSection />
        <InfiniteWrapper ref={observerRef}></InfiniteWrapper>
      </CommentContainer>
      {showPlayer && (
        <Player
          audio={audio}
          playAudio={playPlayerAudio}
          pauseAudio={pausesPlayerAudio}
          progress={progress}
          audioInfos={audioInfos}
          play={play}
          setPlay={setPlay}
        />
      )}
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
  /*padding-top: 6.1rem;*/
  padding-right: 7.5rem;
  position: sticky;
  z-index: 1;
  top: 0;
  right: 0;
`;

const StickyContainer = styled.div`
  z-index: inherit;
  background-color: rgb(13, 14, 17);
  position: sticky;
  top: 0;
`;

const CloseCommentBtn = styled.div`
  width: 19.8rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 2.7rem;
  padding-top: 6.1rem;
  cursor: pointer;
`;

const Form = styled.form`
  top: 15rem;
`;

const AddWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const AddCommentIcon = styled(AddCommentIc)`
  width: 19.9rem;
  margin-top: 1.9rem;
  margin-bottom: 1.4rem;

  cursor: pointer;
`;

const ClosedAddCommentIcon = styled(ClosedAddCommentIc)`
  width: 19.9rem;
  margin-top: 1.9rem;
  margin-bottom: 1.4rem;
`;

const BlurSection = styled.div`
  height: 56rem;
  width: 107.7rem;

  /* position: relative; */

  background: linear-gradient(360deg, #000000 27.81%, rgba(0, 0, 0, 0) 85.65%);
  bottom: 0;
  position: sticky;

  padding-left: 7.5rem;
`;

const InfiniteWrapper = styled.div`
  width: 100%;
  height: 2rem;
  background-color: pink;
`;

const CloseBtnIcon = styled(CloseBtnIc)`
  width: 19.9rem;
`;
