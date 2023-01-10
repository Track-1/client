import axios from "axios";
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
} from "../../recoil/upload";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

export default function UploadHeader() {
  const navigate = useNavigate();

  const title = useRecoilValue(uploadTitle);
  const category = useRecoilValue(uploadCategory);
  const wavFile = useRecoilValue(uploadWavFile);
  const introduce = useRecoilValue(uploadIntroduce);
  const keyword = useRecoilValue(uploadKeyword);
  const jacketImage = useRecoilValue(uploadTrackJacketImage);

  const postData = {
    title: title,
    category: category,
    wavFile: wavFile,
    introduce: introduce,
    keyword: keyword,
    jacketImage: jacketImage,
  };

  const [uploadState, setUploadState] = useState<boolean>(false);

  const { mutate, isLoading, isError, error, isSuccess } = useMutation(post)
  // console.log(mutate, isLoading, isError, error, isSuccess);

  async function post() {
    if (wavFile !== null) {
      const data = await UploadInfo(postData);
      return data;
    }
  }

  function backPage(e: React.MouseEvent<SVGSVGElement>) {
    navigate("/track-search");
  }

  function upload(e: React.MouseEvent<SVGSVGElement>) {
    if (uploadState) {
      post();
    }
  }
  useEffect(() => {
    if (title !== "" && category !== "" && wavFile !== null && keyword.length !== 0) {
      setUploadState(true);
    } else {
      setUploadState(false);
    }
  }, [title, category, wavFile, introduce, keyword]);

  return (
    <Container>
      <HeaderWrapper>
        <LeftWrapper>
          <UploadBackIcon onClick={backPage} />
          <UserClass>Vocal Searching</UserClass>
        </LeftWrapper>
        {uploadState ? <CanUploadBtnIcon onClick={upload} /> : <UploadBtnIcon onClick={upload} />}
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
  ${({ theme }) => theme.fonts.comment};
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
