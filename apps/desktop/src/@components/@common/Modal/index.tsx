import { ReactNode } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import styled from "styled-components";
import { SignUpModalXIc } from "../../../assets";
import { useState } from 'react'
import { useGetEventList } from "../../../hooks/queries/admin/event";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../../utils/common/cookie";


export function PopupModal() {
  const [isOpen, setIsOpen] = useState(true)
  const [checkedState, setCheckedState] = useState(false)

  const { eventListData } = useGetEventList({
    page: 1,
    limit: 6,
  });



  const navigate = useNavigate();

  function handleCheckedBox() {
    setCheckedState(!checkedState)
  }

  function handleCloseModal() {
    setIsOpen(!isOpen)
  }

  function handleClickCloseBtn() {
    if (checkedState) {
      const expiresDate = new Date();
      expiresDate.setDate(expiresDate.getDate() + 1);
      setCookie('popup', checkedState, { path: "/", expires: expiresDate })
    }
  }


  return (
    <>
      {eventListData &&
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <ModalContainer>
        <Styled.ModalTitle>{ eventListData[0].eventTitle}</Styled.ModalTitle>
        <ModalWrapper>
          <ModalContent>
            <PopupImageWrapper>
              <PopupImage src={eventListData[0]?.eventImageFile} />
            </PopupImageWrapper>

            <EventContent>
                  {
                    `[Track-1 Song Camp Pt.1: Romance]

#Korea Track
Track-1 Song Camp Korea는 다른 인디 아티스트와 협업하여 결과물을 도출하는 온라인 송캠프 프로그램으로, 1위 팀은 믹싱/마스터링부터 유통까지 앨범 제작 전체 지원\n`}
<EventDetailText onClick={()=> {navigate(`/event/${eventListData[0].eventId}`)}}>모집 요강 상세 보기</EventDetailText>

{`\n\n#Global Track
Track-1 Song Camp Korea is an online song camp program where independent artists collaborate to produce outcomes. The 1st place team receives full support for the entire album production process, from mixing/mastering to distribution.
View detailed recruitment guidelines.`
              }
            </EventContent>
          </ModalContent>

        <BottomWrapper>
          <CheckBoxWrapper>
            <CheckBoxLabel onClick={handleCheckedBox}>오늘하루 보지 않기</CheckBoxLabel>
            <CheckBox type="checkbox" checked={checkedState } onClick={handleCheckedBox}/>
          </CheckBoxWrapper>

          <Styled.CloseIconWrapper>
            <Styled.CloseIcon onClick={ handleClickCloseBtn} />
          </Styled.CloseIconWrapper>
          </BottomWrapper>
          </ModalWrapper>
      </ModalContainer>
    </Modal>
      }
    </>
  )
}



const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
`

const ModalContent = styled.div`
  width: 100%;
`

const EventContent = styled.div`
    ${({theme})=> theme.fonts.description};
    color: ${({ theme }) => theme.colors.gray2};

    padding: 3rem 0;


    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre-line;
`

const EventDetailText = styled.span`
  text-decoration: underline;
  text-underline-offset: 0.3rem;

  cursor:pointer
`

const PopupImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`
const PopupImage = styled.img`
  width: 50%;
`

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top:2rem;
`

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap:1rem;

  width:100%;
  height: 3rem;
`

const CheckBoxLabel = styled.label`
  ${({theme})=> theme.fonts.checkbox};
  color: ${({theme})=> theme.colors.gray2};

  cursor: pointer;
`

const CheckBox = styled.input`
appearance: none;
  width: 2rem;
  height: 2rem;

  border: 1px solid ${({theme})=> theme.colors.gray2};
  border-radius: 5px;

  &:checked {
    border-color: transparent;
    background-color: ${({theme})=>theme.colors.main};
  }
`



export interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal(props: ModalProps) {
  const { children, isOpen, onClose } = props;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Styled.Background>
          {children}
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

  ModalTitle: styled.h2`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 1rem 0 4rem;

    ${({theme})=> theme.fonts.pretendard_text20_700}
    color: ${({ theme }) => theme.colors.white};

  `,
  Background: styled(Dialog.Overlay)`
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    z-index: 1000;
    inset: 0;
    animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  `,

  CloseIcon: styled(SignUpModalXIc)`
    width: 3rem;
    height: 3rem;
  `,
};



const ModalContainer = styled(Dialog.Content)`
    position: fixed;
    top: 50%;
    left: 50%;

    width: 68.6rem;

    padding: 3rem;

    border-radius: 1rem;
    border: 1px solid #313338;
    background: rgba(14, 15, 19, 0.8);
    backdrop-filter: blur(10px);
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;

    transform: translate(-50%, -50%);
`
