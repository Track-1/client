import categorys from '../../mocks/categoryDummy.json'
import styled from 'styled-components'

export default function CategoryList() {
  return (
    <CategoryListWrapper>
    {categorys.map(({id, category})=>(
      <CategoryText key={id}>{category}</CategoryText>
    ))}
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