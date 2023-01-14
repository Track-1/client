import styled from "styled-components";
import { BackBtnIc, CategoryIc, DescriptionIc, HashtagIc, SleeperAccountIc } from "../../assets";
import { useState } from "react";
import thumbnailImg from "../../assets/image/thumbnailImg.png";
import { theme } from "../../style/theme";
import { ProducerProfileType } from "../../type/producerProfile";
import BackButton from "../@common/backButton";
import HashTag from "../trackPost/hashTag";
import { useRecoilValue } from "recoil";
import { tracksOrVocalsCheck } from "../../recoil/tracksOrVocalsCheck";
import { trackSearching } from "../../recoil/categorySelect";
import { useNavigate } from "react-router-dom";

interface PropsType {
  profileData: ProducerProfileType;
}

export default function ProducerInfos(props: PropsType) {
  const navigate = useNavigate();
  const { profileData } = props;
  const tracksOrVocals = useRecoilValue<string>(tracksOrVocalsCheck);
  const trackSearch = useRecoilValue<boolean>(trackSearching);

  
  console.log(trackSearch);
  
  return (
    <InfoContainer>
      <InfoHeader>
        <BackButton />
        <Blank />
      </InfoHeader>
      {tracksOrVocals === "Vocals" ? (
        <VocalProfileImageContainer>
          <VocalProfileImage>
            <VocalProfileImg src={profileData.profileImge} alt="프로필이미지" />
          </VocalProfileImage>
        </VocalProfileImageContainer>
      ) : (
        <ProfileImage>
          <ProfileImg src={profileData.profileImge} alt="프로필이미지" />
        </ProfileImage>
      )}

      <ProducerNameContainer>
        <ProducerName>{profileData.name}</ProducerName>
      {/* /  {tracksOrVocals === "Vocals" && !trackSearch && <SleeperAccountIcon />} */}
      </ProducerNameContainer>

      <ProducerEmail>{profileData.contact}</ProducerEmail>
      <DetailInfoContainer>
        <CategoryBox isSelected={true}>
          <CategoryIc />
          {/* //로직 수정 필요 */}
          <CategoryArray>
            {/* {profileData.category } */}
            {profileData.category.indexOf("R&B") > -1 ? <Category>R&B</Category> : <NotCategory>R&B</NotCategory>}
            {profileData.category.indexOf("Hiphop") > -1 ? (
              <Category>Hiphop</Category>
            ) : (
              <NotCategory>Hiphop</NotCategory>
            )}
            {profileData.category.indexOf("Ballad") > -1 ? (
              <Category>Ballad</Category>
            ) : (
              <NotCategory>Ballad</NotCategory>
            )}
            {profileData.category.indexOf("Pop") > -1 ? <Category>Pop</Category> : <NotCategory>Pop</NotCategory>}
            {profileData.category.indexOf("Rock") > -1 ? <Category>Rock</Category> : <NotCategory>Rock</NotCategory>}
            {profileData.category.indexOf("EDM") > -1 ? <Category>EDM</Category> : <NotCategory>EDM</NotCategory>}
            {profileData.category.indexOf("JAZZ") > -1 ? <Category>JAZZ</Category> : <NotCategory>JAZZ</NotCategory>}
            {profileData.category.indexOf("House") > -1 ? <Category>House</Category> : <NotCategory>House</NotCategory>}
            {profileData.category.indexOf("Funk") > -1 ? <Category>Funk</Category> : <NotCategory>Funk</NotCategory>}
          </CategoryArray>
        </CategoryBox>
        <HashtagBox>
          <HashtagIcon />
          {profileData.keyword.map((word) => {
            return <HashTag text={word} />;
          })}
        </HashtagBox>
      </DetailInfoContainer>
      <DescriptionBox>
        <DescriptionIcon />
        <Inroduce>{profileData.introduce}</Inroduce>
      </DescriptionBox>
    </InfoContainer>
  );
}

const InfoContainer = styled.section`
  width: 61rem;

  position: fixed;

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

const ProfileImg = styled.img`
  height: 25.8rem;
  width: 26.1rem;

  border-radius: 50%;
`;
const ProfileImage = styled.div`
  background-repeat: no-repeat;
  background-size: contain;

  margin-top: 2rem;
`;

const VocalProfileImageContainer = styled.div`
  margin-top: 5rem;
  margin-bottom: 2.1rem;

  height: 19.3rem;
  width: 19.3rem;

  border-radius: 3rem;
  transform: rotate(45deg);

  overflow: hidden;
`;

const VocalProfileImg = styled.img`
  height: 26.8rem;
  width: 26.7rem;

  position: relative;

  top: -2rem;
  left: -0.5rem;
  right: 0;
  bottom: 0;
`;
const VocalProfileImage = styled.div`
  background-repeat: no-repeat;
  background-size: contain;
  transform: rotate(-45deg);
`;

const ProducerNameContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

const ProducerName = styled.h1`
  ${({ theme }) => theme.fonts.caption_large}

  color: ${({ theme }) => theme.colors.white};

  margin-top: 2.4rem;
`;

const SleeperAccountIcon = styled(SleeperAccountIc)`
  margin-left: 1.5rem;
`;

const ProducerEmail = styled.h2`
  ${({ theme }) => theme.fonts.hashtag}

  color: ${({ theme }) => theme.colors.white};

  margin-top: 1.2rem;
`;

const DetailInfoContainer = styled.section`
  width: 43.5rem;

  display: flex;
  justify-content: space-between;

  margin-top: 4.6rem;
`;

const NotCategory = styled.li`
  color: ${({ theme }) => theme.colors.gray4};

  ${({ theme }) => theme.fonts.hashtag};

  margin-bottom: 1.1rem;
  margin-right: 3.2rem;

  display: flex;
  flex-direction: column;
`;

const CategoryBox = styled.div<{ isSelected: boolean }>`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.hashtag};

  display: flex;
  flex-direction: column;
`;

const HashtagBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin-right: 3.59rem;
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
  width: 28.5rem;

  word-break: keep-all;

  float: left;
`;

const DescriptionIcon = styled(DescriptionIc)`
  margin-top: 0.7rem;
  margin-right: 2.9rem;
`;

const CategoryArray = styled.ul`
  height: 14.4rem;
  column-count: 2;
  margin-top: 2.5rem;
`;
const Category = styled.li`
  //padding-bottom: 1.1rem;
  margin-bottom: 1.1rem;
`;
