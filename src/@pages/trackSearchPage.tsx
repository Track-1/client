import styled from "styled-components";
import Filter from "../@components/@common/filter";
import TrackList from "../@components/trackSearch/trackList";
import UploadButtonModal from "../@components/trackSearch/uploadButtonModal";
import { UploadButtonIc } from "../assets";
import useModal from "../hooks/common/useModal";
import Header from "../@components/@common/header";
import TrackSearchHeader from "../@components/trackSearch/trackSearchHeader/trackSearchHeader";
import { useState } from "react";
import { PageType } from "../type/common/pageType";

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

  const [pageType, setPageType] = useState<PageType>("tracks");

  function changeType(pageType: PageType) {
    setPageType(pageType);
  }

  return (
    <>
      <Header homeLogo>
        <TrackSearchHeader pageType={pageType} changeType={changeType} />
      </Header>
      <Wrapper>
        <Filter pageType="tracks" />
        <UploadButtonIcon onClick={moveUploadPage} />
        {openModal && <UploadButtonModal />}
        <TrackList />
      </Wrapper>
    </>
  );
}
