import styled from 'styled-components';

export const EmptyBox = styled.div``;

export const IconButtonWrapper = styled.button<{ width: number; height: number }>`
  width: ${(props) => props.width}rem;
  height: ${(props) => props.height}rem;
`;
