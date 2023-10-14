import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { MobileTrack1Ic } from "../../assets";

interface HeaderProp {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
}

export default function MobileHeader(props: HeaderProp) {
  const { language, setLanguage } = props;

  function handleChangLanguage(language: string) {
    setLanguage(language);
  }

  return (
    <MobileHeaderSection>
      <MobileTrack1Icon />
      <LangauageSelect language={language}>
        <h1 className="Kor" onClick={() => handleChangLanguage("Kor")}>
          KOR
        </h1>
        <h1 className="Eng" onClick={() => handleChangLanguage("Eng")}>
          ENG
        </h1>
      </LangauageSelect>
    </MobileHeaderSection>
  );
}

const MobileHeaderSection = styled.header`
  position: absolute;
  display: flex;
  justify-content: space-between;

  padding: 4.7rem 2.07rem 6rem 2rem;
  width: 39.3rem;
`;

const MobileTrack1Icon = styled(MobileTrack1Ic)`
  width: 15.2rem;
  height: 1.44rem;
`;

const LangauageSelect = styled.ul<{ language: string }>`
  display: flex;
  justify-content: space-between;

  width: 7.2rem;

  font-family: "Pretendard";
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  .Kor {
    color: ${({ theme, language }) => (language === "Kor" ? "white" : theme.colors.gray3)};
  }

  .Eng {
    color: ${({ theme, language }) => (language === "Eng" ? "white" : theme.colors.gray3)};
  }
`;
