import { PropsWithChildren, TouchEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Z_INDEX } from '../../../core/common/zIndex';
import Modal from '.';

interface BottomUpModalProps {
  openModal: boolean;
  showModal: () => void;
  unShowModal: () => void;
}

export default function BottomUpModal(props: PropsWithChildren<BottomUpModalProps>) {
  const { openModal, showModal, unShowModal, children } = props;

  const modalRef = useRef<any>();
  const [touchStartPoint, setTouchStartPoint] = useState(0);
  const [touchMovingPoint, setTouchMovingPoint] = useState(0);

  function handleTouchMove(e: TouchEvent<HTMLDivElement>) {
    e.changedTouches[0] && setTouchMovingPoint(e.changedTouches[0]?.clientY);
  }

  function handleTouchStart(e: TouchEvent<HTMLDivElement>) {
    e.changedTouches[0] && setTouchStartPoint(e.changedTouches[0]?.clientY);
    e.changedTouches[0] && setTouchMovingPoint(e.changedTouches[0]?.clientY);
  }

  function handleTouchEnd(e: TouchEvent<HTMLDivElement>) {
    if ((touchMovingPoint - touchStartPoint) / 10 > 10) {
      unShowModal();
    } else {
      setTouchStartPoint(0);
      setTouchMovingPoint(0);
    }
  }

  useEffect(() => {
    // 최초 렌더링 시에만 modalRef의 scrollHeight를 출력
    console.log(modalRef?.current?.scrollHeight);
  }, []);

  return (
    <>
      <Modal isOpen={openModal} onClose={unShowModal}>
        <div></div>
      </Modal>
      <Container
        openModal={openModal}
        resizeHeight={(modalRef?.current?.scrollHeight - (touchMovingPoint - touchStartPoint)) / 10}
        maxHeight={modalRef?.current?.scrollHeight / 10}
        ref={modalRef}>
        <ModalHeader onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
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

const Container = styled.div<{ openModal: boolean; resizeHeight?: number; maxHeight?: number }>`
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
