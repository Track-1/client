import { useMutation } from "react-query";
import { patchProducerProfile, patchVocalProfile } from "../../api/profile";
import { ProfileEditType, VocalProfileEditType } from "../../type/profile";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginUserId } from "../../recoil/common/loginUserData";

export function useEditProdcerProfile() {
  const navigate = useNavigate();
  const userId = useRecoilValue(loginUserId);
  const { mutate, ...restValues } = useMutation({
    mutationFn: (editData: ProfileEditType) => patchProducerProfile(editData),
    onSuccess: () => {
      navigate(`/producer-profile/${userId}`);
    },
    onError: () => {},
  });
  return {
    editProducerProfile: mutate,
    ...restValues,
  };
}

export function useEditVocalProfile() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: (editData: VocalProfileEditType) => patchVocalProfile(editData),
    onSuccess: () => {},
    onError: () => {},
  });
  return {
    editVocalProfile: mutate,
    ...restValues,
  };
}
