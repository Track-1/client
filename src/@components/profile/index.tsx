import styled from "styled-components";
import { SleeperAccountIc } from "../../assets";
import ProfileCategory from "./profileCategory";
import ProfileDescription from "./profileDescription";
import ProfileHashtags from "./profileHashtags";

interface UserProfileType {
  userId: number;
  userImageFile: string;
  userName: string;
  userContact: string;
  userCategory?: string[];
  userKeyword: string[];
  userIntroduction: string;
  userTrackSearch: boolean;
}

interface ProfileProps {
  userType: string | undefined;
  userSelf: boolean | undefined;
  userProfile: UserProfileType | undefined;
}

export default function Profile(props: ProfileProps) {
  const { userType, userSelf, userProfile } = props;

  return (
    <ProfileWrapper>
      <Title>
        <Name>{userProfile?.userName}</Name>
        {userProfile?.userTrackSearch && <SleeperAccountIcon />}
      </Title>
      <Contact>{userProfile?.userContact}</Contact>
      <InfoWrapper>
        <ProfileCategory category={userProfile?.userCategory} />
        <ProfileHashtags keywords={userProfile?.userKeyword} />
      </InfoWrapper>
      <ProfileDescription introduce={userProfile?.userIntroduction} />
    </ProfileWrapper>
  );
}

const Title = styled.header`
  display: flex;
`;

const InfoWrapper = styled.article`
  display: flex;

  justify-content: flex-start;
  width: 43rem;
  margin-top: 4.6rem;
`;

const ProfileWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 60rem;
  height: 100vh;

  border: 1px solid white;
`;

const Name = styled.h1`
  ${({ theme }) => theme.fonts.caption_large}

  color: ${({ theme }) => theme.colors.white};
`;

const Contact = styled.h2`
  ${({ theme }) => theme.fonts.hashtag}

  color: ${({ theme }) => theme.colors.gray1};

  margin-top: 1.2rem;
  height: 1.2rem;
`;

const SleeperAccountIcon = styled(SleeperAccountIc)`
  margin-left: 1.5rem;

  height: 4.1rem;
  width: 4.1rem;
`;
