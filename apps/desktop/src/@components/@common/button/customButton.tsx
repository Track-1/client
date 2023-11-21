import { PropsWithChildren } from "react";
import styled, { CSSProperties } from "styled-components";

interface CustomButtonProps {
  btnStyle: CSSProperties;
  handleClickFunction?: () => void;
}

export default function CustomButton(props: PropsWithChildren<CustomButtonProps>) {
  const { btnStyle, handleClickFunction, children } = props;

  return (
    <Container style={btnStyle} onClick={handleClickFunction}>
      {children}
    </Container>
  );
}

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;
