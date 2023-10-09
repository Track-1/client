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
