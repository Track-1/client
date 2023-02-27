import styled from "styled-components";
import { useEffect, useState } from "react";
import ProfileEditInfo from "../@components/@common/profileEditInfo";
import ProfileEditHeader from "../@components/profileEdit/profileEditHeader";
import ProducerProfileEditTitle from "../@components/profileEdit/producerProfileEditTitle";
import { editInputDatas } from "../core/editProfile/editData";
import { EditDataType } from "../type/editDataType";
import VocalProfileEditTitle from "../@components/profileEdit/vocalProfileEditTitle";
import { currentUser } from "../core/constants/userType";

export default function ProfileEditPage() {
  const [editDatas, setEditDatas] = useState<EditDataType>(editInputDatas);
  const [isSave, setIsSave] = useState<boolean>(false);
  const [isMeetRequired, setIsMeetRequired] = useState<boolean>(false);
  const [user, setUser] = useState<string>(currentUser.VOCAL);
  function editDats(datas: any) {
    setEditDatas(datas);
  }

  function saveEditDatas() {
    setIsSave(true);
  }

  function activeSaveButton(inputState: string) {
    inputState === "correct" ? setIsMeetRequired(true) : setIsMeetRequired(false);
  }

  return (
    <>
      <ProfileEditHeader saveEditDatas={saveEditDatas} isMeetRequired={isMeetRequired} />
      <EditContainer>
        {user === currentUser.PRODUCER && <ProducerProfileEditTitle activeSaveButton={activeSaveButton} />}
        {user === currentUser.VOCAL && <VocalProfileEditTitle activeSaveButton={activeSaveButton} />}
        <ProfileEditInfo isSave={isSave} editDatas={editDats} />
      </EditContainer>
    </>
  );
}

const EditContainer = styled.section`
  display: flex;
  justify-content: space-between;

  padding: 0 21.8rem;
`;
