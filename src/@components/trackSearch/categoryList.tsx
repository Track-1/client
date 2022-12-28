import styled from 'styled-components'
import {UploadTextIc,RnBTextIc,HiphopTextIc,BalladTextIc,PopTextIc,RockTextIc,EDMTextIc,JazzTextIc,HouseTextIc,FunkTextIc} from '../../assets'
import categorys from "../../mocks/categoryDummy.json"

export default function CategoryList() {
  return (
    <CategoryListWrapper>
    {categorys.map(({id, category})=>(
      <CategoryTextBox key={id}>
        <img src={category} alt="카테고리 텍스트"/>
      </CategoryTextBox>
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

  margin:2.7rem 0 0 1.2rem;
`

const CategoryTextBox=styled.article`

  width: 30.9rem;
  height: 5rem;

  padding-left: 6.396rem;
  margin-bottom: 1.9rem;

`

const UploadButton=styled.button`
  width: 24.6rem;
  height: 5.2rem;

  margin: 5.2rem 0 0 6.3rem ;

  border:0.1rem solid ${({ theme }) => theme.colors.main};
  border-radius: 2.55188rem;

  ${({ theme }) => theme.fonts.title};
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.white};

`