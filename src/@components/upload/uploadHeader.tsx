import styled from "styled-components";
import { UploadInfo } from "../../core/api/upload";
import { UploadBtnIc, CanUploadBtnIc } from "../../assets";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { uploadButtonClickedInTrackList } from "../../recoil/uploadButtonClicked";
import { UploadInfoDataType } from "../../type/uploadInfoDataType";
import { checkUserType } from "../../utils/common/userType";
import { LoginUserId } from "../../recoil/loginUserData";
import BackButton from "../@common/backButton";
import { showPlayerBar } from "../../recoil/player";

interface PropsType {
  userType: string;
  producerUploadType: string | undefined;
  uploadData: UploadInfoDataType;
  setUploadData: React.Dispatch<React.SetStateAction<UploadInfoDataType>>;
}

export default function UploadHeader(props: PropsType) {
  const { userType, producerUploadType, uploadData } = props;

  const navigate = useNavigate();
  const loginUserId = useRecoilValue(LoginUserId);
  const [openModal, setOpenModal] = useRecoilState<boolean>(uploadButtonClickedInTrackList);
  const [isUploadActive, setIsUploadActive] = useState<boolean>(false);
  const [cursor, setCursor] = useState<string>("pointer");
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);

  const { mutate, isLoading } = useMutation(() => UploadInfo(uploadData, userType, producerUploadType), {
    onSuccess: () => {
      setShowPlayer(false);
      checkUserType(userType) ? navigate(-1) : navigate(`/vocal-profile/${loginUserId}`, { state: loginUserId });
    },
    onError: (error) => {
      console.log("에러!!", error);
    },
  });

  useEffect(() => {
    checkMeetConditions();
  }, [uploadData]);

  useEffect(() => {
    isLoading ? setCursor("wait") : setCursor("pointer");
  }, [isLoading]);

  function upload(e: React.MouseEvent<SVGSVGElement>) {
    if (!isLoading) {
      setOpenModal(false);
      mutate();
    }
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
    return uploadData.audioFile === null;
  }

  function isEmptyKeyword(): boolean {
    return uploadData.keyword.length === 0;
  }

  function movePreviousPage() {
    navigate(-1);
  }

  return (
    <Container>
      <HeaderWrapper>
        <LeftWrapper>
          <div onClick={movePreviousPage}>
            <BackButton />
          </div>
          <UserClass> {producerUploadType}</UserClass>
        </LeftWrapper>
        {isUploadActive ? <CanUploadBtnIcon onClick={upload} cursor={cursor} /> : <UploadBtnIcon />}
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

const CanUploadBtnIcon = styled(CanUploadBtnIc)`
  width: 24.6rem;
`;

const UploadBtnIcon = styled(UploadBtnIc)`
  width: 24.6rem;
`;
