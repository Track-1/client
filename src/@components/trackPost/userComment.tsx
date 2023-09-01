import { useEffect, useState } from "react";
import styled from "styled-components";
import { AddCommentIc, CloseBtnIc, ClosedAddCommentIc } from "../../assets";
import { UploadDataType } from "../../type/uploadDataType";
import CommentWrite from "./commentWrite";
import EachUserComment from "./eachUserComment";

import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { getComment, postComment, updateComment } from "../../core/api/trackPost";
import { playMusic, showPlayerBar } from "../../recoil/player";
import { endPost, postContentLength } from "../../recoil/postIsCompleted";
import { UserCommentType } from "../../type/userCommentsType";
import { blockAccess } from "../../utils/common/privateRoute";
import useInfiniteScroll from "../../utils/hooks/useInfiniteScroll";
import usePlayer from "../../utils/hooks/usePlayer";
import usePlayerInfos from "../../utils/hooks/usePlayerInfos";
import Loading from "../@common/loading";
import Player from "../@common/player";

interface PropsType {
  closeComment: () => void;
  beatId: number;
  isClosed: boolean | undefined;
  title: string | undefined;
}

export default function UserComment(props: PropsType) {
  const { closeComment, beatId, isClosed, title } = props;

  const [comments, setComments] = useState<UserCommentType[]>();
  // const { key, excuteGetData } = useInfiniteKey();
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
  const [currentPage, setCurrentPage] = useState<number>(0);

  const [clickUpload, setClickUpload] = useState<boolean>(false);
  const [clickPost, setClickPost] = useState<boolean>(false);

  const { progress, audio, playPlayerAudio, pausesPlayerAudio } = usePlayer();
  const [key, setKey] = useState<number>(0);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [commentLength, setCommentLength] = useRecoilState<number>(postContentLength);

  const navigate = useNavigate();

  //get
  const { data, isSuccess, isFetching, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [key],
    async ({ pageParam = 1 }) => await getData(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.nextPage;
      },
      refetchOnWindowFocus: false,
    },
  );

  const { audioInfos } = usePlayerInfos(clickedIndex, comments, "comment");
  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);

  async function getData(page: number) {
    if (hasNextPage !== false) {
      const response = await getComment(page, beatId);
      console.log(response, page, beatId);
      setComments((prev) => (!isDeleted ? (prev ? [...prev, ...response] : [...response]) : [...response]));
      isDeleted && setIsDeleted(false);
      // setCurrentPage(currentPage + 1);
      return { response, nextPage: page + 1 };
    }
  }
  // get end
  //post
  const { mutate: post } = useMutation(() => postComment(uploadData, beatId), {
    onSuccess: () => {
      setComments([]);
      if (clickPost === true) {
        queryClient.invalidateQueries("comments");
        setClickPost(false);
        setComments([]);
        setUploadData((prevState) => {
          return { ...prevState, audioFile: null, content: "", fileName: "" };
        });
        setCommentLength(0);
        // excuteGetData();
        setKey(key + 1);
      } else {
        setClickPost(false);
      }
    },
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    post();
  }, [isCompleted]);
  //post end

  //update
  const { mutate: update } = useMutation(() => updateComment(uploadData, commentId), {
    onSuccess: () => {
      setComments([]);
      if (clickUpload === true) {
        // queryClient.invalidateQueries("comments");
        // setIsEnd(!isEnd);
        // setClickUpload(false);
        // excuteGetData();
        setKey(key + 1);
      } else {
        setClickUpload(false);
      }
    },
  });

  useEffect(() => {
    update();
    setComments([]);
    setIsUpdated(false);
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
    if (blockAccess()) {
      navigate("/login");
    } else {
      if (uploadData.audioFile && uploadData.content.length > 0) {
        setClickPost(true);
        setIsCompleted(!isCompleted);
      }
    }

    //  post()
  }

  function clickComment(index: number) {
    setClickedIndex(index);
  }

  function changeClickUpload() {
    setClickUpload(true);
  }

  function closeCommentPage() {
    closeComment();
    pausesPlayerAudio();
  }

  useEffect(() => {
    if (title) {
      audioInfos.title = title;
    }
  }, [clickedIndex]);

  return (
    <>
      {isLoading && <Loading />}
      <CommentContainer>
        <CloseCommentBtn>
          <CloseBtnIcon onClick={closeCommentPage} />
        </CloseCommentBtn>
        <form>
          <CommentWrite
            getUploadData={getUploadData}
            isCompleted={isCompleted}
            setIsCompleted={setIsCompleted}
            comments={comments}
          />
          <AddWrapper>
            <div></div>

            {!isClosed ? <AddCommentIcon onClick={uploadComment} /> : <ClosedAddCommentIcon />}
          </AddWrapper>
        </form>

        <CommentWriteWrapper onClick={changeClickUpload}>
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
                  setKey={setKey}
                  setIsDeleted={setIsDeleted}
                />
              );
            })}
        </CommentWriteWrapper>
        {comments && <BlurSection commentCnt={comments?.length} />}
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
  height: 100%;
`;

const CommentContainer = styled.section`
  width: 107.7rem;
  height: 100%;
  min-height: 100vh;
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
  cursor: pointer;
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

const BlurSection = styled.div<{ commentCnt: number }>`
  height: 8rem;
  /* width: 107.7rem; */
  width: 100%;
  /* position: relative; */
  background: linear-gradient(360deg, #000000 27.81%, rgba(0, 0, 0, 0) 85.65%);
  position: ${({ commentCnt }) => (commentCnt < 4 ? "fixed" : "sticky")};
  bottom: 0;
  margin-left: -6.5rem;
`;

const InfiniteWrapper = styled.div`
  width: 100%;
  height: 2rem;
`;

const CloseBtnIcon = styled(CloseBtnIc)`
  width: 19.9rem;
`;
