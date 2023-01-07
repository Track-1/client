import styled from "styled-components";
import UploadInfo from "../@common/uploadInfo";
import VocalUploadDefaultImg from "../../assets/image/vocalUploadDefaultImg.png";
import VocalUploadFrameIc from "../../assets/icon/vocalUploadFrameIc.svg";

export default function VocalUpload() {
  return (
    <Container>
      <SectionWrapper>
        <VocalUploadDefaultImage src={VocalUploadDefaultImg} />
        <UploadInfo />
      </SectionWrapper>
    </Container>
  );
}

const Container = styled.section`
  height: 76.2rem;

  margin-left: 15rem;
`;

const SectionWrapper = styled.div`
  height: 100%;

  display: flex;
  align-items: center;

  background-image: url(${VocalUploadFrameIc});
  background-repeat: no-repeat;
`;

const VocalUploadDefaultImage = styled.img`
  height: 59.8rem;
  margin-left: 7rem;
  margin-right: 5rem;
`;
