import styled from "styled-components";
import FileUploadInfo from "./fileUploadInfo";
import CategoryInfo from "./categotyInfo";
import HashtagInfo from "./hashtagInfo";
import DescriptionInfo from "./descriptionInfo";

export default function UploadInfo() {
  return (
    <Container>
      <FileUploadInfo />
      <CategoryInfo />
      <HashtagInfo />
      <DescriptionInfo />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;

  margin-top: 3.9rem;
`;
