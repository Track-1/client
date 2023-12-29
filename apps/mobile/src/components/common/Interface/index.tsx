import styled from 'styled-components';

export const EmptyBox = styled.div``;

export const ImageWrapper = styled.div<{ width: number; height: number }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${(props) => props.width}rem;
  height: ${(props) => props.height}rem;
`;
