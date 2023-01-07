import styled from "styled-components"
import {PencilUpdateIc,TrashDeleteIc,SetIsTitleIc} from "../../assets"

interface IsTitlePropsType{
    isTitle:boolean
    ref: React.RefObject<HTMLDivElement>;
}

export default function PortfolioUpdateModal(props:IsTitlePropsType): JSX.Element {
    const isTitle=props.isTitle
  return (
    <ModalWrapper isTitle={isTitle}>
        <ModalBox underline={true}>수정하기<PencilUpdateIc/></ModalBox>
        <ModalBox underline={!isTitle}>삭제하기<TrashDeleteIc/></ModalBox>
        {!isTitle&&<ModalBox underline={false}>타이틀 설정<SetIsTitleIc/></ModalBox>}
    </ModalWrapper>
  )
}

const ModalWrapper=styled.div<{isTitle:boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  position: absolute;
  left: 17.2rem;
  margin-top: ${({isTitle})=>isTitle?16:21}rem;

  width: 20.1rem;

  ${({ theme }) => theme.fonts.comment}
  color:${({ theme }) => theme.colors.white};
  background-color:${({ theme }) => theme.colors.gray4};
  border-radius: 0.5rem;
`

const ModalBox=styled.div<{underline:boolean}>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 20.1rem;
  height:5.6rem;
  padding: 1.1rem 1.9rem;
  border-bottom:0.1rem solid ${({ underline,theme }) => underline?theme.colors.gray3:theme.colors.gray4};
`

