import styled from "styled-components";
import { UploadInfo } from "../../core/api/upload";
import { UploadBackIc, UploadBtnIc, CanUploadBtnIc } from "../../assets";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { UploadData } from "../../type/uploadData";
import { currentUser } from "../../core/constants/userType";
import { uploadButtonClickedInTrackList } from "../../recoil/uploadButtonClicked";
import { UploadInfoDataType, UploadInfoRefType } from "../../type/uploadInfoDataType";

interface PropsType {
  userType: string;
  producerUploadType: string | undefined;
  uploadData: UploadInfoDataType;
  setUploadData: React.Dispatch<React.SetStateAction<UploadInfoDataType>>;
  uploadDataRef: UploadInfoRefType;
}

export default function UploadHeader(props: PropsType) {
  const { userType, producerUploadType, uploadData, setUploadData, uploadDataRef } = props;

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useRecoilState<boolean>(uploadButtonClickedInTrackList);

  const [isUploadActive, setIsUploadActive] = useState<boolean>(false);

  const { mutate } = useMutation(post, {
    onSuccess: () => {
      navigate(-1);
      userType === "producer" ? navigate(-1) : navigate("/vocal-profile/1");
    },
    onError: (error) => {
      console.log("에러!!", error);
    },
  });

  async function post() {
    // if (postData.wavFile !== null) {
    //   console.log(postData);
    //   const data = await UploadInfo(postData, userType, producerUploadType);
    //   return data;
    // }
  }

  function backPage(e: React.MouseEvent<SVGSVGElement>) {
    navigate(-1);
  }

  function upload(e: React.MouseEvent<SVGSVGElement>) {
    setOpenModal(false);
    if (isUploadActive) {
      mutate();
    }
    console.log(uploadData);
  }

  function checkMeetConditions(): void {
    if (!isEmptyTitle() && !isEmptyCategory() && !isEmptyWavFile() && !isEmptyKeyword()) {
      setIsUploadActive(true);
    } else {
      setIsUploadActive(false);
    }
  }

  function isEmptyTitle(): boolean {
    return uploadData.title === "";
  }

  function isEmptyCategory(): boolean {
    return uploadData.category === "Select";
  }

  function isEmptyWavFile(): boolean {
    return uploadData.wavFile === null;
  }

  function isEmptyKeyword(): boolean {
    return uploadData.keyword.length === 0;
  }

  useEffect(() => {
    checkMeetConditions();
  }, [uploadData]);

  return (
    <Container>
      <HeaderWrapper>
        <LeftWrapper>
          <UploadBackIcon onClick={backPage} />
          <UserClass> {producerUploadType}</UserClass>
        </LeftWrapper>
        {isUploadActive ? <CanUploadBtnIcon onClick={upload} /> : <UploadBtnIcon onClick={upload} />}
      </HeaderWrapper>
    </Container>
  );
}

const Container = styled.header`
  height: 13.8rem;
  width: 100%;
`;

const HeaderWrapper = styled.div`
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 7.5rem;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UserClass = styled.div`
  ${({ theme }) => theme.fonts.id};
  color: ${({ theme }) => theme.colors.gray3};
  margin-left: 6.1rem;
`;

const UploadBackIcon = styled(UploadBackIc)`
  cursor: pointer;
`;

const UploadBtnIcon = styled(UploadBtnIc)`
  cursor: pointer;
`;

const CanUploadBtnIcon = styled(CanUploadBtnIc)`
  cursor: pointer;
`;
