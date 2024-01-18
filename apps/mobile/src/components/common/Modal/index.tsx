// import { PropsWithChildren } from "react";

import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { CloseIc } from '../../../assets';

export interface ModalProps {
  header?: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal(props: ModalProps) {
  const { header, children, isOpen, onClose, ...restProps } = props;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Styled.Background>
          <Styled.ModalBox {...restProps}>
            <Styled.CloseIconWrapper>
              <Styled.CloseIcon />
            </Styled.CloseIconWrapper>
            {header && <Styled.Header>{header}</Styled.Header>}
            {children}
          </Styled.ModalBox>
        </Styled.Background>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const Styled = {
  CloseIconWrapper: styled(Dialog.Close)`
    width: 100%;
    display: flex;
    justify-content: flex-end;
  `,
  CloseIcon: styled(CloseIc)`
    width: 1.2rem;
    height: 1.2rem;
  `,
  Header: styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 1rem 0 4rem;
  `,
  Background: styled(Dialog.Overlay)`
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    z-index: 1000;
    inset: 0;
    animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  `,
  ModalBox: styled(Dialog.Content)`
    border-radius: 1rem;
    border: 1px solid #313338;
    background: rgba(14, 15, 19, 0.8);

    backdrop-filter: blur(10px);
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 45rem;
    height: 55rem;
    padding: 2rem;
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  `,
};
