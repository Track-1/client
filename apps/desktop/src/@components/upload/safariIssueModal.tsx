import * as Dialog from '@radix-ui/react-dialog';
import styled from 'styled-components';
import { SignUpModalXIc } from '../../assets';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SafariIssueMdoal(props: ModalProps) {
  const { isOpen, onClose, ...restProps } = props;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Styled.Background>
          <Styled.ModalBox {...restProps}>
            <>
              사파리로 파일 업로드 시 오류가 발생할 수 있습니다. 오류가 발생한다면, 크롬으로 접속하여 주시기 바랍니다.
              <br /> <br />
              If an error occurs when uploading files with Safari, please try accessing it using Chrome.
            </>
            <Styled.CloseIconWrapper>
              <Styled.CloseIcon />
            </Styled.CloseIconWrapper>
          </Styled.ModalBox>
        </Styled.Background>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const Styled = {
  CloseIconWrapper: styled(Dialog.Close)`
    display: flex;
    align-items: flex-start;
  `,
  CloseIcon: styled(SignUpModalXIc)`
    margin: -1rem 0 1rem;
  `,
  Background: styled(Dialog.Overlay)`
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    z-index: 1000;
    inset: 0;
    animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  `,
  ModalBox: styled(Dialog.Content)`
    display: flex;
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
    max-width: 65rem;
    max-height: 40rem;
    padding: 4rem 2rem 4rem 4rem;
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
    color: ${({ theme }) => theme.colors.gray2};
    ${({ theme }) => theme.fonts.pretendard_text20};
  `,
};
