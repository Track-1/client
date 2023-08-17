import styled from "styled-components";

interface CommentProfileContainerProp {
  vocalProfileImage: string;
}

export default function CommentProfileContainer(props: CommentProfileContainerProp) {
  const { vocalProfileImage } = props;

  return (
    <ProfileImageWrapper>
      <PlayerBlurWrapper>
        <PlayerBlur>
          <ProfileImage src={vocalProfileImage} />
        </PlayerBlur>
        {/* {play?<PlayBtnIcon />:<PauseButtonIcon/>} */}
      </PlayerBlurWrapper>
    </ProfileImageWrapper>
  );
}

const PlayerBlurWrapper = styled.div`
  /* height: 9rem;
  width: 9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer; */
`;

const PlayerBlur = styled.div`
  height: 9rem;
  width: 9rem;

  position: relative;
  /* background-color: rgb(0, 0, 0, 0.5);
  backdrop-filter: blur(0.6rem);
  -webkit-filter: blur(0.6rem); */
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;

  position: absolute;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;

  &:hover {
    backdrop-filter: blur(0.6rem);
  }

  cursor: pointer;
`;

const ProfileImageWrapper = styled.div`
  height: 9rem;
  width: 9rem;

  border-radius: 9rem;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  overflow: hidden;

  margin-left: 3rem;
`;
