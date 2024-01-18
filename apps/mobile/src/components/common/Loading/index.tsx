import styled from 'styled-components';
import { Z_INDEX } from '../../../core/common/zIndex';
import mobile_loading from '../../../assets/image/mobile_loading.gif';

export default function Loading() {
  return (
    <Background>
      <LoadingImage src={mobile_loading} />
    </Background>
  );
}

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  z-index: ${Z_INDEX.LOADING};

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100svh;

  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(17.5px);
`;

const LoadingImage = styled.img`
  width: 100%;
`;
