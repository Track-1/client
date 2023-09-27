import { FormProvider } from "react-hook-form";
import InputContainer from "../@common/inputContainer";
import Input from "../signUp/Input";
import { ContactProp } from "../../type/signUp/nickNameProp";
import styled from "styled-components";

export default function ProfileContactEdit(props: ContactProp) {
  const { methods } = props;

  return (
    <Container>
      <InputContainer title="Contact">
        <FormProvider {...methods}>
          <form>
            <Input name="contact" type="text" placeholder="Enter your phone number or SNS account" width={56} />
          </form>
        </FormProvider>
      </InputContainer>
    </Container>
  );
}
const Container = styled.div`
  margin-bottom: 4.3rem;
`;
