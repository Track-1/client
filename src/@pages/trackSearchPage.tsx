import styled from "styled-components";
import Filter from "../@components/@common/filter";
import Player from "../@components/@common/player";
import TrackList from "../@components/trackSearch/trackList";
import { PlayerProvider } from "../context/playerContext";
import UploadButtonModal from "../@components/trackSearch/uploadButtonModal";
import { UploadButtonIc } from "../assets";
import useModal from "../hooks/common/useModal";
import Header from "../@components/@common/header";
import TrackSearchHeader from "../@components/trackSearch/trackSearchHeader/trackSearchHeader";

const Wrapper = styled.section`
  display: flex;
  justify-content: space-around;
`;

const UploadButtonIcon = styled(UploadButtonIc)`
  position: fixed;
  top: 81.3rem;
  left: 7.5rem;
  width: 24.6rem;
`;

export default function TrackSearchPage() {
  const { openModal, showModal, unShowModal } = useModal();

  function moveUploadPage() {
    openModal ? unShowModal() : showModal();
    // setShowPlayer(false);
    // pausesPlayerAudio();
    // blockAccess()
    //   ? navigate("/login")
    //   : userType === "producer"
    //   ? setOpenModal(true)
    //   : alert("Please use this function after producer logging in.\n해당 기능은 프로듀서로 로그인 후 이용해주세요.");
  }

  return (
    <>
      <Header homeLogo>
        <TrackSearchHeader />
      </Header>
      <Wrapper>
        <PlayerProvider>
          <Filter pageType="tracks" />
          <UploadButtonIcon onClick={moveUploadPage} />
          {openModal && <UploadButtonModal />}
          <TrackList />
          <Player />
        </PlayerProvider>
      </Wrapper>
    </>
  );
}
