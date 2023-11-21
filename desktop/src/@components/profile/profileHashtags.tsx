import styled from "styled-components";
import { HashtagIc } from "../../assets";
import Empty from "./empty";
import HashTag from "./hashtag";

interface ProfileHashtagsProps {
  keywords: string[] | undefined;
}

export default function ProfileHashtags(props: ProfileHashtagsProps) {
  const { keywords } = props;

  return (
    <HashtagBox>
      <HashtagIcon />
      {keywords && keywords?.length > 0 ? (
        keywords.map((word, index) => {
          return <HashTag text={word} key={index} />;
        })
      ) : (
        <Empty />
      )}
    </HashtagBox>
  );
}

const HashtagBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 20rem;
`;

const HashtagIcon = styled(HashtagIc)`
  width: 9.2rem;
  margin-bottom: 1.5rem;
`;
