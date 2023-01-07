import styled from "styled-components";
import UploadInfo from "../@common/uploadInfo";
import TrackUploadDefaultImg from "../../assets/image/trackUploadDefaultImg.png";

export default function TrackUpload() {
  return (
    <Container>
      <SectionWrapper>
        <TrackUploadDefaultImage src={TrackUploadDefaultImg} />
        <UploadInfo />
      </SectionWrapper>
    </Container>
  );
}

const Container = styled.section`
  height: 76.2rem;
  width: 171rem;

  margin-left: 15rem;
`;

const SectionWrapper = styled.div`
  height: 100%;
  width: 138.2rem;

  display: flex;
  align-items: center;

  border: 0.2rem solid transparent;
  border-top-left-radius: 37.8rem;
  border-bottom-left-radius: 37.8rem;
  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(to right, ${({ theme }) => theme.colors.sub1}, ${({ theme }) => theme.colors.sub3});
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const TrackUploadDefaultImage = styled.img`
  margin-left: 6.5rem;
  margin-right: 5rem;
`;
