import categorys from '../../mocks/categoryDummy.json'
import styled from 'styled-components'

export default function CategoryList() {
  return (
    <CategoryListWrapper>
    {categorys.map(({id, category})=>(
      <CategoryText key={id}>{category}</CategoryText>
    ))}
    <UploadButton type="button">Upload</UploadButton>
    </CategoryListWrapper>
  )
}

const CategoryListWrapper=styled.section`
  display: flex;
  flex-direction: column;

  margin:4.652rem 0 0 7.596rem;
`

const CategoryText=styled.p`
  margin-bottom: 5.4rem;
  ${({ theme }) => theme.fonts.title};
  color:${({ theme }) => theme.colors.white};
`

const UploadButton=styled.button`
  width: 24.6rem;
  height: 5.2rem;

  border:0.1rem solid ${({ theme }) => theme.colors.main};
  border-radius: 2.55188rem;

  ${({ theme }) => theme.fonts.title};
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.white};

`