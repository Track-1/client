import styled from "styled-components";
import InputTitle from "../@common/inputTitle";
import DescriptionInput from "../@common/upload/common/DescriptionInput";

export default function DescriptionInfo() {
  return (
    <DescriptionBox>
      <InputTitle>Description</InputTitle>

      <DescriptionInput />
    </DescriptionBox>
  );
}

const DescriptionBox = styled.div`
  width: 100%;

  margin-top: 6.4rem;
`;
