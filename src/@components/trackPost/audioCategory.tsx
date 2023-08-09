import styled from "styled-components";
import { CategoryIc } from "../../assets";
import useGetTrackInfo from "../../hooks/trackPost/useGetTrackInfo";

export default function AudioCategory() {
  const { category } = useGetTrackInfo();

  return (
    <CategoryBox>
      <CategoryIcon />
      {category}
    </CategoryBox>
  );
}
const CategoryBox = styled.article`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.body1}
`;

const CategoryIcon = styled(CategoryIc)`
  width: 12.3rem;
  margin-right: 4.1rem;
`;
