import { useState } from "react";
import styled from "styled-components";
import { CategoryIc, DescriptionIc, HashtagIc } from "../../assets";
import useGetTrackInfo from "../../hooks/trackPost/useGetTrackInfo";
import HashTag from "../@common/hashTag";

export default function AudioInfo() {
  const { jacketImage, category, keyword, introduce } = useGetTrackInfo();
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  //   const [play, setPlay] = useRecoilState<boolean>(playMusic);

  return (
    <InfoContainer>
      {/* <PlayImageWrapper className={!isCommentOpen && play ? "playAnimation" : "pauseAnimation"}> */}
      <PlayImageWrapper className={!isCommentOpen ? "playAnimation" : "pauseAnimation"}>
        <PlayerImage src={jacketImage} alt="재생 이미지" />
      </PlayImageWrapper>
      <DescriptionContainer>
        <CategoryBox>
          <CategoryIcon />
          {category}
        </CategoryBox>
        <HashTagBox>
          <HashTagIconWrapper>
            <HashTagIcon />
          </HashTagIconWrapper>
          <TagWrapper>
            {keyword?.map((tag: string) => (
              <HashTag key={tag} tag={tag} />
            ))}
          </TagWrapper>
        </HashTagBox>
        <DescriptionBox>
          <DescriptionIcon />
          <TextBox>{introduce}</TextBox>
        </DescriptionBox>
      </DescriptionContainer>
    </InfoContainer>
  );
}

const InfoContainer = styled.section`
  height: 66.4rem;

  border: 0.2rem solid transparent;
  border-top-left-radius: 37.8rem;
  border-bottom-left-radius: 37.8rem;
  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(to right, ${({ theme }) => theme.colors.sub1}, ${({ theme }) => theme.colors.sub3});
  background-origin: border-box;
  background-clip: content-box, border-box;

  display: flex;
  align-items: center;

  margin-top: 3.1rem;
  margin-left: 8.9rem;
`;

const PlayImageWrapper = styled.div`
  height: 60.4rem;
  width: 60.4rem;

  border-radius: 50%;

  margin-left: 3.6rem;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  position: absolute;
`;

const PlayerImage = styled.img`
  width: 100%;
  height: 100%;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;

  position: absolute;
`;

const DescriptionContainer = styled.div`
  margin-left: 70rem;
`;

const CategoryBox = styled.article`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.body1}
`;

const CategoryIcon = styled(CategoryIc)`
  width: 12.3rem;
  margin-right: 4.1rem;
`;
const HashTagBox = styled.article`
  display: flex;

  margin-top: 2.7rem;
`;

const HashTagIcon = styled(HashtagIc)`
  width: 11.2rem;

  height: 3.8rem;

  display: flex;
  align-items: center;

  margin-right: 4.1rem;
`;

const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const DescriptionBox = styled.article`
  margin-top: 4.4rem;
`;

const DescriptionIcon = styled(DescriptionIc)`
  width: 14.6rem;
  height: 3.8rem;

  display: flex;
  align-items: center;
`;

const TextBox = styled.div`
  width: 51.5rem;
  ${({ theme }) => theme.fonts.description}
  font-family: "pretended";

  color: ${({ theme }) => theme.colors.gray2};
`;

const HashTagIconWrapper = styled.div`
  width: 16rem;
`;
