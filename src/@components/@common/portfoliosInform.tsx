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
import useModal from "../../utils/hooks/useModal";

export default function PortfoliosInform(props: PortfolioPropsType) {
  const { isMe, hoverId, clickId, profileState, portfolios } = props;

  const tracksOrVocals = useRecoilValue(tracksOrVocalsCheck);
  const [openUploadModal, setOpenUploadModal] = useRecoilState<boolean>(uploadButtonClicked);

  const ellipsisModalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [id, setId] = useState<number>(-1);
  const [openEllipsisModal, setOpenEllipsisModal] = useState<boolean>(false);

  const { modalRef } = useModal();

  // useEffect(() => {
  //   function closeModal(e: MouseEvent) {
  //     isClickedOutside(e, ellipsisModalRef, openUploadModal) && setOpenEllipsisModal(false);
  //   }

  //   document.addEventListener("mousedown", closeModal);
  //   return () => {
  //     document.removeEventListener("mousedown", closeModal);
  //   };
  // }, [openEllipsisModal]);

  function clickEllipsis() {
    setOpenEllipsisModal(true);
  }

  function clickUploadButton() {
    isTracksPage(tracksOrVocals) && setOpenUploadModal(true);
    isVocalsPage(tracksOrVocals) && navigate("/upload/Portfolio");
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
    return (
      (clickId === -1 && hoverId === 0) || (clickId === 0 && (isHoveredNClicked() || hoverId === -1)) || hoverId === 0
    );
  }

  function isNotHovered() {
    return hoverId === -1;
  }

  function isClicked() {
    return clickId !== -1;
  }

  function checkisEllipsis() {
    return isMe && isClicked() && (isHoveredNClicked() || isNotHovered());
  }

  useEffect(() => {
    !isNotHovered() && setId(hoverId);
    isClicked() && isNotHovered() && setId(clickId);
    !isClicked() && isNotHovered() && setId(clickId);
  }, [hoverId, clickId]);

  function moveTrackPost(id: number) {
    navigate(`/track-post/${id}`, {
      state: portfolios,
    });
  }

  return (
    <PortfolioInformWrapper>
      {isMe ? <UploadButtonIcon onClick={clickUploadButton} /> : <UploadButtonBlankIcon />}

      {portfolios[id] && (
        <InformContainer>
          <InformWrapper>
            <InformTitleWrapper>
              {checkIsVocalSearching() && isHoveredNClicked() && (
                <PortfoiloViewMoreButton onClick={() => moveTrackPost(id)} />
              )}
              {isTracksPage(tracksOrVocals) && checkIsPortfolio() && checkIsTitle() && <ProducerPortfolioTitleTextIc />}
              {isVocalsPage(tracksOrVocals) && !checkIsPortfolio() && checkIsTitle() && <VocalPortfolioTitleTextIc />}
              {!(checkIsTitle() && checkIsVocalSearching()) && <BlankIc />}
              {/* {checkisEllipsis() && <EllipsisIcon onClick={clickEllipsis} />}
              {openEllipsisModal && checkisEllipsis() && (
                <PortfolioUpdateModal isTitle={checkIsTitle()} ref={modalRef} profileState={profileState} />
              )} */}

              <EllipsisIcon onClick={clickEllipsis} />
              <PortfolioUpdateModal
                isTitle={checkIsTitle()}
                ref={modalRef}
                profileState={profileState}
                portfolios={portfolios[clickId]}
              />
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

const InformContainer = styled.div``;

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

const InformTag = styled.div<{ textLength: number }>`
  /* position: absolute; */

  display: flex;
  justify-content: left;
  align-items: center;

  height: 3.8rem;
  /* width: 10rem; */
  /* width: ${({ textLength }) => textLength * 13}%; */

  /* width: ${({ textLength }) => (7 > textLength && textLength > 2 ? textLength + 5 : textLength + 7)}rem;
  width: ${({ textLength }) => textLength >= 7 && textLength + 10}rem; */

  margin-bottom: 1rem;
  padding-left: 1.5rem;
  padding-right: 2rem;

  background: ${({ theme }) => theme.colors.gray4};
  border-radius: 2.1rem;

  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.gray1};
`;

const InformTagWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
`;

const EllipsisIcon = styled(EllipsisIc)`
  cursor: pointer;
`;
