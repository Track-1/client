import { useParams } from "react-router-dom";
import styled from "styled-components";
import useGetVocalProfile from "../../hooks/vocalProfile/useGetVocalProfile";
import BackButton from "../@common/backButton";
import Profile from "../profile";

export default function VocalProfile() {
  const { vocalId } = useParams();
  const { vocalProfile } = useGetVocalProfile(Number(vocalId));

  return (
    <>
      <BackButtonWrapper>
        <BackButton />
      </BackButtonWrapper>
      <Profile userType="vocal" userSelf={vocalProfile?.userSelf} userProfile={vocalProfile?.userProfile} />
    </>
  );
}

const BackButtonWrapper = styled.div`
  margin: 6rem 0 6rem 8rem;
`;
