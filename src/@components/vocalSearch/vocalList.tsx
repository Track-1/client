import styled from "styled-components";
import { SleepIc } from "../../assets";
import vocals from "../../mocks/vocalsListDummy.json";

export default function VocalList() {
  return (
    <VocalListContainer>
      {vocals.map(({ id, imgSrc, producer, category, categoryNum }) => (
        <VocalContainer>
          <UsernameInformWrapper key={id}>
            <Username>{producer}</Username>
            <SleepIc />
          </UsernameInformWrapper>

          <CategoryTextWrapper>
            <CategoryText>{category}</CategoryText>
            <CategoryNum>+{categoryNum}</CategoryNum>
          </CategoryTextWrapper>

          <MusicProfile>
            <AlbumCoverImg src={require("../../assets/image/" + imgSrc + ".png")} alt="앨범자켓사진" />
          </MusicProfile>
        </VocalContainer>
      ))}
    </VocalListContainer>
  );
}

const VocalListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const VocalContainer = styled.div`
  display: inline-block;
  width: 37.4rem;
  height: 44rem;
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.white};
`;
const UsernameInformWrapper = styled.div`
  display: flex;
  margin-left: 4.1rem;
  margin-top: 1.8rem;
`;

const Username = styled.span`
  width: 28.5rem;
  font-size: 2.4rem;
  line-height: 3.1rem;
  display: flex;
  align-items: center;
`;

const CategoryTextWrapper = styled.div`
  margin-left: 4.1rem;
`;

const CategoryText = styled.span`
  color: ${({ theme }) => theme.colors.gray3};
  margin-right: 0.5rem;
`;

const CategoryNum = styled.span`
  color: ${({ theme }) => theme.colors.gray2};
  background: ${({ theme }) => theme.colors.gray5};
  font-family: "Pretendard";
  padding: 0.5rem 0.6rem 0.6rem 0.4rem;
  border-radius: 50%;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 180%;
`;

const AlbumCoverImg = styled.img``;

const MusicProfile = styled.div`
  position: relative;
  width: 23.4rem;
  height: 23.4rem;
  background-color: white;
  transform: rotate(45deg);
  margin-left: 7.3rem;
  display: inline-block;
  border-radius: 4rem;
  background: linear-gradient(225deg, #feffff 15.32%, rgba(13, 14, 17, 0) 53.49%, #ffffff 92.93%);
  overflow: hidden;
`;
