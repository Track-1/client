import styled from "styled-components";

interface CommentProfileContainerProp {
  vocalProfileImage: string;
}

export default function CommentProfileContainer(props: CommentProfileContainerProp) {
  const { vocalProfileImage } = props;
  //   const [play, setPlay] = useRecoilState<boolean>(playMusic);

  return (
    <ProfileImageWrapper>
      <ProfileImageBox>
        <ProfileImage src={vocalProfileImage} />
      </ProfileImageBox>
      {/* {play?<PlayBtnIcon />:<PauseButtonIcon/>} */}
    </ProfileImageWrapper>
  );
}

const ProfileImageBox = styled.div`
  height: 9rem;
  width: 9rem;

  position: relative;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;

  position: absolute;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;

  &:hover {
    filter: blur(0.6rem);
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
