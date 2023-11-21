import { PropsWithChildren } from "react";
import styled from "styled-components";
import CommentWriteProfileContainer from "./commentWriteProfileContainer";

export default function CommentWriteLayout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <WriteContainer>
      <CommentWriteProfileContainer />
      {children}
    </WriteContainer>
  );
}

const WriteContainer = styled.article`
  display: flex;

  height: 17.1rem;

  border: 0.2rem solid transparent;
  border-top-left-radius: 85.5rem;
  border-bottom-left-radius: 85.5rem;
  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(to right, ${({ theme }) => theme.colors.white}, ${({ theme }) => theme.colors.sub3});
  background-origin: border-box;
  background-clip: content-box, border-box;

  display: flex;
  align-items: center;
`;
