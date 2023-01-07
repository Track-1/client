import styled from "styled-components";

interface HashTag {
  text: string;
}

export default function HashTag(props: HashTag) {
  const { text } = props;
  return <TagBox>#{text}</TagBox>;
}

const TagBox = styled.article`
  height: 3.8rem;
  /* width: 17.3rem; */

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
`;
