import styled from 'styled-components';
import { useFormContextWithRef } from 'track-1-form-with-react-hook-form';
import { CategoryId } from '../../../core/common/categories';
import { getInvariantObjectKeys, invariantOf } from '../../../utils/common/invarientType';
import { InputTitle } from '../../common/Form/inputForm';
import { StyledInput } from '../../common/Input';

export default function ProfileSelectCategoryEdit() {
  const { registerWithRef, ...methods } = useFormContextWithRef();

  const {
    formState: { defaultValues },
  } = methods;

  return (
    <>
      <InputTitle>Category</InputTitle>
      <CategoryBox>
        {getInvariantObjectKeys(invariantOf(CategoryId)).map((category) => {
          return (
            <ul
              key={CategoryId[category]}
              id={CategoryId[category]}
              defaultChecked={defaultValues?.category?.includes(CategoryId[category])}>
              <div>
                <div>
                  <div>
                    <StyledInput {...registerWithRef('category', {})} value={CategoryId[category]} />
                  </div>
                  {category}
                </div>
              </div>
            </ul>
          );
        })}
      </CategoryBox>
    </>
  );
}

const CategoryBox = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  margin-top: 2.2rem;

  ${({ theme }) => theme.fonts.Pre_13_R};
  color: ${({ theme }) => theme.colors.gray4};
  align-items: center;

  cursor: pointer;
`;
