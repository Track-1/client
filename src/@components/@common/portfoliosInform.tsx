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
import PortfolioViewMoreButton from "./portfolioViewMoreButton";
import { useNavigate } from "react-router-dom";
import { uploadButtonClicked } from "../../recoil/uploadButtonClicked";
import { isClickedOutside } from "../../utils/common/modal";
import { isTracksPage, isVocalsPage } from "../../utils/common/pageCategory";
import { profileCategory } from "../../core/constants/pageCategory";
import useModal from "../../utils/hooks/useModal";
import { LoginUserType } from "../../recoil/loginUserData";

export default function PortfoliosInform(props: PortfolioPropsType) {
  const { isMe, hoverId, clickId, profileState, portfolios, whom } = props;

  const tracksOrVocals = useRecoilValue(tracksOrVocalsCheck);
  const [openUploadModal, setOpenUploadModal] = useRecoilState<boolean>(uploadButtonClicked);

  const ellipsisModalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [id, setId] = useState<number>(-1);
  const [openEllipsisModal, setOpenEllipsisModal] = useState<boolean>(false);

  const { modalRef } = useModal();

  const loginUserType = useRecoilValue(LoginUserType);

  function clickEllipsis() {
    setOpenEllipsisModal(true);
  }

  function clickUploadButton() {
    isTracksPage(whom) && setOpenUploadModal(true);
    isVocalsPage(whom) && navigate("/upload/Portfolio");
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
    console.log("asdfjdkfjkdfj")
    navigate(`/track-post/${id}`, { state: id });
  }

  return (
    <PortfolioInformWrapper>
      {isMe ? <UploadButtonIcon onClick={clickUploadButton} /> : <UploadButtonBlankIcon />}

      {portfolios[id] && (
        <InformContainer>
          <InformWrapper>
            <InformTitleWrapper>
              {checkIsVocalSearching() && isHoveredNClicked() && (
                <div  onClick={() => moveTrackPost(portfolios[id].id)} >
                <PortfolioViewMoreButton/>
                </div>
              )}
              {isTracksPage(whom) && checkIsPortfolio() && checkIsTitle() && <ProducerPortfolioTitleTextIcon />}
              {isVocalsPage(whom) && !checkIsPortfolio() && checkIsTitle() && <VocalPortfolioTitleTextIcon />}
              {!(checkIsTitle() && checkIsVocalSearching()) && <BlankIcon />}
              {checkisEllipsis() && <EllipsisIcon onClick={clickEllipsis} />}
              {openEllipsisModal && checkisEllipsis() && (
                <PortfolioUpdateModal
                  isTitle={checkIsTitle()}
                  profileState={profileState}
                  portfolioId={portfolios[id].id}
                  portfoliosData={portfolios}
                  clickedPortfolioId={id}
                  openEllipsisModal={openEllipsisModal}
                  setOpenEllipsisModal={setOpenEllipsisModal}
                />
              )}
            </InformTitleWrapper>
            <InformTitle>{portfolios[id].title}</InformTitle>
            <InformCategory>{portfolios[id].category}</InformCategory>
          </InformWrapper>

          <InformContent>{portfolios[id].content}</InformContent>
          <InformTagWrapper>
            {portfolios[id].keyword.map((tag, idx) => (
              <HashTag>
              <InformTag key={idx} textLength={tag.length}>
                #{tag}
              </InformTag>
              </HashTag>
            ))}
          </InformTagWrapper>
        </InformContainer>
      )}
    </PortfolioInformWrapper>
  );
}

const InformContainer = styled.div`
  margin-top: 11rem;
`;

const UploadButtonIcon = styled(UploadButtonIc)`
  position: absolute;
  right: 0;
  margin-top: 5.9rem;

  width: 24.5rem;

  cursor: pointer;
`;

const UploadButtonBlankIcon = styled(UploadButtonBlankIc)`
  margin-top: 5.9rem;
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
  display: flex;
  
  padding: 0 1.5rem;
`;

const InformTagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;

  flex-direction: column;
  margin-top: 2.8rem;
`;

const HashTag=styled.div`
  display: flex;
  align-items: center;
  height: 3.8rem;
  background-color: ${({ theme }) => theme.colors.gray4};
  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.gray1};
  border-radius: 2.1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
`

const EllipsisIcon = styled(EllipsisIc)`
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const ProducerPortfolioTitleTextIcon=styled(ProducerPortfolioTitleTextIc)`
  width: 13.4rem;
`

const VocalPortfolioTitleTextIcon=styled(VocalPortfolioTitleTextIc)`
  width: 13.4rem;
`

const BlankIcon=styled(BlankIc)`
  width: 13.4rem;
`