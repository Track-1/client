import InputContainer from "../@common/inputContainer";
import DescriptionInput from "../upload/descriptionInput";

interface ProfileDescriptionEditProps {
  description: string;
  handleChangeDescription: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
  isProfile: boolean;
}

export default function ProfileDescriptionEdit(props: ProfileDescriptionEditProps) {
  const { description, handleChangeDescription, isProfile } = props;

  return (
    <>
      <InputContainer title="Description">
        <DescriptionInput
          description={description}
          handleChangeDescription={handleChangeDescription}
          isProfile={isProfile}
        />
      </InputContainer>
    </>
  );
}
