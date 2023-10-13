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
      setTimeout(() => {
        navigate(`/producer-profile/${userId}`);
      }, 3000);
    },
    onError: () => {},
  });
  return {
    editProducerProfile: mutate,
    ...restValues,
  };
}

export function useEditVocalProfile() {
  const navigate = useNavigate();
  const userId = useRecoilValue(loginUserId);
  const { mutate, ...restValues } = useMutation({
    mutationFn: (editData: VocalProfileEditType) => patchVocalProfile(editData),
    onSuccess: () => {
      setTimeout(() => {
        navigate(`/vocal-profile/${userId}`);
      }, 3000);
    },
    onError: () => {},
  });
  return {
    editVocalProfile: mutate,
    ...restValues,
  };
}
