import styled from 'styled-components';
import { theme } from '../../../../style/theme';

interface CardProps {
  color: string;
  isSelected: boolean;
  title: string;
  description: string;
  onClick: () => void;
}

export default function Card(props: CardProps) {
  const { color, isSelected, title, description, onClick } = props;

  return (
    <Styled.CardContainer color={isSelected ? color : theme.colors.gray5} onClick={onClick}>
      <Styled.Header>
        <Styled.Title>{title}</Styled.Title>
        <i>
          {isSelected ? (
            <Styled.CheckedCircle color={color}>
              <Styled.CheckedInlineCircle color={color} />
            </Styled.CheckedCircle>
          ) : (
            <Styled.BlankCheckCircle />
          )}
        </i>
      </Styled.Header>
      <Styled.Description color={isSelected ? color : theme.colors.gray3}>{description}</Styled.Description>
    </Styled.CardContainer>
  );
}

const Styled = {
  CardContainer: styled.article`
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 13.4rem;
    padding: 2.5rem;
    gap: 2rem;

    border: 1px solid ${({ color }) => color};
    border-radius: 1rem;
    background: linear-gradient(115deg, #1e2125 -7.24%, #141517 24.25%, #141517 34.53%, #141517 60.87%);
  `,
  Header: styled.header`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  `,
  Title: styled.h1`
    color: ${({ theme }) => theme.colors.white};

    ${({ theme }) => theme.fonts.Alex_20_R};

    line-height: 140%;
    letter-spacing: -0.02rem;
  `,
  Description: styled.p<{ color: string }>`
    color: ${({ color }) => color};

    ${({ theme }) => theme.fonts.Pre_14_R};
    white-space: pre;

    line-height: 130%;
    letter-spacing: -0.014rem;
  `,
  BlankCheckCircle: styled.div`
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;

    border: 1px solid ${({ theme }) => theme.colors.gray5};
    border-radius: 50%;
  `,
  CheckedCircle: styled.div<{ color: string }>`
    display: flex;

    width: 2rem;
    height: 2rem;

    flex-shrink: 0;

    border: 1px solid ${({ color }) => color};
    border-radius: 50%;
  `,
  CheckedInlineCircle: styled.div<{ color: string }>`
    margin: auto;

    width: 1rem;
    height: 1rem;

    border-radius: 50%;
    background-color: ${({ color }) => color};
  `,
};
