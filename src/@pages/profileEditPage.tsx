import styled from "styled-components";
import { useEffect, useState } from "react";
import ProfileEditInfo from "../@components/@common/profileEditInfo";
import ProfileEditHeader from "../@components/profileEdit/profileEditHeader";
import ProducerProfileEditTitle from "../@components/profileEdit/producerProfileEditTitle";
import { editInputDatas } from "../core/editProfile/editData";
import { EditDataType, nickName } from "../type/editDataType";
import VocalProfileEditTitle from "../@components/profileEdit/vocalProfileEditTitle";
import { currentUser } from "../core/constants/userType";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { getVocalProfile, patchVocalrProfile } from "../core/api/vocalProfile";
import { getProducerPortfolio, patchProducerProfile } from "../core/api/producerProfile";

export default function ProfileEditPage() {
  const [editDatas, setEditDatas] = useState<EditDataType>(editInputDatas);
  const [isSave, setIsSave] = useState<boolean>(false);
  const [isMeetRequired, setIsMeetRequired] = useState<boolean>(false);
  const [user, setUser] = useState<string>(currentUser.PRODUCER);
  const [prevDatas, setPrevDatas] = useState<any>();
  const [patchData, setPatchData] = useState<any>();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const formData = new FormData();
    formData.append("imgFile", prevDatas?.profileImage);
    formData.append("name", prevDatas?.name);
    formData.append("contact", editDatas.contact);
    formData.append("category", editDatas.category[0]);
    formData.append("keyword", editDatas.keyword[0]);
    formData.append("introduce", editDatas.introduce);
    user === currentUser.VOCAL && formData.append("isSelected", "true");
    setPatchData(formData);
  }, [isSave]);

  useEffect(() => {
    mutate();
  }, [patchData]);

  const { data } = useQuery(
    ["userId", 1],
    () => (user === currentUser.PRODUCER ? getProducerPortfolio(state.id, 1) : getVocalProfile(state.id, 1)),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        console.log(data);
        setPrevDatas(data);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  const { mutate } = useMutation(
    () => (user === currentUser.PRODUCER ? patchProducerProfile(patchData) : patchVocalrProfile(patchData)),
    {
      onSuccess: () => {
        console.log("ok");
        navigate(-1);
      },
      onError: () => {
        navigate(-1);
      },
    },
  );

  function editDats(datas: any) {
    setEditDatas(datas);
  }

  function saveEditDatas() {
    setIsSave(true);
  }

  function activeSaveButton(inputState: string) {
    inputState === nickName.CORRECT ? setIsMeetRequired(true) : setIsMeetRequired(false);
  }

  return (
    <>
      <ProfileEditHeader saveEditDatas={saveEditDatas} isMeetRequired={isMeetRequired} />
      <EditContainer>
        {user === currentUser.PRODUCER && (
          <ProducerProfileEditTitle
            activeSaveButton={activeSaveButton}
            id={state}
            prevProfileImage={data?.producerProfile.profileImage}
            prevName={data?.producerProfile.name}
          />
        )}
        {user === currentUser.VOCAL && (
          <VocalProfileEditTitle
            activeSaveButton={activeSaveButton}
            id={state}
            prevProfileImage={data?.vocalProfile.profileImage}
            prevName={data?.vocalProfile.name}
          />
        )}
        <ProfileEditInfo
          isSave={isSave}
          editDatas={editDats}
          prevDatas={user === currentUser.PRODUCER ? data?.producerProfile : data?.vocalProfile}
        />
      </EditContainer>
    </>
  );
}

const EditContainer = styled.section`
  display: flex;
  justify-content: space-between;

  padding: 0 21.8rem;
`;
