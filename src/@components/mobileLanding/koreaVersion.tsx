import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MobileBackgroundGradationIc1, MobileBackgroundGradationIc2, MobileHeadBackgroudnIc } from "../../assets";

export default function KoreaVersion() {
  const [pageY, setPageY] = useState<number>(0);
  const documentRef = useRef(document);

  useEffect(() => {
    documentRef.current.addEventListener("scroll", handleScroll);
    return () => documentRef.current.removeEventListener("scroll", handleScroll);
  }, [pageY]);

  const handleScroll = () => {
    const { pageYOffset } = window;
    setPageY(pageYOffset);
  };

  console.log(pageY);

  return (
    <KoreaVersionSection>
      <FrontContents>
        <TextField>
          <FirstTitle pageY={pageY}>
            여기 보컬
            <br /> 진짜 많아요.
          </FirstTitle>
          <SecondTitle pageY={pageY}>여기 보컬 진짜 많아요.</SecondTitle>
          <Sub>내 노래에 맞는 보컬, 직접 들어보고 구하세요!</Sub>
        </TextField>
        <GotoPCSection>
          <SmallTitle pageY={pageY}>PC로 접속하면 만날 수 있어요</SmallTitle>
          <PcSaveButton>PC 링크 저장해두기</PcSaveButton>
        </GotoPCSection>
        <Audio></Audio>
        <GotoPCBottomSection>
          <PcSaveButton>PC 링크 저장해두기</PcSaveButton>
          <SmallPcComment>PC나 태블릿으로 접속하세요</SmallPcComment>
        </GotoPCBottomSection>
      </FrontContents>
      <MobileHeadBackgroudnIcon />
      <MobileBackgroundGradationIcon1 />
      <MobileBackgroundGradationIcon2 />
    </KoreaVersionSection>
  );
}

const GotoPCBottomSection = styled.section`
  margin-top: 170rem;

  text-align: center;
`;

const Audio = styled.div`
  width: 35.3rem;
  height: 19.8rem;
  background: #d9d9d9;

  margin-left: 2rem;
  margin-top: 4rem;
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

const FirstTitle = styled.h1<{ pageY: number }>`
  font-family: Pretendard;
  font-size: ${({ pageY }) => (5 - 0.1 * pageY >= 5 ? 5 : pageY > 42 ? 3.3 : 5 - 0.1 * pageY)}rem;

  font-style: normal;
  font-weight: 600;
  line-height: 120%;

  width: 24.9rem;

  display: ${({ pageY }) => (pageY >= 40 ? "none" : "flex")};
  flex-wrap: wrap;
`;

const SecondTitle = styled.h1<{ pageY: number }>`
  font-family: Pretendard;
  font-size: ${({ pageY }) => (5 - 0.1 * pageY <= 1.7 ? 1.7 : 5 - 0.1 * pageY >= 3.3 ? 3.3 : 5 - 0.1 * pageY)}rem;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;

  margin-bottom: -1rem;

  display: ${({ pageY }) => (pageY < 40 ? "none" : "block")};
`;

const SmallTitle = styled.p<{ pageY: number }>`
  font-family: Pretendard;
  font-size: ${({ pageY }) => (pageY * 0.1 >= 5 ? 5 : pageY * 0.1 <= 1.5 ? 1.5 : pageY * 0.1)}rem;
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
  /* 애니메이션 필요 */
  margin-top: 14rem;
  margin-bottom: 0rem;
`;

const MobileBackgroundGradationIcon1 = styled(MobileBackgroundGradationIc1)`
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
