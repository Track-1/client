import { useRecoilValue } from "recoil";
import ProducerProfileEditContainer from "../@components/profileEdit/producerProfileEdit/producerProfileEditContainer";
import VocalProfileEditContainer from "../@components/profileEdit/vocalProfileEdit/vocalProfileEditContainer";
import { loginUserType } from "../recoil/common/loginUserData";

export default function ProfileEditPage() {
  const user = useRecoilValue(loginUserType);

  return user === "producer" ? <ProducerProfileEditContainer /> : <VocalProfileEditContainer />;
}
