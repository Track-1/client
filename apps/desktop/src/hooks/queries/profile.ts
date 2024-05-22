import { useMutation } from 'react-query';
import { patchProducerProfile, patchVocalProfile } from '../../api/profile';
import { ProfileEditType, VocalProfileEditType } from '../../type/profile';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginUserData } from '../../recoil/common/loginUserData';

export function useEditProdcerProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(loginUserData);
  const userId = userData.userId;
  const prevURL = useLocation().state?.prevURL;

  const { mutate, ...restValues } = useMutation({
    mutationFn: (editData: ProfileEditType) => patchProducerProfile(editData),
    onSuccess: (data, editData) => {
      setUserData({
        ...userData,
        userName: editData.userName,
        userContact: editData.userContact,
        userImageFile: data.data.userImageFile,
      });
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
  const [userData, setUserData] = useRecoilState(loginUserData);
  const userId = userData.userId;
  const prevURL = useLocation().state?.prevURL;

  const { mutate, ...restValues } = useMutation({
    mutationFn: (editData: VocalProfileEditType) => patchVocalProfile(editData),
    onSuccess: (data, editData) => {
      setUserData({
        ...userData,
        userName: editData.userName,
        userContact: editData.userContact,
        userImageFile: data.data.userImageFile,
      });
      console.log(data);
      console.log(editData);
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
