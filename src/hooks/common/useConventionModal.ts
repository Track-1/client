import { useRecoilState } from "recoil";
import { openConventionModal } from "../../recoil/common/conventionModal";
import { ConventionModalType } from "../../type/common/conventionModalType";

export default function useConventionModal() {
  const [conventionModalInform, setConventionModalInform] = useRecoilState<ConventionModalType>(openConventionModal);

  function showConventionModal(policy: string, isOpen: boolean) {
    setConventionModalInform({ policy: policy, isOpen: isOpen });
  }

  return { conventionModalInform, showConventionModal };
}
