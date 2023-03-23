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
    audioFile: null,
    fileName:"",
  });

  // const [isCompleted, setIsCompleted] = useRecoilState<boolean>(postIsCompleted);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const [isUpdated, setIsUpdated]=useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [audioFile, setAudioFile] = useState(null);
 // const [isEnd, setIsEnd] = useState<boolean>(false);

  // const [content, setContent] = useRecoilState<string>(postContent);
  // const [audioFile, setAudioFile] = useRecoilState(postWavFile);
 const [isEnd, setIsEnd] = useRecoilState<boolean>(endPost);
  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const [commentId, setCommentId]=useState<number>(0);

  const { progress, audio, playPlayerAudio, pausesPlayerAudio } = usePlayer();
  //get
  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["comments", getUploadData, isEnd],
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
  const { mutate:post } = useMutation(()=>postComment(uploadData, beatId), {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
      setContent("");
      setAudioFile(null);
      setIsCompleted(false);
      setIsEnd(false)
      console.log("포스트성공")
    },
  });

  const queryClient = useQueryClient();

  useEffect(() => {
      post();
      console.log("포스트시작")
  }, [isCompleted]);
 //post end

// console.log(uploadData)
 //update
 const { mutate:update } = useMutation(()=>updateComment(uploadData, commentId), {
  onSuccess: () => {
    queryClient.invalidateQueries("comments");
    console.log("성공")
    setIsUpdated(false)
  },
});

useEffect(() => {
  update();
  console.log("지나감2")
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

  async function getData(page: number) {
    if (hasNextPage !== false) {
      const response = await getComment(page, beatId);
      // setComments((prev) => (prev ? [...prev, ...response] : [...response]));
      setComments([...response]);
      return { response, nextPage: page + 1 };
    }
  }

  function getUploadData(text: string, audioFile: File | null, fileName:string) {
    setUploadData({
      content: text,
      audioFile: audioFile,
      fileName: fileName,
    });
  }

  function uploadComment() {
    setIsCompleted(!isCompleted);
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
          <CommentWrite getUploadData={getUploadData} isCompleted={isCompleted} setIsCompleted={setIsCompleted} content={content} audioFile={audioFile} />
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
