// import { PropsWithChildren } from "react";

import * as Dialog from '@radix-ui/react-dialog';
import { m } from 'framer-motion';
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
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            <Styled.ModalBox asChild {...restProps}>
              <m.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
                {header && <header>{header}</header>}
                {children}
                <Dialog.Close>
                  <CloseIc />
                </Dialog.Close>
              </m.div>
            </Styled.ModalBox>
          </m.div>
        </Styled.Background>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const Styled = {
  Background: styled(Dialog.Overlay)`
    background-color: rgba(0, 0, 0, 0.8);
  `,
  ModalBox: styled(Dialog.Content)`
    padding: 2rem;
    border-radius: 1rem;
    border: 1px solid #313338;
    background-color: rgba(14, 15, 19, 0.8);
    margin: 1.5rem;
  `,
};
