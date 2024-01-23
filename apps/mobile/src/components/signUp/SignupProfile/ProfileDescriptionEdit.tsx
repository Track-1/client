import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import { useFormContextWithRef } from 'track-1-form-with-react-hook-form';
import { InputTitle } from '../../common/Form/inputForm';

export default function ProfileDescriptionEdit() {
  const { registerWithRef, ...methods } = useFormContextWithRef();

  const { watch } = methods;

  return (
    <div>
      <InputTitle>Description</InputTitle>
      <DescriptionInputWrapper>
        <DescriptionText
          placeholder="What kind of work do you do?"
          spellCheck="false"
          maxRows={7}
          maxLength={150}
          {...registerWithRef('description', {})}
        />
        <TextLengthWrapper>
          <Container>
            <InputLength inputLength={watch('description').length}>{watch('description').length}</InputLength>
            <Limit>/150</Limit>
          </Container>
        </TextLengthWrapper>
      </DescriptionInputWrapper>
    </div>
  );
}

const Container = styled.div`
  display: flex;
`;

const InputLength = styled.p<{ inputLength: number }>`
  color: ${({ inputLength, theme }) => (inputLength > 0 ? theme.colors.white : theme.colors.gray3)};
`;

const Limit = styled.p`
  color: ${({ theme }) => theme.colors.gray3};
`;

const DescriptionText = styled(TextareaAutosize)`
  width: 100%;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.Pre_16_R};

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray4};

  margin-top: 1.7rem;
  padding-bottom: 1rem;

  white-space: pre-wrap;
  outline: none;
  word-wrap: break-word;
  word-break: break-word;
  background: transparent;
  border-top: transparent;
  border-left: transparent;
  border-right: transparent;

  border-radius: 0;

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
    ${({ theme }) => theme.fonts.Pre_16_R};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.white};
  }

  resize: none;
`;

const DescriptionInputWrapper = styled.div`
  width: 100%;
`;

const TextLengthWrapper = styled.div`
  ${({ theme }) => theme.fonts.Pre_16_R};

  float: right;
  margin-top: 1.8rem;
`;
