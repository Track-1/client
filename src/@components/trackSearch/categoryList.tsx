import styled from 'styled-components'
import {UploadTextIc,NeonXIc} from '../../assets'
import categorys from "../../mocks/categoryDummy.json"

export default function CategoryList() {
  return (
    <CategoryListWrapper>
    {categorys.map(({id, category})=>(
      <CategoryTextBoxWrapper>
        <CategoryTextBox key={id}>
          <img src={require('../../assets/icon/'+ category + '.svg')} alt="카테고리 텍스트" />
          <NeonXIc/>
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

  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}), 
  linear-gradient(to right, ${({ theme }) => theme.colors.sub3} 0%, ${({ theme }) => theme.colors.sub3} 20%,  ${({ theme }) => theme.colors.sub1} 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
`

const CategoryTextBox=styled.div`
  display: flex;
  justify-content: space-between;

  width: 22.104rem;
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