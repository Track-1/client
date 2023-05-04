import styled from "styled-components";

import ProducerImageEdit from "../@components/producerProfileEdit/producerImageEdit";
import TitleInputEdit from "../@components/@common/titleInputEdit"
import CategoriesEdit from "../@components/@common/categoriesEdit"
import HashtagsEdit from "../@components/@common/hashtagsEdit"
import Info from "../@components/@common/info"

export default function ProducerProfileEditPage() {
  return (
    <>
      <Temporary>
        <TemporaryLeft>
          <ProducerImageEdit/>
          <TitleInputEdit/>
        </TemporaryLeft>
        <TemporaryRight>
          <TitleInputEdit/>
          <CategoriesEdit/>
          <HashtagsEdit/>
          <Info/>
          <TitleInputEdit/>
        </TemporaryRight>
      </Temporary>
    </>
  );
}

const Temporary = styled.div`
  color: white;
  font-size: 2rem;
`;

const TemporaryLeft = styled.div`
  float: left;
`;

const TemporaryRight = styled.div`
  float: right;
`;
