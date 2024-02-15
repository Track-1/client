import styled from 'styled-components';
import loading from '../../assets/image/loading.gif';

export default function Loading() {
  return (
    <Background>
      <LoadingImage src={loading} />
      <LoadingText>Loading...</LoadingText>
    </Background>
  );
}

const Background = styled.div`
  position: fixed;
  z-index: 10000000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-color: rgb(0, 0, 0, 0.7);
`;

const LoadingImage = styled.img`
  height: 20rem;
  z-index: 10;
`;

const LoadingText = styled.strong`
  ${({ theme }) => theme.fonts.title};
  color: ${({ theme }) => theme.colors.white};
  z-index: 10;
`;
