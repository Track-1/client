import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Player from "../@components/@common/player";
import TracksProfileUploadModal from "../@components/@common/tracksProfileUploadModal";
import VocalProfileList from "../@components/vocalProfile/vocalProfileList";
import VocalProfileShadow from "../@components/vocalProfile/vocalProfileShadow";
import { Category } from "../core/common/categoryHeader";
import { showPlayerBar } from "../recoil/player";
import { tracksOrVocalsCheck } from "../recoil/tracksOrVocalsCheck";
import { uploadButtonClicked } from "../recoil/uploadButtonClicked";
import { Category } from "../core/common/categoryHeader";

export default function VocalProfilePage() {
  const showPlayer = useRecoilValue<boolean>(showPlayerBar);
  const [whom, setWhom] = useRecoilState(tracksOrVocalsCheck);
  const [visible, setVisible] = useRecoilState<boolean>(uploadButtonClicked);

  setWhom(Category.VOCALS);

  return (
    <>
      {visible && <TracksProfileUploadModalSection />}
      {/* {showPlayer && <Player />} */}
      <VocalProfilePageWrapper>
        <VocalProfile>보컬프로필 부분넣어주세요</VocalProfile>

        <VocalProfileWrapper>
          <VocalProfileList />
          <VocalProfileShadow />
        </VocalProfileWrapper>
      </VocalProfilePageWrapper>
    </>
  );
}

const TracksProfileUploadModalSection = styled(TracksProfileUploadModal)`
  position: absolute;
  z-index: 100;
`;

const VocalProfilePageWrapper = styled.section`
  display: flex;
`;

const VocalProfileWrapper = styled.article`
  display: flex;
`;

const VocalProfile = styled.article`
  width: 60rem;
  background-color: white;

  font-size: 5rem;
`;
