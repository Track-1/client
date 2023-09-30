import { UploadDescriptionIc } from "../../assets";
import { InfoType, InfoTypeIconWrapper, InfoTypeText } from "./categotyInfo";
import styled from "styled-components";
import DescriptionInput from "./descriptionInput";
import UploadInfoBox from "./uploadInfoBox";


interface DescriptionInfoProps {
  description: string;
  handleChangeDescription: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
  isProfile: boolean;
}

export default function DescriptionInfo(props: DescriptionInfoProps) {
  const { description, handleChangeDescription, isProfile } = props;

  return (
    <UploadInfoBox>
      <InfoType>
        <InfoTypeIconWrapper>
          <UploadDescriptionIcon />
        </InfoTypeIconWrapper>
        <InfoTypeText>Description</InfoTypeText>
      </InfoType>
      <DescriptionInput
        description={description}
        handleChangeDescription={handleChangeDescription}
        isProfile={isProfile}
      />
    </UploadInfoBox>
  );
}
const UploadDescriptionIcon = styled(UploadDescriptionIc)`
  width: 1.246rem;
`;
