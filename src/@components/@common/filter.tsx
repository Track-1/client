import styled from "styled-components";
import { CategoryId } from "../../core/common/categories";
import { Select } from "./selectBox";
const CategoryItem = styled.div`
  ${({ theme }) => theme.fonts.id}
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 30.9rem;
  height: 5rem;

  padding-left: 6.396rem;
  margin-bottom: 1.9rem;
  margin-left: 6.2rem;

  border: 0.15rem solid transparent;
  border-radius: 32px;

  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(
      to right,
      ${({ theme }) => theme.colors.sub3} 0%,
      ${({ theme }) => theme.colors.sub3} 20%,
      ${({ theme }) => theme.colors.sub1} 100%
    );
  background-origin: border-box;
  background-clip: content-box, border-box;

  color: ${({ theme }) => theme.colors.sub1};

  & p {
    margin-right: 2rem;
  }
`;

export default function Filter() {
  return (
    <Select defaultOpen>
      <Select.OptionGroup asChild={false}>
        {Object.keys(CategoryId).map((category) => {
          return (
            <Select.Option key={CategoryId[category]} id={Number(CategoryId[category])} asChild>
              <CategoryItem>
                {category}
                <p>x</p>
              </CategoryItem>
            </Select.Option>
          );
        })}
      </Select.OptionGroup>
    </Select>
  );
}
