import styled from "styled-components";

interface TextLengthProps {
  inputLength: number;
  limit: number;
}

export default function TextLength(props: TextLengthProps) {
  const { inputLength, limit } = props;

  return (
    <Container>
      <InputLength inputLength={inputLength}>{inputLength}</InputLength>
      <Limit>/{limit}</Limit>
    </Container>
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
