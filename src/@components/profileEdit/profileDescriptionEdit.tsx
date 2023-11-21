import styled from "styled-components";
import { TEXT_LIMIT } from "../../core/common/textLimit";
import { DescriptionInput } from "../@common/descriptionInput";
import InputContainer from "../@common/inputContainer";

export default function ProfileDescriptionEdit() {
  return (
    <InputContainer title="Description">
      <InfoInput>
        <DescriptionInput maxLength={TEXT_LIMIT.PROFILE_DESCRIPTION} />
      </InfoInput>
    </InputContainer>
  );
}

const InfoInput = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 100%;
`;
