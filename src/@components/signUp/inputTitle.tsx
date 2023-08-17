import { ReactNode } from "react";
import styled from "styled-components";

interface InputTitleProp {
  children: ReactNode;
}

export default function InputTitle(props: InputTitleProp) {
  const { children } = props;

  return <Title>{children}</Title>;
}

const Title = styled.h1`
  display: flex;
  margin-top: 3.2rem;

  color: ${({ theme }) => theme.colors.gray2};
  ${({ theme }) => theme.fonts.body1};
`;