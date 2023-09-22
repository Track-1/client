import styled from "styled-components";
import { CategoryIc } from "../../assets";
import { CategoryId, CategoryText } from "../../core/common/categories";
import Empty from "./empty";

interface ProfileCategoryProps {
  category: string[] | undefined;
}

export default function ProfileCategory(props: ProfileCategoryProps) {
  const { category } = props;

  return (
    <CategoryBox>
      <CategoryIcon />
      <CategoryArray>
        {category && category.length > 0 ? (
          Object.keys(CategoryId).map((category: any, index: number) =>
            category.includes(CategoryText[category]) ? (
              <Category key={category}>{category}</Category>
            ) : (
              <NotCategory key={category + 9}>{category}</NotCategory>
            ),
          )
        ) : (
          <Empty />
        )}
      </CategoryArray>
    </CategoryBox>
  );
}

const CategoryBox = styled.div`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.hashtag};

  width: 34.8rem;

  display: flex;
  flex-direction: column;
`;

const NotCategory = styled.li`
  color: ${({ theme }) => theme.colors.gray4};

  ${({ theme }) => theme.fonts.hashtag};

  margin-bottom: 1.1rem;
  margin-right: 3.2rem;

  display: flex;
  flex-direction: column;
`;

const CategoryIcon = styled(CategoryIc)`
  width: 10.2rem;
`;

const CategoryArray = styled.ul`
  height: 14.4rem;
  column-count: 2;
  margin-top: 2.5rem;
`;

const Category = styled.li`
  margin-bottom: 1.1rem;
`;
