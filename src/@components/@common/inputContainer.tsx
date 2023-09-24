import { PropsWithChildren } from "react";
import styled from "styled-components";
import HashtagWarning from "./hashtag/hashtagWarning";

interface InputContainerProps {
  title: string;
  isRequired?: boolean;
  hashtagWarningIcon?: boolean;
}

export default function InputContainer(props: PropsWithChildren<InputContainerProps>) {
  const { title, isRequired, hashtagWarningIcon, children } = props;

  return (
    <Container>
      <InputTitleWrapper>
        <Wrapper>
          <InputTitle>{title}</InputTitle>
          {isRequired && <PointIcon />}
        </Wrapper>
        {hashtagWarningIcon && <HashtagWarning />}
      </InputTitleWrapper>
      {children}
    </Container>
  );
}

const Container = styled.div`
  width: 55.9rem;
`;

const InputTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
`;

const InputTitle = styled.p`
  margin-bottom: 3rem;

  color: ${({ theme }) => theme.colors.gray2};
  ${({ theme }) => theme.fonts.body1};
`;

const PointIcon = styled.div`
  width: 0.7rem;
  height: 0.7rem;

  margin-left: 0.6rem;

  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.main};
`;
