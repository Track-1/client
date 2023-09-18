import { PropsWithChildren } from "react";
import styled from "styled-components";

export default function CommentLayout(props: PropsWithChildren) {
  const { children } = props;
  return <CommentContainer>{children}</CommentContainer>;
}

const CommentContainer = styled.section`
  width: 107.7rem;
  height: 100%;
  min-height: 100vh;
  float: right;

  background-color: rgba(13, 14, 17, 0.75);
  backdrop-filter: blur(1.5rem);

  padding-left: 6.5rem;
  padding-top: 6.1rem;
  padding-right: 7.5rem;

  position: sticky;
  z-index: 1;

  top: 0;
  right: 0;
`;
