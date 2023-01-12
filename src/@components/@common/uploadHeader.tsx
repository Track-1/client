import styled from "styled-components";
import { UploadInfo } from "../../core/api/upload";
import { UploadBackIc, UploadBtnIc, CanUploadBtnIc } from "../../assets";
import { useNavigate } from "react-router-dom";
import {
  uploadTitle,
  uploadCategory,
  uploadIntroduce,
  uploadKeyword,
  uploadTrackJacketImage,
  uploadVocalJacketImage,
  uploadWavFile,
  defaultImageState,
} from "../../recoil/upload";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { UploadData } from "../../type/uploadData";
import { currentUser } from "../../core/constants/userType";
import { uploadButtonClickedInTrackList } from "../../recoil/uploadButtonClicked";

interface PropsType {
  userType: string;
  producerUploadType: string | undefined;
}

export default function UploadHeader(props: PropsType) {
  const { userType, producerUploadType } = props;
  const jacketImageKey = userType === currentUser.PRODUCER ? uploadTrackJacketImage : uploadVocalJacketImage;
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useRecoilState<boolean>(uploadButtonClickedInTrackList);
  const [image, setImage] = useRecoilState(jacketImageKey);

  let formdata = new FormData();
  formdata.append("defaultImage", image);

  const postData: UploadData = {
    title: useRecoilValue(uploadTitle),
    category: useRecoilValue(uploadCategory),
    wavFile: useRecoilValue(uploadWavFile),
    introduce: useRecoilValue(uploadIntroduce),
    keyword: useRecoilValue(uploadKeyword),
    jacketImage: useRecoilValue(defaultImageState) ? formdata : image,
  };

  const resetTitle = useResetRecoilState(uploadTitle);
  const resetCategory = useResetRecoilState(uploadCategory);
  const resetWavFile = useResetRecoilState(uploadWavFile);
  const resetIntroduce = useResetRecoilState(uploadIntroduce);
  const resetKeyword = useResetRecoilState(uploadKeyword);
  const resetJacketImage = useResetRecoilState(jacketImageKey);
  const resetDefaultState = useResetRecoilState(defaultImageState);

  const [isUploadActive, setIsUploadActive] = useState<boolean>(false);

  const { mutate } = useMutation(post, {
    onSuccess: () => {
      console.log(postData);
      resetTitle();
      resetCategory();
      resetWavFile();
      resetIntroduce();
      resetKeyword();
      resetJacketImage();
      resetDefaultState();
      userType === "producer" ? navigate("/track-search") : navigate("/mypage");
    },
    onError: (error) => {
      console.log("에러!!", error);
    },
  });

  async function post() {
    if (postData.wavFile !== null) {
      console.log(postData);
      const data = await UploadInfo(postData, userType, producerUploadType);
      return data;
    }
  }

  function backPage(e: React.MouseEvent<SVGSVGElement>) {
    navigate("/track-search");
  }

  function upload(e: React.MouseEvent<SVGSVGElement>) {
    setOpenModal(false);
    if (isUploadActive) {
      mutate();
    }
  }
  useEffect(() => {
    if (
      postData.title !== "" &&
      postData.category !== "" &&
      postData.wavFile !== null &&
      postData.keyword.length !== 0
    ) {
      setIsUploadActive(true);
    } else {
      setIsUploadActive(false);
    }
  }, [postData.title, postData.category, postData.wavFile, postData.introduce, postData.keyword]);

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
