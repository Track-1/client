import { UploadDescriptionIc } from "../../assets";
import { InfoType, InfoTypeText } from "./categotyInfo";
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
        <UploadDescriptionIc />
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
