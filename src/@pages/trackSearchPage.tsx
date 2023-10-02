import styled from "styled-components";
import Filter from "../@components/@common/filter";
import TrackList from "../@components/trackSearch/trackList";
import UploadButtonModal from "../@components/trackSearch/uploadButtonModal";
import { UploadButtonIc } from "../assets";
import useModal from "../hooks/common/useModal";

const Wrapper = styled.section`
  display: flex;
  justify-content: space-around;
`;

const UploadButtonIcon = styled(UploadButtonIc)`
  position: absolute;

  width: 24.6rem;
  top: 67rem;
  left: 7.5rem;
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
    <Wrapper>
      <Filter pageType="tracks" />
      <UploadButtonIcon onClick={moveUploadPage} />
      {openModal && <UploadButtonModal />}
      <TrackList />
    </Wrapper>
  );
}
