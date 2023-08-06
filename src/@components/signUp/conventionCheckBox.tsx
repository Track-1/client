import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ConventionBlankBoxIc, ConventionFullBoxIc } from "../../assets";
import { CONVENTION_SELECTED_CHECK } from "../../core/common/convention/conventionSelectedCheck";
import useConventionModal from "../../hooks/common/useConventionModal";
import { joinUserData } from "../../recoil/signUp/joinUserData";
import { ConventionChecksType } from "../../type/signUp/conventionChecksType";
import { JoinUserDataPropsType } from "../../type/signUp/joinUserDataType";

export default function ConventionCheckBox() {
  const [checkedCount, setCheckedCount] = useState<number>(0);
  const [userData, setUserData] = useRecoilState<JoinUserDataPropsType>(joinUserData);
  const [checkedConventions, setCheckedConventions] = useState<ConventionChecksType[]>(CONVENTION_SELECTED_CHECK);
  const { showConventionModal } = useConventionModal();

  function clickCategory(id: number) {
    setCheckedConventions(
      checkedConventions.map((checkedConvention) =>
        checkedConvention.id === id
          ? { ...checkedConvention, selected: !checkedConvention.selected }
          : checkedConvention,
      ),
    );

    if (checkFirstIndex(id)) {
      checkedConventions[id].selected
        ? setCheckedConventions(
            checkedConventions.map((checkedConvention) =>
              checkedConvention.id === id
                ? { ...checkedConvention, selected: false }
                : { ...checkedConvention, selected: false },
            ),
          )
        : setCheckedConventions(
            checkedConventions.map((checkedConvention) =>
              checkedConvention.id === id
                ? { ...checkedConvention, selected: true }
                : { ...checkedConvention, selected: true },
            ),
          );
    }
  }

  useEffect(() => {
    checkedConventions.forEach((checkedConvention) => {
      !checkFirstIndex(checkedConvention.id) && checkedConvention.selected
        ? setCheckedCount(checkedCount + 1)
        : setCheckedCount(checkedCount - 1);
    });

    let count = 0;
    checkedConventions.forEach((checkedConvention) => {
      if (!checkFirstIndex(checkedConvention.id) && checkedConvention.selected) {
        count += 1;
      }
    });
    setCheckedCount(count);
    setUserData({ ...userData, isAgree: `${checkedConventions[3].selected}` });
  }, [checkedConventions]);

  useEffect(() => {
    checkFullChecked() ? changeTotalAgree(true) : changeTotalAgree(false);
  }, [checkFullChecked()]);

  function checkFirstIndex(id: number) {
    return id === 0;
  }

  function checkFullChecked() {
    return checkedCount === 3;
  }

  function changeTotalAgree(bool: boolean) {
    const tempCheckedConventions = checkedConventions;
    tempCheckedConventions[0].selected = bool;
    setCheckedConventions([...tempCheckedConventions]);
  }

  return (
    <ConventionCheckBoxContainer>
      {checkedConventions.map(({ id, selected, text, policy }: ConventionChecksType) => (
        <ConventionCheckBoxWrapper checkFirstIndex={checkFirstIndex(id)}>
          <CheckBox onClick={() => clickCategory(id)}>
            {selected ? <ConventionFullBoxIcon /> : <ConventionBlankBoxIcon />}
          </CheckBox>
          <TextWrapper>
            <Title checkFirstIndex={checkFirstIndex(id)}>{text}</Title>
            <FullConvention checkFirstIndex={checkFirstIndex(id)} onClick={() => showConventionModal(policy, true)}>
              전체보기
            </FullConvention>
          </TextWrapper>
        </ConventionCheckBoxWrapper>
      ))}
    </ConventionCheckBoxContainer>
  );
}

const ConventionCheckBoxContainer = styled.section`
  margin-top: 2.6rem;
  margin-left: -2rem;
`;

const CheckBox = styled.article`
  cursor: pointer;
`;

const ConventionCheckBoxWrapper = styled.section<{ checkFirstIndex: boolean }>`
  display: flex;
  align-items: center;

  width: 56rem;
  height: ${({ checkFirstIndex }) => (checkFirstIndex ? 4.4 : 3.5)}rem;

  padding-bottom: ${({ checkFirstIndex }) => checkFirstIndex && 0.4}rem;
  margin-bottom: ${({ checkFirstIndex }) => checkFirstIndex && 0.9}rem;

  border-bottom: 0.1rem solid ${({ theme, checkFirstIndex }) => (checkFirstIndex ? theme.colors.gray4 : "transparent")};
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
`;

const Title = styled.h1<{ checkFirstIndex: boolean }>`
  color: ${({ theme, checkFirstIndex }) => (checkFirstIndex ? theme.colors.gray1 : theme.colors.gray2)};
  ${({ theme }) => theme.fonts.checkbox};
`;

const FullConvention = styled.p<{ checkFirstIndex: boolean }>`
  visibility: ${({ checkFirstIndex }) => (checkFirstIndex ? "hidden" : "visible")};

  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray3};

  color: ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.checkbox};

  cursor: pointer;
`;

const ConventionFullBoxIcon = styled(ConventionFullBoxIc)`
  width: 4rem;
  height: 4rem;
`;

const ConventionBlankBoxIcon = styled(ConventionBlankBoxIc)`
  width: 4rem;
  height: 4rem;
`;
