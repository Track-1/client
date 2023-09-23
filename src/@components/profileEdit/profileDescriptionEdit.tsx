import DescriptionInput from "../upload/descriptionInput";
import InputContainer from "../@common/inputContainer";

interface ProfileDescriptionEditProps {
  description: string;
  handleChangeDescription: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileDescriptionEdit(props: ProfileDescriptionEditProps) {
  const { description, handleChangeDescription } = props;

  return (
    <>
      <InputContainer title="Description">
        <DescriptionInput description={description} handleChangeDescription={handleChangeDescription} />
      </InputContainer>
    </>
  );
}
