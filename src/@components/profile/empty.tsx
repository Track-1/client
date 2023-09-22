import styled from "styled-components";

export default function Empty() {
  return (
    <EmptyProfileMessageWrapper>
      <EmptyProfileMessage>no information</EmptyProfileMessage>
    </EmptyProfileMessageWrapper>
  );
}

const EmptyProfileMessageWrapper = styled.div`
  height: 10.3rem;

  display: flex;
  justify-content: center;

  margin-top: 6.2rem;
`;

const EmptyProfileMessage = styled.p`
  ${({ theme }) => theme.fonts.description}
  color: ${({ theme }) => theme.colors.gray4};
`;
