import { useRecoilState } from "recoil";
import styled from "styled-components";
import CategoryHeader from "../@components/@common/categoryHeader";
import CategoryList from "../@components/@common/categoryList";
import TrackListHeader from "../@components/trackSearch/trackListHeader";
import VocalList from "../@components/vocalSearch/vocalList";
import { tracksOrVocalsCheck } from "../recoil/tracksOrVocalsCheck";

export default function VocalsPage() {
  const [whom, setWhom] = useRecoilState(tracksOrVocalsCheck);

  setWhom("Vocals"); // 나중에 헤더에서 클릭했을 때도 변경되도록 구현해야겠어요

  return (
    <>
      <CategoryHeader />

      <VocalSearchPageWrapper>
        <CategoryListWrapper>
          <CategoryList />
        </CategoryListWrapper>

        <VocalListWrapper>
          <TrackListHeader />
          <VocalList />
        </VocalListWrapper>
      </VocalSearchPageWrapper>
    </>
  );
}

const VocalSearchPageWrapper = styled.div`
  display: flex;
`;
const CategoryListWrapper = styled.div`
  width: 32.1rem;
`;
const VocalListWrapper = styled.div`
  width: 159.9rem;
`;
