import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ProducerProfileShadowIc, RightArrorIc } from "../../assets";
import { producerState } from "../../recoil/common/profile";

export default function ProducerProfileShadow() {
  const [dataState, setDataState] = useRecoilState(producerState);

  function handleChangeDataState(state: string) {
    console.log(state);
    setDataState(state);
  }

  return (
    <ProducerProfileShadowWrapper>
      <TitleWrapper>
        <Title isSelected={dataState === "Portfolio"} onClick={() => handleChangeDataState("Portfolio")}>
          <IconWrapper>{dataState === "Portfolio" && <RightArrorIcon />}</IconWrapper>Portfolio
        </Title>
        <Title isSelected={dataState === "Vocal Searching"} onClick={() => handleChangeDataState("Vocal Searching")}>
          <IconWrapper>{dataState === "Vocal Searching" && <RightArrorIcon />}</IconWrapper>Vocal Searching
        </Title>
      </TitleWrapper>
      <ProducerProfileShadowIcon />
    </ProducerProfileShadowWrapper>
  );
}

const IconWrapper = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 1rem;
`;

const RightArrorIcon = styled(RightArrorIc)`
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 1rem;
`;

const ProducerProfileShadowWrapper = styled.section`
  position: fixed;
`;
const ProducerProfileShadowIcon = styled(ProducerProfileShadowIc)`
  position: relative;
  z-index: -2;
`;

const Title = styled.p<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  height: 4rem;
  ${({ theme }) => theme.fonts.body1};
  color: ${({ isSelected, theme }) => (isSelected ? theme.colors.white : theme.colors.gray3)};

  cursor: pointer;
`;

const TitleWrapper = styled.header`
  display: flex;
  flex-direction: column;
  position: absolute;

  margin: 6rem 0 0 5.6rem;
`;
