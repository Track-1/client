import DescriptionInput from "./descriptionInput";
import UploadInfoBox from "./uploadInfoBox";
import { UploadDescriptionIc } from "../../assets";
import { InfoType, InfoTypeIconWrapper, InfoTypeText } from "./categotyInfo";
import styled from "styled-components";

interface DescriptionInfoProps {
  description: string;
  handleChangeDescription: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DescriptionInfo(props: DescriptionInfoProps) {
  const { description, handleChangeDescription } = props;

  return (
    <UploadInfoBox>
      <InfoType>
        <InfoTypeIconWrapper>
          <UploadDescriptionIcon />
        </InfoTypeIconWrapper>
        <InfoTypeText>Description</InfoTypeText>
      </InfoType>
      <DescriptionInput description={description} handleChangeDescription={handleChangeDescription} />
    </UploadInfoBox>
  );
}
const UploadDescriptionIcon = styled(UploadDescriptionIc)`
  width: 1.246rem;
`;
