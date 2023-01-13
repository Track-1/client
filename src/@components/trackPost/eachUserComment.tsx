import { useState } from "react";
import styled from "styled-components";
import { PlayBtnIc } from "../../assets";
import profileDummyImg from "../../assets/image/profileDummyImg.png";
import { UserCommentType } from "../../type/userCommentsType";

interface dataType {
  data: UserCommentType;
}

export default function EachUserComment(props: dataType) {
  const { data } = props;
  const [isHover, setIsHover] = useState<boolean>(false);

  function changeHoverTrue() {
    setIsHover(true);
  }

  function changeHoverFalse() {
    setIsHover(false);
  }

  return (
    <CommentContainer onMouseOver={changeHoverTrue} onMouseOut={changeHoverFalse}>
      <ProfileImage img={data.vocalProfileImage}>
        {isHover && (
          <PlayerBlur>
            <PlayBtnIc />
          </PlayerBlur>
        )}
      </ProfileImage>
      <InfoBox>
        <UserName>{data.vocalName}</UserName>
        <CommentText>{data.comment}</CommentText>
      </InfoBox>
    </CommentContainer>
  );
}

const CommentContainer = styled.article`
  position: relative;
  height: 14.2rem;

  display: flex;
  align-items: center;

  &:hover {
    border: 0.2rem solid transparent;
    border-top-left-radius: 11.7rem;
    border-bottom-left-radius: 11.7rem;
    background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
      linear-gradient(to right, ${({ theme }) => theme.colors.sub2}, ${({ theme }) => theme.colors.sub3});
    background-origin: border-box;
    background-clip: content-box, border-box;
  }
`;

const ProfileImage = styled.div<{ img: string }>`
  height: 9rem;
  width: 9rem;

  margin-right: 2rem;
  margin-left: 3.8rem;

  border-radius: 9rem;

  background-image: url(${({ img }) => img});
  background-repeat: no-repeat;
  background-size: contain;
`;

const PlayerBlur = styled.div`
  height: 9rem;
  width: 9rem;

  background-color: rgb(0, 0, 0, 0.5);
  backdrop-filter: blur(0.6rem);
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.strong`
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.hashtag}
`;

const CommentText = styled.strong`
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.description}

  margin-top: 1.2rem;
`;
