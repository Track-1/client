import categorys from '../../mocks/categoryDummy.json'

export default function categoryList() {
  return (
    <>
    {categorys.map({id, category})=>(
      <p>{category}</p>
    )}
    </>
  )
}
