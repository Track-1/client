import styled from 'styled-components';

export const EmptyBox = styled.div``;

export const ImageWrapper = styled.div<{ width: number; height: number }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${(props) => props.width}rem;
  height: ${(props) => props.height}rem;
`;

export const HashtagWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.5rem;
`;

export const InfinityObserver = styled.div`
  width: 100%;
  height: 2rem;

  padding: 1rem 0;
`;
