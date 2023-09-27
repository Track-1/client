import DescriptionInput from "./descriptionInput";
import UploadInfoBox from "./uploadInfoBox";
import { UploadDescriptionIc } from "../../assets";
import { InfoType, InfoTypeText } from "./categotyInfo";

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
