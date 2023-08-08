import { useRecoilValue } from "recoil";
import ProducerSuccess from "../@components/signUp/producerSuccess";
import VocalSuccess from "../@components/signUp/vocalSuccess";
import { role } from "../recoil/common/role";
import { isProducer, isVocal } from "../utils/common/checkRoleType";

export default function SignupSuccessPage() {
  const userType = useRecoilValue(role);

  console.log(userType);

  return (
    <>
      {isProducer("producer") && <ProducerSuccess />}
      {isVocal(userType) && <VocalSuccess />}
    </>
  );
}
