import DescriptionInput from "./escriptionInput";
import UploadInfoBox from "./ploadInfoBox";
import { UploadDescriptionIc } from "../../assets";
import { InfoType, InfoTypeText } from "./ategotyInfo";

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
