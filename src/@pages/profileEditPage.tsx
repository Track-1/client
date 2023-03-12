import styled from "styled-components";
import { useEffect, useState } from "react";
import ProfileEditInfo from "../@components/@common/profileEditInfo";
import ProfileEditHeader from "../@components/profileEdit/profileEditHeader";
import ProducerProfileEditTitle from "../@components/profileEdit/producerProfileEditTitle";
import { editInputDatas } from "../core/editProfile/editData";
import { EditDataType, nickName } from "../type/editDataType";
import VocalProfileEditTitle from "../@components/profileEdit/vocalProfileEditTitle";
import { currentUser } from "../core/constants/userType";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getVocalProfile } from "../core/api/vocalProfile";
import { getProducerPortfolio } from "../core/api/producerProfile";

export default function ProfileEditPage() {
  const [editDatas, setEditDatas] = useState<EditDataType>(editInputDatas);
  const [isSave, setIsSave] = useState<boolean>(false);
  const [isMeetRequired, setIsMeetRequired] = useState<boolean>(false);
  const [user, setUser] = useState<string>(currentUser.PRODUCER);
  const [prevDatas, setPrevDatas] = useState<any>();
  const { state } = useLocation();

  const { data } = useQuery(
    ["userId", 1],
    () => (user === currentUser.PRODUCER ? getProducerPortfolio(4, 1) : getVocalProfile(1, 1)),
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
