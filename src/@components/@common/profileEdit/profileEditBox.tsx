import styled from "styled-components";
import DescriptionInfo from "../../producerProfileEdit/DescriptionInfo";

import EditLayout from "../editLayout";
import HashtagsEdit from "../hashtag/hashtagsEdit";
import CategoriesEdit from "../selectCategories";
import ContactInput from "./contactInput";

export default function ProfileEditBox() {
  return (
    <EditLayout>
      <InputWrapper>
        <ContactInput />
        <CategoriesEdit />
        <HashtagsEdit />
        <DescriptionInfo />
      </InputWrapper>
    </EditLayout>
  );
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 5.7rem;
`;
