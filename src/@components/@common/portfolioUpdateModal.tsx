import styled from "styled-components"
import {PencilUpdateIc,TrashDeleteIc,SetIsTitleIc} from "../../assets"

interface IsTitlePropsType{
    isTitle:boolean
    profileState:string
    ref: React.RefObject<HTMLDivElement>;
}

export default function PortfolioUpdateModal(props:IsTitlePropsType): JSX.Element {
    const {isTitle, profileState, ref}=props

  return (
    <ModalWrapper isTitle={isTitle}>
        <ModalBox underline={true}>수정하기<PencilUpdateIc/></ModalBox>
        {profileState!=="Vocal Searching"?(<ModalBox underline={!isTitle}>삭제하기<TrashDeleteIc/></ModalBox>):(<ModalBox underline={false}>삭제하기<TrashDeleteIc/></ModalBox>)}
        {!isTitle&&profileState!=="Vocal Searching"&&<ModalBox underline={false}>타이틀 설정<SetIsTitleIc/></ModalBox>}
    </ModalWrapper>
  )
}

const ModalWrapper=styled.div<{isTitle:boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  position: absolute;
  left: 17.2rem;
  margin-top: ${({isTitle})=>isTitle?14:19}rem;

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

