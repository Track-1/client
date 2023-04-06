import styled from "styled-components";
import { checkHashtagLength } from "../../utils/convention/checkHashtagLength";

interface HashTag {
  text: string;
}

export default function HashTag(props: HashTag) {
  const { text } = props;

  function checkLength(text:string):number{
    return checkHashtagLength(text)?text.length*2:text.length*1.6+1
  }

  return <TagBox textLength={checkLength(text)}><p>#</p>{text}</TagBox>;
}

const TagBox = styled.article<{textLength:number}>`
  height: 3.8rem;
  width: ${({textLength})=>textLength}rem;

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

  >p{
    margin-right: 0.5rem;
  }
`;
