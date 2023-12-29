import { PropsWithChildren, TouchEvent, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Z_INDEX } from '../../../core/common/zIndex';

interface BottomUpModalProps {
  openModal: boolean;
  showModal: () => void;
  unShowModal: () => void;
}

export default function BottomUpModal(props: PropsWithChildren<BottomUpModalProps>) {
  const { openModal, showModal, unShowModal, children } = props;

  const [touchStartY, setTouchStartY] = useState<number | undefined>(undefined);
  const [touchEndY, setTouchEndY] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (touchEndY && touchStartY) {
      if (touchEndY - touchStartY > 100) {
        unShowModal();
      } else {
        showModal();
      }
    }
  }, [touchEndY]);

  function handleTouchStart(e: TouchEvent<HTMLDivElement>) {
    setTouchStartY(e.changedTouches[0]?.screenY);
  }

  function handleTouchEnd(e: TouchEvent<HTMLDivElement>) {
    setTouchEndY(e.changedTouches[0]?.screenY);
  }

  return (
    <Container openModal={openModal}>
      <ModalHeader onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <StyledLine />
      </ModalHeader>
      {children}
    </Container>
  );
}

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

const Container = styled.div<{ openModal: boolean }>`
  position: fixed;
  left: 0;
  bottom: ${({ openModal }) => (openModal ? '0' : '-100%')};
  animation: ${({ openModal }) => (openModal ? slideUp : slideDown)} 0.5s ease-in-out;

  z-index: ${Z_INDEX.FILTER_NAV};

  width: 100%;

  border-radius: 20px 20px 0px 0px;
  border: 1px solid var(#313338);
  background: rgba(26, 28, 32, 0.8);
  backdrop-filter: blur(15px);
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  width: 100%;
  padding: 2.2rem 0;
`;

const StyledLine = styled.div`
  width: 5.6rem;
  height: 0.6rem;

  border-radius: 3px;
  background: ${({ theme }) => theme.colors.gray4};
`;
