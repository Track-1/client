import styled from 'styled-components'
import {UploadTextIc,NeonXIc} from '../../assets'
import categorys from "../../mocks/categoryDummy.json"
import { useState } from 'react';

export default function CategoryList() {
  const [categoryClicked, setCategoryClicked]=useState<boolean>(false)
  const [countIdx, setCountIdx]=useState<number>(0);

  function categoryClick(id:number, category:string){
    setCategoryClicked((prev)=>!prev)
    setCountIdx(id);
  }

  return (
    <CategoryListWrapper>
    {categorys.map(({id, category, selectCategory})=>(
      <CategoryTextBoxWrapper key={id} categoryClicked={categoryClicked} onClick={()=>categoryClick(id, category)} className={`${categoryClicked && 'active'}`} >
        <CategoryTextBox>
          {categoryClicked?(<img src={require('../../assets/icon/'+ selectCategory + '.svg')} alt="선택된 카테고리 텍스트" />):(<img src={require('../../assets/icon/'+ category + '.svg')} alt="카테고리 텍스트" />)}
          {categoryClicked&&(<NeonXIc/>)}
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

const CategoryTextBoxWrapper=styled.article<{categoryClicked:boolean}>`
  display: flex;
  align-items: center;

  width: 30.9rem;
  height: 5rem;

  padding-left: 6.396rem;
  margin-bottom: 1.9rem;

  border:0.15rem solid transparent;
  border-radius: 3.26307rem;

  /* & > .active{ */
    background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}), 
    linear-gradient(to right, ${({ theme }) => theme.colors.sub3} 0%, ${({ theme }) => theme.colors.sub3} 20%,  ${({ categoryClicked,theme }) => categoryClicked?(theme.colors.sub1):(theme.colors.sub3)} 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;
  /* } */
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