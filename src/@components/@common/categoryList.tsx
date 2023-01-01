import styled from 'styled-components'
import {UploadTextIc,NeonXIc,TrackSearchingTextIc,TrackSearchingPinkIc,PinkXIc} from '../../assets'
import categorys from "../../mocks/categoryDummy.json"
import { useState, useEffect, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { categorySelect } from '../../recoil/categorySelect';
import UploadButtonModal from '../trackSearch/uploadButtonModal';
import { tracksOrVocalsCheck } from '../../recoil/tracksOrVocalsCheck';

interface CategoryChecks{
  categId:number;
  selected:boolean;
}

const categorySelectedCheck: CategoryChecks[] = [
  { categId: 0, selected: false},
  { categId: 1, selected: false},
  { categId: 2, selected: false},
  { categId: 3, selected: false},
  { categId: 4, selected: false},
  { categId: 5, selected: false},
  { categId: 6, selected: false},
  { categId: 7, selected: false},
  { categId: 8, selected: false},
];


export default function CategoryList() {  
  const [selectedCategorys, setSelectedCategorys]=useState<CategoryChecks[]>(categorySelectedCheck);
  const[selectedCategorysApi, setSelectedCategorysApi]=useRecoilState<string>(categorySelect);
  const [openModal, setOpenModal]=useState<boolean>(false);
  const [trackSearchingClicked, setTrackSearchingClicked]=useState<boolean>(false);
  const tracksOrVocals=useRecoilValue<string>(tracksOrVocalsCheck)
  const modalRef = useRef<HTMLDivElement>(null)
  const categs=selectedCategorys.filter((selectedCategory) => selectedCategory.selected === true)
  let categApi='';

  function categoryClick(id:number){
    setSelectedCategorys(
      selectedCategorys.map((selectCateg)=>
        (selectCateg.categId === id ? {...selectCateg , selected : !selectCateg.selected} : selectCateg)
      )
    ) 
  }
  
  categs.forEach(({categId}) => {
    categApi=categApi+`&categ=`+categId
  });
  setSelectedCategorysApi(categApi)

  function clickUploadButton(){
    setOpenModal(true)
  }

  function clickTrackSearching(){
    setTrackSearchingClicked((prev)=>!prev)
  }
  
  useEffect(() => {
      const clickOutside = (e: any) => {
        if (openModal && !modalRef.current?.contains(e.target)) {
          setOpenModal(false)
        }
      }
      document.addEventListener('mousedown', clickOutside)
      return () => {
        document.removeEventListener('mousedown', clickOutside)
      }
    }, [openModal])

  
  return (
    <>
    {openModal&&<UploadButtonModal ref={modalRef} />}
    <CategoryListWrapper>
    {categorys.map((category)=>(
      <CategoryTextBoxWrapper key={category.id} onClick={()=>categoryClick(category.id)} selectCategBool={selectedCategorys[category.id].selected} tracksOrVocals={tracksOrVocals}>
        <CategoryTextBox>
          {tracksOrVocals==="Tracks"?(selectedCategorys[category.id].selected?(<img src={require('../../assets/icon/'+ category.selectTrackCategory + '.svg')} alt="선택된 카테고리 텍스트" />):(<img src={require('../../assets/icon/'+ category.category + '.svg')} alt="선택된 카테고리 텍스트" />)):(selectedCategorys[category.id].selected?(<img src={require('../../assets/icon/'+ category.selectVocalCategory + '.svg')} alt="선택된 카테고리 텍스트" />):(<img src={require('../../assets/icon/'+ category.category + '.svg')} alt="선택된 카테고리 텍스트" />))}
          {tracksOrVocals==="Tracks"&&selectedCategorys[category.id].selected&&(<NeonXIc/>)}
          {tracksOrVocals==="Vocals"&&selectedCategorys[category.id].selected&&(<PinkXIc/>)}
        </CategoryTextBox>
      </CategoryTextBoxWrapper>
    ))}
    {tracksOrVocals==="Tracks"&&(
      <UploadButton type="button" onClick={clickUploadButton}>
        <UploadTextIc/>
      </UploadButton>
    )}

    {tracksOrVocals==="Vocals"&&(trackSearchingClicked?(<TrackSearchingPinkIcon onClick={clickTrackSearching}/>):(<TrackSearchingTextIcon onClick={clickTrackSearching}/>))}
    </CategoryListWrapper>
    </>
  )
}

const CategoryListWrapper=styled.section`
  display: flex;
  flex-direction: column;

  position: fixed;
  padding-top:14.3rem;

  margin:2.7rem 0 0 1.2rem;

`

const CategoryTextBoxWrapper=styled.article<{selectCategBool:boolean, tracksOrVocals:string}>`
  display: flex;
  align-items: center;

  width: 30.9rem;
  height: 5rem;

  padding-left: 6.396rem;
  margin-bottom: 1.9rem;

  border:0.15rem solid transparent;
  border-radius: 3.26307rem;

  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),  
  linear-gradient(to right, ${({ theme }) => theme.colors.sub3} 0%, ${({ theme }) => theme.colors.sub3} 20%,  ${({ selectCategBool,tracksOrVocals,theme }) => tracksOrVocals==="Tracks"?(selectCategBool?(theme.colors.sub1):(theme.colors.sub3)):(selectCategBool?(theme.colors.sub2):(theme.colors.sub3)) } 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
`

const CategoryTextBox=styled.div`
  display: flex;
  justify-content: space-between;

  width: 22.104rem;

  cursor: pointer;
`

const UploadButton=styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 24.6rem;
  height: 5.2rem;

  margin: 2.275rem 0 0 6.3rem ;

  border:0.1rem solid ${({ theme }) => theme.colors.main};
  border-radius: 2.55188rem;

  ${({ theme }) => theme.fonts.title};
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.white};
`

const TrackSearchingTextIcon=styled(TrackSearchingTextIc)`
  margin: 2.275rem 0 0 6.3rem ;

  cursor: pointer;
`

const TrackSearchingPinkIcon=styled(TrackSearchingPinkIc)`
  margin: 2.275rem 0 0 6.3rem ;

  cursor: pointer;
`