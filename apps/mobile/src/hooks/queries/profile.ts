import { useMutation } from 'react-query';
import { patchProducerProfile, patchVocalProfile } from '../../api/profile';
import { ProfileEditType, VocalProfileEditType } from '../../type/profile';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginUserData } from '../../recoil/common/loginUserData';

export function useEditProdcerProfile() {
  const navigate = useNavigate();
  const { userId } = useRecoilValue(loginUserData);
  const prevURL = useLocation().state?.prevURL;
  const { mutate, ...restValues } = useMutation({
    mutationFn: (editData: ProfileEditType) => patchProducerProfile(editData),
    onSuccess: () => {
      setTimeout(() => {
        navigate(`/producer-profile/${userId}`, {
          state: {
            prevURL: prevURL,
          },
        });
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
  const { userId } = useRecoilValue(loginUserData);
  const prevURL = useLocation().state?.prevURL;

  const { mutate, ...restValues } = useMutation({
    mutationFn: (editData: VocalProfileEditType) => patchVocalProfile(editData),
    onSuccess: () => {
      setTimeout(() => {
        navigate(`/vocal-profile/${userId}`, {
          state: {
            prevURL: prevURL,
          },
        });
      }, 3000);
    },
    onError: () => {},
  });
  return {
    editVocalProfile: mutate,
    ...restValues,
  };
}
