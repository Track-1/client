import styled from "styled-components";
import AudioCategory from "./audioCategory";
import AudioDescription from "./audioDescription";
import AudioHashtags from "./audioHashtags";
import AudioJacketImage from "./audioJacketImage";

export default function AudioInfo() {
  return (
    <InfoContainer>
      <AudioJacketImage />
      <DescriptionContainer>
        <AudioCategory />
        <AudioHashtags />
        <AudioDescription />
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

  margin-left: 8.9rem;
`;

const DescriptionContainer = styled.div`
  margin-left: 5.4rem;
`;
