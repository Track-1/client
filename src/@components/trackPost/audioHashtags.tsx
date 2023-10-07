import { useParams } from "react-router-dom";
import styled from "styled-components";
import { HashtagIc } from "../../assets";
import { useTrackDetail } from "../../hooks/queries/tracks";
import HashTag from "../@common/hashTag";

export default function AudioHashtags() {
  const { id } = useParams();
  const { trackDetail } = useTrackDetail(Number(id));

  return (
    <HashTagBox>
      <HashTagIconWrapper>
        <HashTagIcon />
      </HashTagIconWrapper>
      <TagWrapper>
        {trackDetail?.userKeyword?.map((tag: string) => (
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
  width: 35rem;
`;

const HashTagIconWrapper = styled.div`
  width: 16rem;
`;
