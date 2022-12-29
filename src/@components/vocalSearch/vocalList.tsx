import styled from "styled-components";

export default function CategoryList() {
  return <VocalListWrapper>Test</VocalListWrapper>;
}

const VocalListWrapper = styled.div`
  margin: 10rem;
  color: ${({ theme }) => theme.colors.white};
`;
