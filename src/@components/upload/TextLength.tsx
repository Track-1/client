import styled from "styled-components";
import { FontsTypes } from "../../style/theme";

interface TextLengthProps {
  inputLength: number;
  limit: number;
  font: keyof FontsTypes;
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
  color: ${({ inputLength, theme }) => (inputLength > 0 ? theme.colors.white : theme.colors.gray3)};
`;

const Limit = styled.p`
  color: ${({ theme }) => theme.colors.gray3};
`;
