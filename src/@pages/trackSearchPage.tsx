import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Filter from "../@components/@common/filter";
import Header from "../@components/@common/header";
import Player from "../@components/@common/player";
import TrackList from "../@components/trackSearch/trackList";
import TrackSearchHeader from "../@components/trackSearch/trackSearchHeader/trackSearchHeader";
import UploadButtonModal from "../@components/trackSearch/uploadButtonModal";
import { UploadButtonIc } from "../assets";
import { PlayerProvider } from "../context/playerContext";
import useModal from "../hooks/common/useModal";
import { loginUserType } from "../recoil/common/loginUserData";
import { blockAccess } from "../utils/common/privateRouter";

const Wrapper = styled.section`
  display: flex;
  justify-content: space-around;
`;

const UploadButtonIcon = styled(UploadButtonIc)`
  position: fixed;
  top: 81.3rem;
  left: 7.5rem;
  width: 24.6rem;

  cursor: pointer;
`;

export default function TrackSearchPage() {
  const { openModal, showModal, unShowModal } = useModal();
  const userType = useRecoilValue(loginUserType);
  const navigate = useNavigate();

  function moveUploadPage() {
    blockAccess()
      ? navigate("/login")
      : userType === "producer"
      ? openModal
        ? unShowModal()
        : showModal()
      : alert("Please use this function after producer logging in.\n해당 기능은 프로듀서로 로그인 후 이용해주세요.");
  }

  return (
    <>
      <PlayerProvider>
        <Header homeLogo headerFixed>
          <TrackSearchHeader pageType="tracks" />
        </Header>
        <Wrapper>
          <Filter pageType="tracks" />
          <UploadButtonIcon onClick={moveUploadPage} />
          {openModal && <UploadButtonModal />}
          <TrackList />
          <Player />
        </Wrapper>
      </PlayerProvider>
    </>
  );
}
