import styled from "styled-components";
import { SleepIc, HoverPlayIc } from "../../assets";
import vocals from "../../mocks/vocalsListDummy.json";

export default function VocalList() {
  return (
    <VocalListContainer>
      {vocals.map(({ id, imgSrc, producer, category, categoryNum, hashtags }) => (
        <VocalContainer key={id}>
          <UsernameInformWrapper>
            <Username>{producer}</Username>
            <SleepIc />
          </UsernameInformWrapper>

          <CategoryTextWrapper>
            <CategoryText>{category}</CategoryText>
            <CategoryNum>+{categoryNum}</CategoryNum>
          </CategoryTextWrapper>

          <MusicProfile>
            <GradientEffect>
              <AlbumCoverImg src={require("../../assets/image/" + imgSrc + ".png")} alt="앨범자켓사진" />
            </GradientEffect>
            <ProfileGradient></ProfileGradient>
            <HoverPlayIcon />
          </MusicProfile>
          <Hashtags>
            {hashtags.map((tag, idx) => (
              <Hashtag key={idx}>#{tag}</Hashtag>
            ))}
          </Hashtags>
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
  display: flex;
  align-items: center;
  width: 28.5rem;
  font-size: 2.4rem;
  line-height: 3.1rem;
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
  background-color: ${({ theme }) => theme.colors.gray5};
  font-family: "Pretendard";
  padding: 0.5rem 0.6rem 0.6rem 0.4rem;
  border-radius: 50%;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 180%;
`;

const AlbumCoverImg = styled.img`
  position: relative;
`;

const ProfileGradient = styled.div`
  position: absolute;
  top: 0;
  width: 23.4rem;
  height: 23.4rem;
  /* background: linear-gradient(135deg, ${({ theme }) => theme.colors.sub3} 15.32%, rgba(13, 14, 17, 0) 53.49%, ${({
    theme,
  }) => theme.colors.sub3} 92.93%); */
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.sub3} 15.32%,
    rgba(13, 14, 17, 0.7) 53.49%,
    ${({ theme }) => theme.colors.sub3} 92.93%
  );
  top: 25px;
  right: 19px;
`;

const HoverPlayIcon = styled(HoverPlayIc)`
 position:absolute;
 top:0;
 margin-left:10rem;
 margin-top:10rem;
 transform: rotate(-45deg);
`;

const MusicProfile = styled.div`
  position: relative;
  display: inline-block;
  width: 28.4rem;
  height: 28.4rem;
  top: 22px;
  left: 22px;
  border: 0.3rem solid transparent;
  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(
      to top,
      ${({ theme }) => theme.colors.sub2} 0%,
      ${({ theme }) => theme.colors.sub3} 50%,
      ${({ theme }) => theme.colors.sub3} 100%
    );

  background-origin: border-box;
  background-clip: content-box, border-box;
  transform: rotate(45deg);
  margin-left: 5.3rem;
  border-radius: 5rem;
`;

const GradientEffect = styled.div`
  display: inline-block;
  width: 23.4rem;
  height: 23.4rem;
  background-color: white;
  border-radius: 4rem;
  overflow: hidden;
  margin: 2.5rem;
`;

const Hashtags = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  bottom: 4.5rem;
  right: 2rem;
`;
const Hashtag = styled.li`
  padding: 1.7rem 1.5rem;
  height: 2rem;
  border-radius: 2.1rem;
  background-color: ${({ theme }) => theme.colors.gray5};
  ${({ theme }) => theme.fonts.hashtag};
  margin-bottom: 1rem;
`;
