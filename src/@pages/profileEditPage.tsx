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
import { isTracksPage, isVocalsPage } from "../utils/common/pageCategory";
import Footer from "../@components/@common/footer";
import background from "../assets/icon/signUpBackgroundIc.svg";

export default function ProfileEditPage() {
  const [editDatas, setEditDatas] = useState<EditDataType>(editInputDatas);
  const [isSave, setIsSave] = useState<boolean>(false);
  const [isMeetRequired, setIsMeetRequired] = useState<boolean>(false);
 //const [user, setUser] = useState<string>(currentUser.PRODUCER);
  const [prevDatas, setPrevDatas] = useState<any>();
  const [patchData, setPatchData] = useState<any>();
  const { state } = useLocation();
  const navigate = useNavigate();
  const user=state.user;
  const profileData=state.profileData;
  //console.log("state"+state);

  useEffect(() => {
    const formData = new FormData();
    formData.append("imgFile", profileData?.profileImage);
    formData.append("name", profileData?.name);
    formData.append("contact", editDatas.contact);
    formData.append("category", editDatas.category[0]);
    formData.append("keyword", editDatas.keyword[0]);
    formData.append("introduce", editDatas.introduce);
    isVocalsPage(user) && formData.append("isSelected", "true");
    setPatchData(formData);
  }, [isSave]);

  const { mutate } = useMutation(
    () => (user === currentUser.PRODUCER ? patchProducerProfile(patchData) : patchVocalrProfile(patchData)),
    {
      onSuccess: () => {
        console.log("ok");
        navigate(-1);
      },
      onError: (e) => {
        console.log(e);

        navigate(-1);
      },
    },
  );

  useEffect(() => {
    patchData?.keys().length >= 6 && mutate(patchData);
    console.log(patchData, "dfdfdfd");
  }, [patchData]);

  const { data } = useQuery(
    ["userId", 1],
    () => (isTracksPage(user) ? getProducerPortfolio(profileData.id, 1) : getVocalProfile(profileData.id, 1)),
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
console.log(user)
  return (
    <>
      <ProfileEditHeader saveEditDatas={saveEditDatas} isMeetRequired={isMeetRequired} />
      <Img src={background} alt="배경"/>
      <EditContainer>
        {isTracksPage(user) && (
          <ProducerProfileEditTitle
            activeSaveButton={activeSaveButton}
            id={profileData.id}
            prevProfileImage={data?.producerProfile.profileImage}
            prevName={data?.producerProfile.name}
          />
        )}
        {isVocalsPage(user) && (
          <VocalProfileEditTitle
            activeSaveButton={activeSaveButton}
            id={profileData.id}
            prevProfileImage={data?.vocalProfile.profileImage}
            prevName={data?.vocalProfile.name}
          />
        )}
        <ProfileEditInfo
          isSave={isSave}
          editDatas={editDats}
          prevDatas={isTracksPage(user) ? profileData : data?.vocalProfile}
        />
      </EditContainer>
      <Footer/>
    </>
  );
}

const EditContainer = styled.section`
  display: flex;
  justify-content: space-between;

  width: 148rem;

  margin-left: 21.8rem;
  margin-bottom: 4rem;
`;

const Img=styled.img`
    position: absolute;
    width: 192rem;
    height: 98rem;

    //margin-top: -9.8rem;
`