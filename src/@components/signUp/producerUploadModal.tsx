import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { MoveTouploadPortfolioButtonIc, MoveTouploadVocalSearchingButtonIc } from '../../assets'
import { profileCategory } from '../../core/constants/pageCategory';

interface PropsType {
    visible:boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
  }

export default function ProducerUploadModal(props:PropsType) {
    const { visible, setVisible } = props;

    const navigate=useNavigate()
    const modalRef = useRef<HTMLUListElement>(null);

    function moveToProducerUpload(page:string){
        navigate(page)
    }

    function isClickedOutside(e: MouseEvent) {
        return visible && !modalRef.current?.contains(e.target as Node);
      }
    
      function closeModal(e: MouseEvent) {
        if (isClickedOutside(e)) {
            setVisible(false);
        }
      }
    
      useEffect(() => {
        document.addEventListener("mousedown", closeModal);
        return () => {
          document.removeEventListener("mousedown", closeModal);
        };
      }, [visible]);

  return (
    <ModalWrapper ref={modalRef}>
        <MoveTouploadVocalSearchingButtonIcon onClick={()=>moveToProducerUpload(`/upload/${profileCategory.VOCAL_SEARCHING}`)}/>
        <MoveTouploadPortfolioButtonIcon onClick={()=>moveToProducerUpload(`/upload/${profileCategory.PORTFOLIO}`)}/>
    </ModalWrapper>
  )
}

const ModalWrapper=styled.section`
    display: flex;
    flex-direction: column;

    margin: 2.5rem 0 0 13.6rem;

    cursor: pointer;
`

const MoveTouploadVocalSearchingButtonIcon=styled(MoveTouploadVocalSearchingButtonIc)`
    width: 28.4rem;
    height: 10.6rem;
`

const MoveTouploadPortfolioButtonIcon=styled(MoveTouploadPortfolioButtonIc)`
    width: 28.4rem;
    height: 8.4rem;
`