import styled from "styled-components";
import DescriptionInput from "../upload/DescriptionInput";

export default function DescriptionInfo() {
  return (
    <DescriptionBox>
      <InfoType>
        <InfoTypeText>Description</InfoTypeText>
      </InfoType>
      {/* <DescriptionInput /> */}
    </DescriptionBox>
  );
}

const DescriptionBox = styled.div`
  width: 100%;
  padding-top: 9rem;
  padding-left: 11rem;
`;

const InfoType = styled.div`
  display: flex;
`;

const InfoTypeText = styled.div`
  color: ${({ theme }) => theme.colors.gray2};
  ${({ theme }) => theme.fonts.inputTitle};
`;
