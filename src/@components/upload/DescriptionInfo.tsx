import styled from "styled-components";
import DescriptionInput from "./DescriptionInput";
import UploadInfoBox from "./UploadInfoBox";
import { UploadDescriptionIc } from "../../assets";

interface DescriptionInfoProps {
  description: string;
  handleChangeDescription: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DescriptionInfo(props: DescriptionInfoProps) {
  const { description, handleChangeDescription } = props;

  return (
    <UploadInfoBox>
      <InfoType>
        <UploadDescriptionIc />
        <InfoTypeText>Description</InfoTypeText>
      </InfoType>
      <DescriptionInput description={description} handleChangeDescription={handleChangeDescription} />
    </UploadInfoBox>
  );
}
const InfoType = styled.div`
  display: flex;
  align-items: center;

  width: 20.7rem;
  height: 100%;

  color: ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.body1};
`;

const InfoTypeText = styled.p`
  margin-left: 1rem;
`;
