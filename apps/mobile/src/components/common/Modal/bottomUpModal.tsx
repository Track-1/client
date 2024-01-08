import { PropsWithChildren, TouchEvent, useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Z_INDEX } from '../../../core/common/zIndex';
import Modal from '.';

interface BottomUpModalProps {
  openModal: boolean;
  showModal: () => void;
  unShowModal: () => void;
}

export default function BottomUpModal(props: PropsWithChildren<BottomUpModalProps>) {
  const { openModal, showModal, unShowModal, children } = props;

  const testRef = useRef<any>();
  const [touchStartPoint, setTouchStartPoint] = useState(0);
  const [touchMovingPoint, setTouchMovingPoint] = useState(0);

  function handleTouchMove(e: TouchEvent<HTMLDivElement>) {
    e.changedTouches[0] && setTouchMovingPoint(e.changedTouches[0]?.clientY);
    console.log(e.changedTouches[0]?.clientY);
  }

  function handleTouchStart(e: TouchEvent<HTMLDivElement>) {
    e.changedTouches[0] && setTouchStartPoint(e.changedTouches[0]?.clientY);
    e.changedTouches[0] && setTouchMovingPoint(e.changedTouches[0]?.clientY);
  }

  console.log((touchMovingPoint - touchStartPoint) / 10);

  console.log(testRef?.current?.scrollHeight);

  return (
    <>
      <Modal isOpen={openModal} onClose={unShowModal}>
        <div></div>
      </Modal>
      <Container
        openModal={openModal}
        resizeHeight={(testRef?.current?.scrollHeight - (touchMovingPoint - touchStartPoint)) / 10}
        maxHeight={testRef?.current?.scrollHeight / 10}
        ref={testRef}>
        <ModalHeader onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
          <StyledLine />
        </ModalHeader>
        <ModalContentWrapper>{children}</ModalContentWrapper>
      </Container>
    </>
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

const Container = styled.div<{ openModal: boolean; resizeHeight: number; maxHeight: number }>`
  position: fixed;
  left: 0;
  bottom: ${({ openModal }) => (openModal ? '0' : '-100%')};
  animation: ${({ openModal }) => (openModal ? slideUp : slideDown)} 0.5s ease-in-out;

  z-index: ${Z_INDEX.FILTER_NAV};

  width: 100%;
  height: ${({ resizeHeight }) => resizeHeight}rem;

  max-height: ${({ maxHeight }) => maxHeight}rem;

  border-radius: 20px 20px 0px 0px;
  border: 1px solid var(#313338);
  background: rgba(26, 28, 32, 0.8);
  backdrop-filter: blur(15px);

  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  width: 100%;
  padding: 2.2rem 0;
`;

const ModalContentWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const StyledLine = styled.div`
  width: 5.6rem;
  height: 0.6rem;

  border-radius: 3px;
  background: ${({ theme }) => theme.colors.gray4};
`;
