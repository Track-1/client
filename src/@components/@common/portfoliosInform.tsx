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
import TracksProfileUploadModal from "./tracksProfileUploadModal";
import { uploadButtonClicked } from "../../recoil/uploadButtonClicked";
import { UserType } from "../../recoil/main";

export default function PortfoliosInform(props: PortfolioPropsType) {
  const { isMe, hoverId, clickId, profileState, portfolios } = props;
  // const portfolioHoverInformation = portfolios.filter((portfolio) => portfolio.id === hoverId)[0];
  const portfolioHoverInformation = portfolios[hoverId];

  // const portfolioClickInformation = portfolios.filter((portfolio) => portfolio.id === clickId)[0];
  const portfolioClickInformation = portfolios[clickId];
  const tracksOrVocals = useRecoilValue(tracksOrVocalsCheck);
  const isBool = hoverId === clickId ? true : false;
  const portfolioInforms =
    (!isBool && hoverId !== -1) || (isBool && hoverId !== -1) ? portfolioHoverInformation : portfolioClickInformation;
  const isTitle = hoverId === 0 ? true : false;
  const [openEllipsisModal, setOpenEllipsisModal] = useState<boolean>(false);
  const [openUploadModal, setOpenUploadModal] = useRecoilState<boolean>(uploadButtonClicked);

  const ellipsisModalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const userType=useRecoilValue(UserType)

  useEffect(() => {
    console.log(hoverId);
  }, [hoverId]);

  function clickEllipsis() {
    setOpenEllipsisModal(true);
  }

  function clickUploadButton() {
    tracksOrVocals === "Tracks" && setOpenUploadModal(true);
    tracksOrVocals === "Vocals" && navigate("/upload");
  }

  useEffect(() => {
    const clickOutside = (e: any) => {
      if (openEllipsisModal && !ellipsisModalRef.current?.contains(e.target)) {
        setOpenEllipsisModal(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [openEllipsisModal]);

  return (
    <PortfolioInformWrapper>
      {isMe&&userType==="vocal" ? <UploadButtonIcon onClick={clickUploadButton} /> : <UploadButtonBlankIcon />}

      {portfolioInforms && (
        <>
          <InformWrapper>
            <InformTitleWrapper>
              {profileState === "Vocal Searching" && !(!isBool && hoverId !== -1) && (
                <PortfoiloViewMoreButton onClick={() => navigate("/tracks/" + `${clickId}`)} />
              )}
              {isTitle && tracksOrVocals === "Tracks" && profileState !== "Vocal Searching"&& (
                <ProducerPortfolioTitleTextIc />
              )}
              {isTitle && tracksOrVocals === "Vocals" && profileState !== "Vocal Searching" && (
                <VocalPortfolioTitleTextIc />
              )}
              {(!isTitle || profileState !== "Vocal Searching") && <BlankIc />}

              {isMe && userType==="vocal"&&!(!isBool && hoverId !== -1) && (
                <>
                  {<EllipsisIcon onClick={clickEllipsis} />}
                  {openEllipsisModal && isTitle && (
                    <PortfolioUpdateModal isTitle={isTitle} ref={ellipsisModalRef} profileState={profileState} />
                  )}
                </>
              )}
            </InformTitleWrapper>
            <InformTitle>{portfolioInforms.title}</InformTitle>
            <InformCategory>{portfolioInforms.category}</InformCategory>
          </InformWrapper>

          <InformContent>{portfolioInforms.content}</InformContent>
          <InformTagWrapper>
            {portfolioInforms.keyword.map((tag, idx) => (
              <InformTag key={idx} textLength={tag.length}>
                #{tag}
              </InformTag>
            ))}
          </InformTagWrapper>
        </>
      )}
    </PortfolioInformWrapper>
  );
}

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
