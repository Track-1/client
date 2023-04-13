import Footer from "../@components/@common/footer";
import backgroundImg from "../assets/image/backgroundImg.png";
import LoginInput from "../@components/login/loginInput";
import styled from "styled-components";
import { BackButtonIc } from "../assets";
import useMovePage from "../utils/hooks/useMovePage";
import BackButton from "../@components/@common/backButton";
import { useRecoilState } from "recoil";
import { clickCategoryHeader } from "../recoil/categorySelect";
import { useEffect } from "react";

export default function LoginPage() {
  const [movePage] = useMovePage();
  const [isClickedCategory, setIsClickedCategory] = useRecoilState(clickCategoryHeader);

  useEffect(()=>{
    setIsClickedCategory(true)
  },[])

  return (
    <>
      <BackButtonWrapper onClick={() => movePage("/")} >
        <BackButton />
      </BackButtonWrapper>

      <LoginInput />
      <BackgroundImg src={backgroundImg} alt="배경사진" />
      <Footer />
    </>
  );
}

const BackButtonWrapper = styled.div`
  margin: 5.9rem 0 0 7.9rem;
`;

const BackgroundImg = styled.img`
  margin-top: 19.6rem;
  width: 192rem;
`;
