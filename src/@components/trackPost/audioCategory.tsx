import { useParams } from "react-router-dom";
import styled from "styled-components";
import { CategoryIc } from "../../assets";
import { useTrackDetail } from "../../hooks/queries/tracks";

export default function AudioCategory() {
  const { id } = useParams();
  const { trackDetail } = useTrackDetail(Number(id));

  return (
    <CategoryBox>
      <CategoryIcon />
      {trackDetail?.userCategory}
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
