import styled from 'styled-components';
import Text from '../../common/Text';
import { UserType } from '../../../type/common/userType';
import { isProducer, isVocal } from '../../../utils/common/check';
import { StyledDivisionLine } from '../../common/DivisionLine';
import { ProducerInfoType, VocalProfileType } from '../../../type/profile';

interface UserInfoProfile {
  userType: UserType;
  profileInfo: VocalProfileType | ProducerInfoType | undefined;
}

export default function UserProfile(props: UserInfoProfile) {
  const { userType, profileInfo } = props;

  return (
    <Container>
      <PersonalProfileWrapper>
        <UserImageWrapper>
          <UserImage src={profileInfo?.userProfile.userImageFile} />
          {userType && isVocal(userType) && <VocalTag>Vocal</VocalTag>}
        </UserImageWrapper>
        <Text as="span" font="Alex_25_R" color="white" margin="2rem 0 1rem">
          {profileInfo?.userProfile.userName}
        </Text>
        <Text as="span" font="Pre_16_R" color={isProducer(userType) ? 'neon_green' : 'neon_pink'}>
          {profileInfo?.userProfile.userContact}
        </Text>
      </PersonalProfileWrapper>

      <DivisionLine />

      <TrackProfileWrapper>
        <TrackInfoForm>
          <Text as="h5" font="Pre_14_M" color="gray3">
            Category
          </Text>

          <TrackInfoWrapper>
            {profileInfo?.userProfile.userCategory.map((category) => (
              <Text as="span" font="Pre_14_R" color="white">
                {category}
              </Text>
            ))}
          </TrackInfoWrapper>
        </TrackInfoForm>

        <TrackInfoForm>
          <Text as="h5" font="Pre_14_M" color="gray3">
            Hashtag
          </Text>
          <TrackInfoWrapper>
            {profileInfo?.userProfile.userKeyword.map((keyword) => (
              <Keyword>{keyword}</Keyword>
            ))}
          </TrackInfoWrapper>
        </TrackInfoForm>

        <TrackInfoForm>
          <Text as="h5" font="Pre_14_M" color="gray3">
            Description
          </Text>
          <TrackInfoWrapper>
            <Text as="span" font="Pre_14_R" color="white">
              {profileInfo?.userProfile.userIntroduction}
            </Text>
          </TrackInfoWrapper>
        </TrackInfoForm>
      </TrackProfileWrapper>
    </Container>
  );
}

const Container = styled.section`
  width: 100%;

  padding: 2rem 0 8rem;
`;

const PersonalProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 2.5rem;
`;

const UserImageWrapper = styled.div`
  position: relative;

  width: 22rem;
  height: 22rem;
`;

const UserImage = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 50%;
  object-fit: cover;
`;

export const Keyword = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.fonts.Pre_14_R};
  color: ${({ theme }) => theme.colors.white};

  padding: 0.7rem 1rem;

  background-color: ${({ theme }) => theme.colors.gray5};
  border-radius: 2.1rem;
`;

export const TrackProfileWrapper = styled.ul`
  display: flex;
  flex-direction: column;

  gap: 3rem;
`;

export const TrackInfoForm = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

export const TrackInfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  ${({ theme }) => theme.fonts.Pre_16_R}
  color: ${({ theme }) => theme.colors.white};

  line-height: 160%;
`;

const DivisionLine = styled(StyledDivisionLine)`
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

const VocalTag = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 6rem;
  height: 3rem;

  ${({ theme }) => theme.fonts.Alex_14_R};
  color: ${({ theme }) => theme.colors.black};

  background-color: ${({ theme }) => theme.colors.neon_pink};
  border-radius: 2rem;
`;
