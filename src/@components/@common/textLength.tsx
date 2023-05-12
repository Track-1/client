import styled from "styled-components";

interface TextLengthProps {
  inputLength: number;
  limit: number;
  font: string;
}

export default function TextLength(props: TextLengthProps) {
  const { inputLength, limit, font } = props;

  return (
    <Container font={font}>
      <InputLength inputLength={inputLength}>{inputLength}</InputLength>
      <Limit>/{limit}</Limit>
    </Container>
  );
}

const Container = styled.div<{ font: string }>`
  display: flex;
  ${(props) => props.font};
`;

const InputLength = styled.p<{ inputLength: number }>`
  color: ${(props) => (props.inputLength > 0 ? ({ theme }) => theme.colors.white : ({ theme }) => theme.colors.gray3)};
`;

const Limit = styled.p`
  color: ${({ theme }) => theme.colors.gray3};
`;
