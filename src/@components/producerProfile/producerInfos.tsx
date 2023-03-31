import styled from "styled-components";
import { CategoryIc, DescriptionIc, HashtagIc, ProfileEditBtnIc, SleeperAccountIc } from "../../assets";
import { ProducerProfileType } from "../../type/producerProfile";
import BackButton from "../@common/backButton";
import HashTag from "../trackPost/hashTag";
import { useRecoilValue } from "recoil";
import { tracksOrVocalsCheck } from "../../recoil/tracksOrVocalsCheck";
import { Categories } from "../../core/constants/categories";
import { useNavigate } from "react-router-dom";
import { isTracksPage, isVocalsPage } from "../../utils/common/pageCategory";

interface PropsType {
  profileData: ProducerProfileType;
  isMe: boolean;
  whom: string;
}

export default function ProducerInfos(props: PropsType) {
  const { profileData, isMe, whom } = props;
  const navigate = useNavigate();
  const tracksOrVocals = useRecoilValue<string>(tracksOrVocalsCheck);

  function moveProfileEditPage() {
    navigate(`/profile-edit/${profileData.id}`, {
      state: {
        profileData: profileData,
        user: whom,
      },
    });
  }

  return (
    <InfoContainer>
      <InfoHeader>
        <BackButton />
        {isMe && <ProfileEditBtnIcon onClick={moveProfileEditPage} />}
        <Blank />
      </InfoHeader>
      {isVocalsPage(whom) && (
        <VocalProfileImageContainer>
          <VocalProfileImage>
            <VocalProfileImg src={profileData?.profileImage} alt="프로필이미지" />
          </VocalProfileImage>
        </VocalProfileImageContainer>
      )}
      {isTracksPage(whom) && (
        <ProfileImage>
          <ProfileImg src={profileData?.profileImage} alt="프로필이미지" />
        </ProfileImage>
      )}

      <ProducerNameContainer>
        <ProducerName>{profileData.name}</ProducerName>
      </ProducerNameContainer>

      <ProducerEmail>{profileData.contact}</ProducerEmail>
      <DetailInfoContainer>
        <CategoryBox isSelected={true}>
          <CategoryIcon />
          <CategoryArray>
            {profileData.category.length > 0 ? (
              Object.values(Categories).map((value) =>
                profileData.category.includes(value) ? (
                  <Category>{value}</Category>
                ) : (
                  <NotCategory>{value}</NotCategory>
                ),
              )
            ) : (
              <EmptyProfileMessageWrapper>
                <EmptyProfileMessage>no information</EmptyProfileMessage>
              </EmptyProfileMessageWrapper>
            )}
          </CategoryArray>
        </CategoryBox>

        <HashtagBox>
          <HashtagIcon />
          {profileData.keyword?.length > 0 ? (
            profileData.keyword.map((word) => {
              return <HashTag text={word} />;
            })
          ) : (
            <EmptyProfileMessageWrapper>
              <EmptyProfileMessage>no information</EmptyProfileMessage>
            </EmptyProfileMessageWrapper>
          )}
        </HashtagBox>
      </DetailInfoContainer>
      <DescriptionBox>
        <DescriptionIcon />
        {profileData.introduce?.length > 0 && <Introduce>{profileData.introduce}</Introduce>}
      </DescriptionBox>
      <EmptyDescriptionMessageBox>
        <EmptyDescriptionMessageWrapper>
          <EmptyProfileMessage>no information</EmptyProfileMessage>
        </EmptyDescriptionMessageWrapper>
      </EmptyDescriptionMessageBox>
    </InfoContainer>
  );
}

const InfoContainer = styled.section`
  width: 60rem;

  position: fixed;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 6.6rem;
`;

const InfoHeader = styled.div`
  width: 60rem;

  display: flex;
  padding-left: 7.6rem;
  margin-top: -0.7rem;
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

const VocalProfileImageContainer = styled.div``;

const VocalProfileImg = styled.img`
  width: 150%;
  height: 150%;

  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;

  transform: rotate(45deg);
  position: absolute;
`;
const VocalProfileImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 19.3rem;
  width: 19.3rem;
  border-radius: 3rem;
  overflow: hidden;
  transform: rotate(-45deg);
  margin-top: 5rem;
  margin-bottom: 2.1rem;
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
  width: 45rem;

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
  width: 9.2rem;
  margin-bottom: 1.5rem;
`;

const DescriptionBox = styled.div`
  width: 28em;

  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.fonts.description}
  color: ${({ theme }) => theme.colors.gray2};

  margin-top: 4.7rem;
`;

const Introduce = styled.div`
  width: 28.5rem;
  outline: 0;
  resize: none;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
  border: none;
  background-color: transparent;
  margin-top: 0.5rem;
  margin-bottom: 3rem;
  overflow: hidden;
`;

const DescriptionIcon = styled(DescriptionIc)`
  width: 12rem;
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

const ProfileEditBtnIcon = styled(ProfileEditBtnIc)`
  width: 16.6rem;
  margin-left: 16.9rem;

  cursor: pointer;
`;

const CategoryIcon = styled(CategoryIc)`
  width: 10.2rem;
`;

const EmptyDescriptionMessageBox = styled.div`
  width: 44.8rem;
`;

const EmptyProfileMessageWrapper = styled.div`
  height: 10.3rem;

  display: flex;
  justify-content: center;

  margin-top: 6.2rem;
`;

const EmptyDescriptionMessageWrapper = styled.div`
  height: 10.3rem;
  margin-top: 6.2rem;
`;

const EmptyProfileMessage = styled.p`
  ${({ theme }) => theme.fonts.description}
  color: ${({ theme }) => theme.colors.gray4};
`;
