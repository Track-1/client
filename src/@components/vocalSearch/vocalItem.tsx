import { useState } from "react";
import styled from "styled-components";
import { FilteredVocalType } from "../../type/vocals";

const VocalContainer = styled.div`
  display: inline-block;
  width: 37.4rem;
  height: 44rem;
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.body1};
`;

const UsernameInformWrapper = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
  margin-top: 1.8rem;
`;

const Username = styled.span`
  display: flex;
  width: 70%;

  line-height: 3.1rem;
  font-size: 2.4rem;
  align-items: center;
  margin-bottom: 1.1rem;
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.sub2};
  }
`;

const CategoryTextWrapper = styled.div``;

const CategoryText = styled.span`
  color: ${({ theme }) => theme.colors.gray3};
  margin-right: 0.5rem;
`;

const CategoryNum = styled.span`
  position: relative;
  z-index: 1;
  border-radius: 50%;
  ${({ theme }) => theme.fonts.description};
  padding: 0.5rem 0.6rem 0.6rem 0.4rem;
  color: ${({ theme }) => theme.colors.gray2};
  background-color: ${({ theme }) => theme.colors.gray5};
`;

const AlbumCoverImg = styled.img`
  position: relative;
  transform: rotate(-45deg);
  object-fit: cover;
  width: 130%;
  height: 130%;
  bottom: 3rem;
  right: 3rem;
`;

const MusicProfileWrapper = styled.div<{
  isHovered: boolean;
}>`
  position: relative;
  display: inline-block;
  width: 28.4rem;
  height: 28.4rem;
  top: -1.5rem;
  left: 0.3rem;
  transform: rotate(45deg);
  border-radius: 5rem;
  border: 0.3rem solid transparent;
  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(
      to top,
      ${({ isHovered, theme }) => isHovered && theme.colors.sub2} 0%,
      ${({ theme }) => theme.colors.sub3} 50%,
      ${({ theme }) => theme.colors.sub3} 100%
    );
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const GradientProfile = styled.div<{ isHovered: boolean }>`
  position: absolute;
  width: 24.341rem;
  height: 24.341rem;
  top: 2.5rem;
  right: 1.9rem;
  cursor: pointer;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.sub3} 15.32%,
    ${({ isHovered }) => (isHovered ? " rgba(13, 14, 17, 0.7) 53.49%" : " rgba(13, 14, 17, 0) 53.49%")},
    ${({ theme }) => theme.colors.sub3} 92.93%
  );
`;

const GradientLine = styled.div`
  display: inline-block;
  overflow: hidden;
  width: 23.4rem;
  height: 23.4rem;
  margin: 2.5rem;
  border-radius: 4rem;
  background-color: ${({ theme }) => theme.colors.sub3};
`;

const HashtagContainer = styled.ul`
  position: relative;
  right: 7.5rem;

  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;

  bottom: 8.5rem;
`;

const Hashtag = styled.li`
  ${({ theme }) => theme.fonts.hashtag};
  height: 3.8rem;

  padding: 1.7rem 1.5rem;
  margin-bottom: 1rem;

  line-height: 0.3rem !important;
  border-radius: 2.1rem;
  background-color: ${({ theme }) => theme.colors.gray5};
`;

interface VocalItemProps {
  vocalInfo: FilteredVocalType;
}

export default function VocalItem(props: VocalItemProps) {
  const { vocalInfo } = props;
  const [isHovered, setIsHovered] = useState(false);

  function hoverVocalItem() {
    setIsHovered(true);
  }

  function unhoverVocalItem() {
    setIsHovered(false);
  }
  return (
    <VocalContainer>
      <UsernameInformWrapper>
        <Username>{vocalInfo.userName}</Username>
      </UsernameInformWrapper>

      <CategoryTextWrapper>
        <CategoryText>{vocalInfo.userCategory}</CategoryText>
        <CategoryNum>+{vocalInfo.userCategoryNum}</CategoryNum>
      </CategoryTextWrapper>

      <MusicProfileWrapper onMouseLeave={unhoverVocalItem} onMouseEnter={hoverVocalItem} isHovered={isHovered}>
        <GradientLine>
          <AlbumCoverImg src={vocalInfo.userImageFile} alt="앨범자켓사진" />
        </GradientLine>
        <GradientProfile isHovered={isHovered}></GradientProfile>
      </MusicProfileWrapper>
      <HashtagContainer>
        {vocalInfo.userKeyword.map((keyword, idx) => (
          <Hashtag key={idx}>#{keyword}</Hashtag>
        ))}
      </HashtagContainer>
    </VocalContainer>
  );
}