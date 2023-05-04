import styled from "styled-components";

import VocalImageEdit from "../@components/vocalProfileEdit/vocalImageEdit";
import TitleInputEdit from "../@components/@common/titleInputEdit"
import CategoriesEdit from "../@components/@common/categoriesEdit"
import HashtagsEdit from "../@components/@common/hashtagsEdit"
import Info from "../@components/@common/info"

export default function VocalProfileEditPage() {
  return (
    <>
      <Temporary>
        <TemporaryLeft>
          <VocalImageEdit/>
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
