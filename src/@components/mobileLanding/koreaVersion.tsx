import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { MobileHeadBackgroudnIc } from "../../assets";
// kakao 기능 동작을 위해 넣어준다.
const { Kakao } = window;

export default function KoreaVersion() {
  const [pageY, setPageY] = useState<number>(0);
  const documentRef = useRef(document);
  const [isKakao, setIsKakao] = useState(false);
  const [isKakao2, setIsKakao2] = useState(false);

  useEffect(() => {
    documentRef.current.addEventListener("scroll", handleScroll);
    return () => documentRef.current.removeEventListener("scroll", handleScroll);
  }, [pageY]);

  function handleScroll() {
    const { pageYOffset } = window;
    setPageY(pageYOffset);
  }

  // 재랜더링시에 실행되게 해준다.
  useEffect(() => {
    // init 해주기 전에 clean up 을 해준다.
    Kakao.cleanup();
    // 자신의 js 키를 넣어준다.

    Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
    // 잘 적용되면 true 를 뱉는다.
    console.log(Kakao.isInitialized());
    // if (isKakao) {
    //   Kakao.Share.createCustomButton({
    //     container: "#kakao-link-btn",
    //     templateId: 98550,
    //     templateArgs: {
    //       title: "Track-1",
    //       description: "Discover Your Limitless Track",
    //     },
    //   });
    //   setIsKakao(false);
    // }

    // if (isKakao2) {
    //   Kakao.Share.createCustomButton({
    //     container: "#kakao-link-btn2",
    //     templateId: 98550,
    //     templateArgs: {
    //       title: "Track-1",
    //       description: "Discover Your Limitless Track",
    //     },
    //   });
    //   setIsKakao2(false);
    // }
  }, []);

  function handleKakaoShare() {
    setIsKakao(true);
    if (!Kakao.isInitialized()) {
      Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
    }

    // Kakao.Share.createCustomButton({
    Kakao.Share.sendCustom({
      // container: "#kakao-link-btn",
      templateId: 98550,
      templateArgs: {
        title: "Track-1",
        description: "Discover Your Limitless Track",
      },
    });
  }

  function handleKakaoShare2() {
    setIsKakao2(true);
    if (!Kakao.isInitialized()) {
      Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
    }

    // Kakao.Share.createCustomButton({
    Kakao.Share.sendCustom({
      // container: "#kakao-link-btn2",
      templateId: 98550,
      templateArgs: {
        title: "Track-1",
        description: "Discover Your Limitless Track",
      },
    });
  }

  return (
    <KoreaVersionSection>
      <FrontContents>
        <TextField>
          <FirstTitle>
            여기 보컬
            <br /> 진짜 많아요.
          </FirstTitle>
          <Sub>내 노래에 맞는 보컬, 직접 들어보고 구하세요!</Sub>
        </TextField>
        <GotoPCSection>
          <SubTitle pageY={pageY}>
            PC로 접속하면
            <br />
            만날 수 있어요
          </SubTitle>
          <PcSaveButton className="kor-pc1" onClick={handleKakaoShare} pageY={pageY}>
            PC 링크 저장해두기
          </PcSaveButton>
        </GotoPCSection>
        <Video
          pageY={pageY}
          controls
          playsInline
          className="kor-video"
          poster="https://profile-image-bucket.s3.ap-northeast-2.amazonaws.com/default/sumbnail.png">
          <source
            src="https://profile-image-bucket.s3.ap-northeast-2.amazonaws.com/default/landingVideo_Korean.mp4"
            type="video/mp4"
          />
          aaa
        </Video>
        <GotoPCBottomSection>
          <PcSaveButton className="kor-pc2" onClick={handleKakaoShare2} pageY={pageY}>
            PC 링크 저장해두기
          </PcSaveButton>
          <SmallPcComment>PC나 태블릿으로 접속하세요</SmallPcComment>
        </GotoPCBottomSection>
      </FrontContents>
      <MobileHeadBackgroudnIcon />
      {/* <MobileBackgroundGradationIcon1 pageY={pageY} ref={bg1Ref} /> */}
      {/* <MobileBackgroundGradationIcon2 ref={bg2Ref} /> */}
      <MobileBackgroundGradationIcon1
        src="https://profile-image-bucket.s3.ap-northeast-2.amazonaws.com/default/MobileBackgroundGradationIc1.svg"
        alt="사진"
        pageY={pageY}
        loading="lazy"
      />
      <MobileBackgroundGradationIcon2
        src="https://profile-image-bucket.s3.ap-northeast-2.amazonaws.com/default/MobileBackgroundGradationIc2.svg"
        alt="사진"
        loading="lazy"
      />
    </KoreaVersionSection>
  );
}

const GotoPCBottomSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 170rem;

  text-align: center;
`;

const Show = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
`;

const Video = styled.video<{ pageY: number }>`
  width: 35.2rem;
  height: 19.8rem;
  background: #d9d9d9;

  margin-left: 2rem;
  margin-top: 4rem;

  display: ${({ pageY }) => (pageY >= 500 ? "block" : "none")};

  animation: ${Show} 2s ease-out;
`;

const PcSaveButton = styled.button<{ pageY: number }>`
  font-family: Pretendard;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 300;
  line-height: 160%;

  margin-top: 2rem;
  width: 21.5rem;
  height: 4.8rem;
  border-radius: 2.4rem;

  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme }) => theme.colors.main};

  display: ${({ pageY }) => (pageY >= 500 ? "block" : "none")};
  animation: ${Show} 2s ease-out;
`;

const SmallPcComment = styled.p`
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: 160%;

  display: block;

  margin-top: 1.5rem;
`;

const FirstTitle = styled.h1`
  font-family: Pretendard;
  font-size: 5rem;

  font-style: normal;
  font-weight: 600;
  line-height: 120%;

  width: 24.9rem;

  display: flex;
  flex-wrap: wrap;
`;

const FontLarger = keyframes`
    0% {
     font-size:1.5rem;
     margin-top:7rem;
    }
    100% {
      font-size:5rem;
      margin-top:35rem;
    }
`;

const SubTitle = styled.p<{ pageY: number }>`
  font-family: Pretendard;

  /* animation: ${({ pageY }) => pageY > 30 && FontLarger} 2s ease-out; */

  margin-top: ${({ pageY }) => (0.07 * pageY >= 35 ? 35 : 0.07 * pageY <= 7 ? 7 : 0.07 * pageY)}rem;

  font-size: ${({ pageY }) => (0.03 * pageY >= 5 ? 5 : 0.03 * pageY <= 3.3 ? 3.3 : 0.03 * pageY)}rem;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
  color: ${({ pageY, theme }) => (pageY <= 30 ? theme.colors.gray3 : theme.colors.white)};

  width: 100%;
  text-align: center;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const FrontContents = styled.div`
  position: absolute;
  width: 39.3rem;

  margin-top: 12rem;
`;

const GotoPCSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextField = styled.div`
  padding-left: 2rem;
`;

const KoreaVersionSection = styled.section`
  color: ${({ theme }) => theme.colors.white};
`;

const MobileHeadBackgroudnIcon = styled(MobileHeadBackgroudnIc)`
  width: 39.3rem;
  height: 29.1rem;
  margin-top: 12rem;
  /* 애니메이션 필요 */
`;

const MobileBackgroundGradationIcon1 = styled.img<{ pageY: number }>`
  margin-top: ${({ pageY }) => (0.07 * pageY + 10 >= 47 ? 47 : 0.07 * pageY <= 1.5 ? 10 : 0.07 * pageY + 10)}rem;
  width: 39.3rem;
  height: 137rem;
`;

const MobileBackgroundGradationIcon2 = styled.img`
  width: 39.3rem;
  height: 104.7rem;
`;

const Sub = styled.p`
  font-family: Pretendard;
  font-size: 1.7rem;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;

  margin-top: 2rem;
  margin-bottom: 20rem;
`;
