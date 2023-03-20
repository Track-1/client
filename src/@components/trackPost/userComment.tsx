import styled from "styled-components";
import { AddCommentIc, CloseBtnIc, ClosedAddCommentIc } from "../../assets";
import CommentWrite from "./commentWrite";
import EachUserComment from "./eachUserComment";
import { useEffect, useState } from "react";
import { UploadDataType } from "../../type/uploadDataType";

import { useMutation, useQueryClient, useInfiniteQuery } from "react-query";
import { getComment } from "../../core/api/trackPost";
import { UserCommentType } from "../../type/userCommentsType";
import { postComment } from "../../core/api/trackPost";
import { useRecoilState } from "recoil";
import { endPost, postContent, postIsCompleted, postWavFile } from "../../recoil/postIsCompleted";
import { playMusic, showPlayerBar } from "../../recoil/player";
import Player from "../@common/player";
import useInfiniteScroll from "../../utils/hooks/useInfiniteScroll";
import usePlayerInfos from "../../utils/hooks/usePlayerInfos";
import usePlayer from "../../utils/hooks/usePlayer";

interface PropsType {
  closeComment: () => void;
  beatId: number;
  isClosed:boolean |undefined;
}

export default function UserComment(props: PropsType) {
  const { closeComment, beatId, isClosed } = props;

  const [comments, setComments] = useState<UserCommentType[]>();
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  const [currentAudioFile, setCurrentAudioFile] = useState<string>("");
  const [uploadData, setUploadData] = useState<UploadDataType>({
    content: "",
    wavFile: null,
  });

  const [isCompleted, setIsCompleted] = useRecoilState<boolean>(postIsCompleted);
  const [content, setContent] = useRecoilState<string>(postContent);
  const [wavFile, setWavFile] = useRecoilState(postWavFile);
  const [isEnd, setIsEnd] = useRecoilState<boolean>(endPost);
  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);

  const { progress, audio, playPlayerAudio, pausesPlayerAudio } = usePlayer();

  //get
  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    "comments",
    ({ pageParam = 1 }) => getData(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.response.length !== 0 ? lastPage?.nextPage : undefined;
      },
    },
  );
  const { audioInfos } = usePlayerInfos(clickedIndex, data?.pages[0]?.response[clickedIndex], "comment");
  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);
  // get end

  //post
  const { mutate } = useMutation(postComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("beatId");
      setContent("");
      setWavFile(null);
      setIsCompleted(false);
      setIsEnd(false);
    },
  });

  const queryClient = useQueryClient();
  //post end

  useEffect(() => {
    if (content && wavFile) {
      let formData = new FormData();
      formData.append("wavFile", wavFile);
      formData.append("content", content);
      mutate(formData);
    }
  }, [isCompleted]);

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

  async function getData(page: number) {
    if (hasNextPage !== false) {
      const response = await getComment(page, beatId);
      setComments((prev) => (prev ? [...prev, ...response] : [...response]));
      return { response, nextPage: page + 1 };
    }
  }

  function getUploadData(text: string, audioFile: File | null) {
    setUploadData({
      content: text,
      wavFile: audioFile,
    });
  }

  function uploadComment() {
    setIsCompleted(true);
  }

  function clickComment(index: number) {
    setClickedIndex(index);
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

            {!isClosed?<AddCommentIcon onClick={uploadComment} />:<ClosedAddCommentIcon/>}
          </AddWrapper>
        </form>

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
  margin-top: 1.9rem;
  margin-bottom: 1.4rem;

  cursor: pointer;
`;

const ClosedAddCommentIcon = styled(ClosedAddCommentIc)`
  margin-top: 1.9rem;
  margin-bottom: 1.4rem;
`;

const BlurSection = styled.div`
  height: 32rem;
  width: 107.7rem;

  background: linear-gradient(360deg, #000000 27.81%, rgba(0, 0, 0, 0) 85.65%);
  bottom: 0;
  position: sticky;

  padding-left: 7.5rem;
`;

const InfiniteWrapper = styled.div`
  width: 100%;
  height: 2rem;
`;
