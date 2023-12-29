import styled from 'styled-components';
import Text from '../../common/Text';
import { UserType } from '../../../type/common/userType';
import { isProducer } from '../../../utils/common/check';
import { StyledLined } from '../../common/DivisionLine';
import { ProducerInfoType, VocalProfileType } from '../../../type/profile';

interface UserInfoProfile {
  userType: UserType;
  profileInfo: VocalProfileType | ProducerInfoType | undefined;
}

export default function UserProfile(props: UserInfoProfile) {
  const { userType, profileInfo } = props;

  console.log(profileInfo?.userProfile);
  return (
    <Container>
      <PersonalProfileWrapper>
        <UserImageWrapper>
          <UserImage src={profileInfo?.userProfile.userImageFile} />
        </UserImageWrapper>
        <Text as="span" font="Alex_25_R" color="white" margin="2rem 0 1rem">
          {profileInfo?.userProfile.userName}
        </Text>
        <Text as="span" font="Pre_16_R" color={isProducer(userType) ? 'neon_green' : 'neon_pink'}>
          {profileInfo?.userProfile.userContact}
        </Text>
      </PersonalProfileWrapper>

      <Divider />

      <MusicalProfileWrapper>
        <MusicalInfoForm>
          <Text as="h5" font="Pre_14_M" color="gray3">
            Category
          </Text>

          <MusicalInfoWrapper>
            {profileInfo?.userProfile.userCategory.map((category) => (
              <Text as="h5" font="Pre_14_R" color="white">
                {category}
              </Text>
            ))}
          </MusicalInfoWrapper>
        </MusicalInfoForm>

        <MusicalInfoForm>
          <Text as="h5" font="Pre_14_M" color="gray3">
            Hashtag
          </Text>
          <MusicalInfoWrapper>
            {profileInfo?.userProfile.userKeyword.map((keyword) => (
              <Text as="h5" font="Pre_14_R" color="white">
                {keyword}
              </Text>
            ))}
          </MusicalInfoWrapper>
        </MusicalInfoForm>

        <MusicalInfoForm>
          <Text as="h5" font="Pre_14_M" color="gray3">
            Description
          </Text>
          <MusicalInfoWrapper>
            <Text as="h5" font="Pre_14_R" color="white">
              {profileInfo?.userProfile.userIntroduction}
            </Text>
          </MusicalInfoWrapper>
        </MusicalInfoForm>
      </MusicalProfileWrapper>
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
  width: 22rem;
  height: 22rem;
`;

const UserImage = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 50%;
  object-fit: cover;
`;

const MusicalProfileWrapper = styled.ul`
  display: flex;
  flex-direction: column;

  gap: 3rem;
`;

const MusicalInfoForm = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const MusicalInfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  ${({ theme }) => theme.fonts.Pre_16_R}
  color: ${({ theme }) => theme.colors.white};

  line-height: 160%;
`;

const Divider = styled(StyledLined)`
  margin: 2.5rem 0;
`;
