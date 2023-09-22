import ProfileCategory from "./profileCategory";
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
    <>
      <ProfileCategory category={userProfile?.userCategory} />
      <ProfileHashtags keywords={userProfile?.userKeyword} />
    </>
  );
}
