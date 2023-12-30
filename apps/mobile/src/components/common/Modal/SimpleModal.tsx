
import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { CloseIc } from '../../../assets';

interface UsingRulesPreviewProp {
  children:ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function SimpleModal({ isOpen, onClose,children }: UsingRulesPreviewProp) {
  return (
  <Dialog.Root open={isOpen} onOpenChange={() => onClose()}>
    <Dialog.Portal>
      <Dialog.Overlay/>
      <Dialog.Content>
        <Box>
        <Dialog.Close asChild>
          <ButtonWrapper>
          <CloseIcon />
          </ButtonWrapper>
        </Dialog.Close>
        {children}
        
        </Box>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
}

const CloseIcon=styled(CloseIc)`
  width: 2rem;
  height: 2rem;
`

const ButtonWrapper=styled.div`
  width: 100%;
  display: flex;
  justify-content:flex-end;
`

const Box=styled.div`
    margin: -13rem 1rem;
    width: 95%;
    padding: 1.6rem 1.2rem 3rem 3rem;
    border-radius: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.gray4};
    background: rgba(14, 15, 19, 0.6);
    position: absolute;
    backdrop-filter: blur(1px);

    line-height: 180%;
    color: ${({ theme }) => theme.colors.gray2};
    ${({ theme }) => theme.fonts.Pre_14_R};
`