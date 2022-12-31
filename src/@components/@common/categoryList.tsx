import styled from 'styled-components'
import {UploadTextIc,NeonXIc} from '../../assets'
import categorys from "../../mocks/categoryDummy.json"
import { useState, useEffect } from 'react';

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
  // const [selectedCategorys, setSelectedCategorys]=useState<number[]>([]);

  // function categoryClick(id:number){
  //   if(selectedCategorys.includes(id)){
  //     setSelectedCategorys(selectedCategorys.filter((element) => element !== id))
  //   }
  //   else{
  //     selectedCategorys.push(id)
  //   }
  //   setSelectedCategorys(selectedCategorys.sort())  
  // }

  // console.log(selectedCategorys)
  // console.log(selectedCategorys.includes(1))

  const [selectedCategorys, setSelectedCategorys]=useState<CategoryChecks[]>(categorySelectedCheck);

  function categoryClick(id:number){
    setSelectedCategorys(
      selectedCategorys.map((selectCateg)=>
        (selectCateg.categId === id ? {...selectCateg , selected : !selectCateg.selected} : selectCateg)
      )
    ) 
  }

  return (
    <CategoryListWrapper>
    {categorys.map(({id, category, selectCategory})=>(
      <CategoryTextBoxWrapper key={id} onClick={()=>categoryClick(id)} className='active test'>
        <CategoryTextBox>
          {/* {selectedCategorys.includes(id)?(<img src={require('../../assets/icon/'+ selectCategory + '.svg')} alt="선택된 카테고리 텍스트" />):(<img src={require('../../assets/icon/'+ category + '.svg')} alt="카테고리 텍스트" />)}
          {selectedCategorys.includes(id)&&(<NeonXIc/>)} */}
          {selectedCategorys[id].selected?(<img src={require('../../assets/icon/'+ selectCategory + '.svg')} alt="선택된 카테고리 텍스트" />):(<img src={require('../../assets/icon/'+ category + '.svg')} alt="카테고리 텍스트" />)}
          {selectedCategorys[id].selected&&(<NeonXIc/>)}
        </CategoryTextBox>
      </CategoryTextBoxWrapper>
    ))}
    <UploadButton type="button">
      <UploadTextIc/>
    </UploadButton>
    </CategoryListWrapper>
  )
}

const CategoryListWrapper=styled.section`
  display: flex;
  flex-direction: column;

  position: fixed;
  padding-top:14.3rem;

  margin:2.7rem 0 0 1.2rem;

`

const CategoryTextBoxWrapper=styled.article`
  display: flex;
  align-items: center;

  width: 30.9rem;
  height: 5rem;

  padding-left: 6.396rem;
  margin-bottom: 1.9rem;

  border:0.15rem solid transparent;
  border-radius: 3.26307rem;

  & .active{
    background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}), 
    linear-gradient(to right, ${({ theme }) => theme.colors.sub3} 0%, ${({ theme }) => theme.colors.sub3} 20%,  ${({ theme }) => theme.colors.sub1} 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;
  }
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

  margin: 5.2rem 0 0 6.3rem ;

  border:0.1rem solid ${({ theme }) => theme.colors.main};
  border-radius: 2.55188rem;

  ${({ theme }) => theme.fonts.title};
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.white};

`