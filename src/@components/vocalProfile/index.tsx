import { useParams } from "react-router-dom";
import useGetVocalProfile from "../../hooks/vocalProfile/useGetVocalProfile";
import Profile from "../profile";

export default function VocalProfile() {
  const { vocalId } = useParams();
  const { vocalProfile } = useGetVocalProfile(Number(vocalId));
  console.log(vocalProfile?.userProfile);

  return (
    <>
      <Profile userType="vocal" userSelf={vocalProfile?.userSelf} userProfile={vocalProfile?.userProfile} />
    </>
  );
}
