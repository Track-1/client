import styled from "styled-components";
import { HashtagIc } from "../../assets";
import useGetTrackInfo from "../../hooks/trackPost/useGetTrackInfo";
import HashTag from "../@common/hashTag";

export default function AudioHashtags() {
  const { userKeyword } = useGetTrackInfo();

  return (
    <HashTagBox>
      <HashTagIconWrapper>
        <HashTagIcon />
      </HashTagIconWrapper>
      <TagWrapper>
        {userKeyword?.map((tag: string) => (
          <HashTag key={tag} tag={tag} />
        ))}
      </TagWrapper>
    </HashTagBox>
  );
}

const HashTagBox = styled.article`
  display: flex;

  margin-top: 2.7rem;
`;

const HashTagIcon = styled(HashtagIc)`
  width: 11.2rem;

  height: 3.8rem;

  display: flex;
  align-items: center;

  margin-right: 4.1rem;
`;

const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const HashTagIconWrapper = styled.div`
  width: 16rem;
`;
