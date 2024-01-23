import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { CloseIc } from '../../../assets';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function SimpleModal({ isOpen, onClose, children }: ModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={() => onClose()}>
      <Dialog.Portal>
        <Backgrounds />
        <Box>
          <Dialog.Close asChild>
            <ButtonWrapper>
              <CloseIcon width={14} height={14} />
            </ButtonWrapper>
          </Dialog.Close>
          {children}
        </Box>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const CloseIcon = styled(CloseIc)`
  width: 2rem;
  height: 2rem;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Backgrounds = styled(Dialog.Overlay)`
  display: flex;
  position: fixed;
  inset: 0;
  align-items: center;
  justify-content: center;
`;

const Box = styled(Dialog.Content)`
  width: 95%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 1.6rem 1.2rem 3rem 3rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  background: rgba(14, 15, 19, 0.6);

  backdrop-filter: blur(1px);

  line-height: 180%;
  color: ${({ theme }) => theme.colors.gray2};
  ${({ theme }) => theme.fonts.Pre_14_R};
`;
