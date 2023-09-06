import styled from "styled-components";
import InputTitle from "../inputTitle";

export default function ContactInput() {
  return (
    <ContactInputWrapper>
      <InputTitle>
        <p>Contact</p>
        <ImportantIcon>*</ImportantIcon>
      </InputTitle>
      <InputContainer>
        <Input name="contact" type="text" placeholder="Enter your phone number or SNS account" />
      </InputContainer>
    </ContactInputWrapper>
  );
}

const ContactInputWrapper = styled.section`
  display: flex;
  flex-direction: column;

  align-items: flex-start;
`;

const ImportantIcon = styled.i`
  margin-left: 0.47rem;

  color: ${({ theme }) => theme.colors.main};
`;

const InputContainer = styled.article`
  display: flex;
  flex-direction: column;

  width: 55.9rem;
`;

const Input = styled.input`
  margin-top: 3rem;
  padding: 0.5rem 0;

  color: white;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};

  width: ${({ width }) => width}rem;

  ${({ theme }) => theme.fonts.input}

  &:focus {
    border-color: ${({ theme }) => theme.colors.white};
  }
`;
