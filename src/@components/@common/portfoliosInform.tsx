import styled from "styled-components";
import { PortfolioPropsType } from "../../type/profilePropsType";
import {
  VocalPortfolioTitleTextIc,
  ProducerPortfolioTitleTextIc,
  UploadButtonIc,
  EllipsisIc,
  BlankIc,
  UploadButtonBlankIc,
} from "../../assets";
import { useRecoilState, useRecoilValue } from "recoil";
import { tracksOrVocalsCheck } from "../../recoil/tracksOrVocalsCheck";
import { useEffect, useRef, useState } from "react";
import PortfolioUpdateModal from "./portfolioUpdateModal";
import PortfoiloViewMoreButton from "./portfoiloViewMoreButton";
import { useNavigate } from "react-router-dom";
import { uploadButtonClicked } from "../../recoil/uploadButtonClicked";
import { isClickedOutside } from "../../utils/common/modal";
import { isTracksPage, isVocalsPage } from "../../utils/common/pageCategory";
import { profileCategory } from "../../core/constants/pageCategory";

export default function PortfoliosInform(props: PortfolioPropsType) {
  const { isMe, hoverId, clickId, profileState, portfolios } = props;

  const tracksOrVocals = useRecoilValue(tracksOrVocalsCheck);
  const [openUploadModal, setOpenUploadModal] = useRecoilState<boolean>(uploadButtonClicked);

  const ellipsisModalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [id, setId] = useState<number>(-1);
  const [openEllipsisModal, setOpenEllipsisModal] = useState<boolean>(false);

  useEffect(() => {
    function closeModal(e: MouseEvent) {
      isClickedOutside(e, ellipsisModalRef) && setOpenEllipsisModal(false);
    }

    document.addEventListener("mousedown", closeModal);
    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, [openEllipsisModal]);

  function clickEllipsis() {
    setOpenEllipsisModal(true);
  }

  function clickUploadButton() {
    isTracksPage(tracksOrVocals) && setOpenUploadModal(true);
    isVocalsPage(tracksOrVocals) && navigate("/upload-vocal");
  }

  function checkIsVocalSearching() {
    return profileState === profileCategory.VOCAL_SEARCHING;
  }

  function checkIsPortfolio() {
    return profileState === profileCategory.PORTFOLIO;
  }

  function isHoveredNClicked() {
    return hoverId === clickId;
  }

  function checkIsTitle() {
    return (clickId===-1&&hoverId===0)||(clickId===0&&(isHoveredNClicked()||hoverId===-1))
  }

  function isNotHovered(){
    return hoverId === -1
  }

  function isClicked(){
    return clickId!==-1
  }

  function checkisEllipsis(){
    return isMe && (isHoveredNClicked()||isNotHovered())
  }

  useEffect(()=>{
    !isNotHovered()&&setId(hoverId)
    isClicked()&&isNotHovered()&&setId(clickId)
  },[hoverId, clickId])

  console.log("vocal", checkIsPortfolio())

  return (
    <PortfolioInformWrapper>
      {isMe ? <UploadButtonIcon onClick={clickUploadButton} /> : <UploadButtonBlankIcon />}

      {portfolios[id] && (
        <InformContainer>
          <InformWrapper>
            <InformTitleWrapper>
              {checkIsVocalSearching() && isHoveredNClicked() && (
                <PortfoiloViewMoreButton onClick={() => navigate("/tracks/" + `${clickId}`)} />
              )}
              {isTracksPage(tracksOrVocals) && checkIsPortfolio() && checkIsTitle() && <ProducerPortfolioTitleTextIc />}
              {isVocalsPage(tracksOrVocals) && checkIsPortfolio() && checkIsTitle() && <VocalPortfolioTitleTextIc />}
              {!(checkIsTitle() && checkIsVocalSearching()) && <BlankIc />}
              {checkisEllipsis()&& <EllipsisIcon onClick={clickEllipsis} />}
              {openEllipsisModal && checkIsTitle() && (
                <PortfolioUpdateModal isTitle={hoverId === 0} ref={ellipsisModalRef} profileState={profileState} />
              )}
            </InformTitleWrapper>
            <InformTitle>{portfolios[id].title}</InformTitle>
            <InformCategory>{portfolios[id].category}</InformCategory>
          </InformWrapper>

          <InformContent>{portfolios[id].content}</InformContent>
          <InformTagWrapper>
            {portfolios[id].keyword.map((tag, idx) => (
              <InformTag key={idx} textLength={tag.length}>
                #{tag}
              </InformTag>
            ))}
          </InformTagWrapper>
        </InformContainer>
      )}
    </PortfolioInformWrapper>
  );
}

const InformContainer=styled.div`
  
`

const UploadButtonIcon = styled(UploadButtonIc)`
  margin-top: 5.9rem;
  margin-left: 12.65rem;
`;

const UploadButtonBlankIcon = styled(UploadButtonBlankIc)`
  margin-top: 5.9rem;
  margin-left: 12.65rem;
`;

const PortfolioInformWrapper = styled.section`
  width: 37.3rem;
  margin-left: 87rem;

  position: fixed;
  top: 0;
`;

const InformWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  height: 40rem;
  margin-bottom: 2rem;
`;

const InformTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InformTitle = styled.h1`
  width: 37.3rem;
  overflow-wrap: break-word;

  margin-top: 1.7rem;
  ${({ theme }) => theme.fonts.title};
  color: ${({ theme }) => theme.colors.white};
`;

const InformCategory = styled.p`
  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.gray1};

  margin-top: 0.8rem;
`;

const InformContent = styled.p`
  ${({ theme }) => theme.fonts.description};
  color: ${({ theme }) => theme.colors.gray2};

  margin-bottom: 2.4rem;
`;

const InformTag = styled.span<{ textLength: number }>`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 3.8rem;
  width: ${({ textLength }) => textLength + 6}rem;

  margin-bottom: 1rem;

  background: ${({ theme }) => theme.colors.gray4};
  border-radius: 2.1rem;

  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.gray1};
`;

const InformTagWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  column-gap: 1rem;
`;

const EllipsisIcon = styled(EllipsisIc)`
  cursor: pointer;
`;
