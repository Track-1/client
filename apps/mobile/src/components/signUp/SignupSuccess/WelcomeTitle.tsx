
import { ReactNode } from 'react';
import styled from 'styled-components';

interface WelcomeTitleProp {
  title: ReactNode;
}

export default function WelcomeTitle(props: WelcomeTitleProp) {
  const { title } = props;

  return <Styled.Title>{title}</Styled.Title>;
}

const Styled = {
  Title: styled.h1`
    white-space: pre;
    text-align: center;
    line-height: 140%;
    letter-spacing: -0.05rem;
    text-transform: uppercase;

    background: linear-gradient(180deg, #fff 85.42%, rgba(255, 255, 255, 0) 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    color: ${({ theme }) => theme.colors.white};

    ${({ theme }) => theme.fonts.Alex_50_R};
  `,
};
