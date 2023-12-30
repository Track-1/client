import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Category({ isOpen, onClose, children }: ModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={() => onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Box>{children}</Box>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const Box = styled.div`
  position: fixed;
  bottom: 1rem;

  padding: 3rem 3rem 1rem;
  border-radius: 1rem;
  border: 1px solid #313338;

  background: rgba(27, 28, 32, 0.5);

  backdrop-filter: blur(15px);

  position: absolute;
  width: 95%;
  margin-left: 1rem;
`;
