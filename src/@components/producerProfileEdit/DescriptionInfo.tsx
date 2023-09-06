import styled from "styled-components";
import InputTitle from "../@common/inputTitle";
import DescriptionInput from "../@common/upload/common/DescriptionInput";

export default function DescriptionInfo() {
  return (
    <DescriptionBox>
      <InfoType>
        <InputTitle>Description</InputTitle>
      </InfoType>
      <DescriptionInput />
    </DescriptionBox>
  );
}

const DescriptionBox = styled.div`
  width: 100%;

  margin-top: 4.8rem;
`;

const InfoType = styled.div`
  display: flex;
`;
