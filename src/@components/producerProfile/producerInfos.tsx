import styled from "styled-components";
import { BackBtnIc, CategoryIc, DescriptionIc, HashtagIc } from "../../assets";
import thumbnailImg from "../../assets/image/thumbnailImg.png";
import { theme } from "../../style/theme";
import { ProducerProfileType } from "../../type/producerProfile";
import BackButton from "../@common/backButton";
import HashTag from "../trackPost/hashTag";

interface PropsType {
  profileData: ProducerProfileType;
}

export default function ProducerInfos(props: PropsType) {
  const { profileData } = props;

  return (
    <InfoContainer>
      <InfoHeader>
        <BackButton />
        <Blank />
      </InfoHeader>
      <ProfileImage />
      <ProducerName>{profileData.name}</ProducerName>
      <ProducerEmail>{profileData.contact}</ProducerEmail>
      <DetailInfoContainer>
        <CategoryBox isSelected={true}>
          <CategoryIc />
          {/* //로직 수정 필요 */}
        </CategoryBox>
        <HashtagBox>
          <HashtagIcon />
          {profileData.keyword.map((word) => {
            return <HashTag text={word} />;
          })}
        </HashtagBox>
      </DetailInfoContainer>
      <DescriptionBox>
        <DescriptionIc />
        <Inroduce>{profileData.introduce}</Inroduce>
      </DescriptionBox>
    </InfoContainer>
  );
}

const InfoContainer = styled.section`
  width: 61rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 6.6rem;
`;

const InfoHeader = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;

  margin-left: 8.6rem;
`;

const Blank = styled.div`
  width: 2rem;
`;
const ProfileImage = styled.div`
  height: 25.9rem;
  width: 25.9rem;

  border-radius: 50%;

  background-image: url(${thumbnailImg});
  background-repeat: no-repeat;
  background-size: contain;
`;

const ProducerName = styled.h1`
  ${({ theme }) => theme.fonts.caption_large}

  color: ${({ theme }) => theme.colors.white};

  margin-top: 2.4rem;
`;

const ProducerEmail = styled.h2`
  ${({ theme }) => theme.fonts.hashtag}

  color: ${({ theme }) => theme.colors.white};

  margin-top: 1.2rem;
`;

const DetailInfoContainer = styled.section`
  width: 37rem;

  display: flex;
  justify-content: space-between;

  margin-top: 4.6rem;
`;

const CategoryBox = styled.div<{ isSelected: boolean }>`
  color: ${({ theme, isSelected }) => (isSelected ? theme.colors.white : theme.colors.gray4)};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HashtagBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HashtagIcon = styled(HashtagIc)`
  margin-bottom: 1.5rem;
`;

const DescriptionBox = styled.div`
  width: 43.6rem;

  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.fonts.description}
  color: ${({ theme }) => theme.colors.gray2};

  margin-top: 4.7rem;
`;

const Inroduce = styled.div`
  float: left;
`;
