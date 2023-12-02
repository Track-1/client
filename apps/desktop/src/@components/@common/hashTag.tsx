import styled from "styled-components";

interface HashTagProp {
  tag: string;
}

export default function HashTag(props: HashTagProp) {
  const { tag } = props;

  return (
    <TagBox>
      <p>#</p>
      {tag}
    </TagBox>
  );
}

const TagBox = styled.article`
  height: 3.8rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 2.1rem;

  margin-bottom: 1.2rem;
  margin-right: 0.8rem;
  padding: 0 1.5rem;

  background-color: ${({ theme }) => theme.colors.gray4};

  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.hashtag}

  >p {
    margin-right: 0.5rem;
  }
`;
