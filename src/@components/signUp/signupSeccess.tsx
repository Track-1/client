import { useRecoilValue } from "recoil";
import { role } from "../../recoil/common/role";
import { isProducer, isVocal } from "../../utils/common/checkRoleType";
import Footer from "../@common/footer";
import ProducerSuccess from "./producerSuccess";
import VocalSuccess from "./vocalSuccess";

export default function SignupSuccess() {
  const userType = useRecoilValue(role);

  return (
    <>
      {isProducer(userType) && <ProducerSuccess />}
      {isVocal(userType) && <VocalSuccess />}
      <Footer />
    </>
  );
}
