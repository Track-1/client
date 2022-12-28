import categorys from '../../mocks/categoryDummy.json'

export default function CategoryList() {
  return (
    <>
    {categorys.map(({id, category})=>(
      <p key={id}>{category}</p>
    ))}
    </>
  )
}
