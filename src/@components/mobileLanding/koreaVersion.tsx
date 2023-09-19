import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MobileBackgroundGradationIc1, MobileBackgroundGradationIc2, MobileHeadBackgroudnIc } from "../../assets";
// kakao 기능 동작을 위해 넣어준다.
const { Kakao } = window;

export default function KoreaVersion() {
  const [pageY, setPageY] = useState<number>(0);
  const documentRef = useRef(document);

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
  }, []);

  function handleKakaoShare() {
    if (!Kakao.isInitialized()) {
      Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
    }

    Kakao.Share.createCustomButton({
      container: "#kakao-link-btn",
      templateId: 98550,
      templateArgs: {
        title: "Track-1",
        description: "Discover Your Limitless Track",
      },
    });
  }

  function handleKakaoShare2() {
    if (!Kakao.isInitialized()) {
      Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
    }

    Kakao.Share.createCustomButton({
      container: "#kakao-link-btn2",
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
          <PcSaveButton id="kakao-link-btn" className="kor-pc1" onClick={handleKakaoShare}>
            PC 링크 저장해두기
          </PcSaveButton>
        </GotoPCSection>
        <Video
          pageY={pageY}
          controls
          poster="https://profile-image-bucket.s3.ap-northeast-2.amazonaws.com/default/sumbnail.png"
          preload="none">
          <source
            src="https://profile-image-bucket.s3.ap-northeast-2.amazonaws.com/default/landingVideo_Korean.mp4"
            type="video/mp4"
          />
          aaa
        </Video>
        <GotoPCBottomSection>
          <PcSaveButton id="kakao-link-btn2" className="kor-pc2" onClick={handleKakaoShare2}>
            PC 링크 저장해두기
          </PcSaveButton>
          <SmallPcComment>PC나 태블릿으로 접속하세요</SmallPcComment>
        </GotoPCBottomSection>
      </FrontContents>
      <MobileHeadBackgroudnIcon />
      <MobileBackgroundGradationIcon1 pageY={pageY} />
      <MobileBackgroundGradationIcon2 />
    </KoreaVersionSection>
  );
}

const GotoPCBottomSection = styled.section`
  margin-top: 155rem;

  text-align: center;
`;

const Video = styled.video<{ pageY: number }>`
  margin-top: ${({ pageY }) => (0.005 * pageY + 1.5 >= 20 ? 5.5 : 0.005 * pageY <= 1.5 ? 4 : 0.005 * pageY + 1.5)}rem;

  /* margin-top: ${({ pageY }) => (0.05 * pageY >= 32 ? 5 : 0.05 * pageY <= 1.5 ? 4 : 4.5)}rem; */
  width: 35.2rem;
  height: 19.8rem;
  background: #d9d9d9;

  margin-left: 2rem;
  /* margin-top: 4rem; */
`;

const PcSaveButton = styled.button`
  font-family: Pretendard;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 300;
  line-height: 160%;

  margin-top: 1.5rem;
  width: 21.5rem;
  height: 4.8rem;
  border-radius: 2.4rem;

  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme }) => theme.colors.main};
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

const SubTitle = styled.p<{ pageY: number }>`
  font-family: Pretendard;

  margin-top: ${({ pageY }) => (0.07 * pageY >= 40 ? 40 : 0.07 * pageY <= 1.5 ? 0 : 0.07 * pageY)}rem;

  font-size: ${({ pageY }) => (0.01 * pageY >= 5 ? 5 : 0.01 * pageY <= 1.5 ? 1.5 : 0.01 * pageY)}rem;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;

  width: 29.5rem;
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

const MobileBackgroundGradationIcon1 = styled(MobileBackgroundGradationIc1)<{ pageY: number }>`
  margin-top: ${({ pageY }) => (0.07 * pageY + 10 >= 50 ? 50 : 0.07 * pageY <= 1.5 ? 10 : 0.07 * pageY + 10)}rem;
  width: 39.3rem;
  height: 137rem;
`;

const MobileBackgroundGradationIcon2 = styled(MobileBackgroundGradationIc2)`
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
