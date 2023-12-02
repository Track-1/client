import styled from "styled-components";
import { theme } from "../../style/theme";

export default function MainContainer() {
  // console.log(theme.fonts);
  return (
    <>
      <Test>안녕하세요!</Test>
      <Test1>Pretendard</Test1>
      <Test2>Alexandria</Test2>
    </>
  );
}

const Test = styled.h1`
  ${({ theme }) => theme.fonts.Alex_12_B};
  color: ${({ theme }) => theme.colors.white};
`;

const Test1 = styled.h1`
  ${({ theme }) => theme.fonts.Pre_60_B};
  color: ${({ theme }) => theme.colors.white};
`;

const Test2 = styled.h1`
  ${({ theme }) => theme.fonts.Alex_12_R};
  color: ${({ theme }) => theme.colors.white};
`;
