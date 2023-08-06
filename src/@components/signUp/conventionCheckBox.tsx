import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ConventionBlankBoxIc, ConventionFullBoxIc } from "../../assets";
import { CONVENTION_SELECTED_CHECK } from "../../core/common/convention/conventionSelectedCheck";
import { NICKNAME_MESSAGE } from "../../core/signUp/errorMessage";
import useConventionModal from "../../hooks/common/useConventionModal";
import { isNextStep } from "../../recoil/signUp/isNextStep";
import { joinUserData } from "../../recoil/signUp/joinUserData";
import { ConventionChecksType } from "../../type/signUp/conventionChecksType";
import { JoinUserDataPropsType } from "../../type/signUp/joinUserDataType";

interface ConventionCheckBoxProp {
  nickNameMessage: string | undefined;
}

export default function ConventionCheckBox(props: ConventionCheckBoxProp) {
  const { nickNameMessage } = props;
  const [checkedCount, setCheckedCount] = useState<number>(0);
  const [userData, setUserData] = useRecoilState<JoinUserDataPropsType>(joinUserData);
  const [checkedConventions, setCheckedConventions] = useState<ConventionChecksType[]>(CONVENTION_SELECTED_CHECK);
  const { showConventionModal } = useConventionModal();
  const [isSuccess, setIsSuccess] = useRecoilState<boolean>(isNextStep);

  function clickCategory(id: number) {
    setCheckedConventions(
      checkedConventions.map((checkedConvention) =>
        checkedConvention.id === id
          ? { ...checkedConvention, selected: !checkedConvention.selected }
          : checkedConvention,
      ),
    );

    //전체 동의하기 클릭한 경우
    if (checkTotalAgree(id)) {
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
      !checkTotalAgree(checkedConvention.id) && checkedConvention.selected
        ? setCheckedCount(checkedCount + 1)
        : setCheckedCount(checkedCount - 1);
    });

    let count = 0;
    checkedConventions.forEach((checkedConvention) => {
      if (!checkTotalAgree(checkedConvention.id) && checkedConvention.selected) {
        count += 1;
      }
    });
    setCheckedCount(count);
    setUserData({ ...userData, isAgree: `${checkedConventions[3].selected}` });
    //  //닉네임이 success이고 필수가 다 체크됨
    if (nickNameMessage === NICKNAME_MESSAGE.SUCCESS && userData.isAgree !== "") {
      setIsSuccess(true);
    }
  }, [checkedConventions]);

  useEffect(() => {
    checkFullChecked() ? changeTotalAgree(true) : changeTotalAgree(false);
  }, [checkFullChecked()]);

  function checkTotalAgree(id: number) {
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
        <ConventionCheckBoxWrapper key={id} checkTotalAgree={checkTotalAgree(id)}>
          <CheckBox onClick={() => clickCategory(id)}>
            {selected ? <ConventionFullBoxIcon /> : <ConventionBlankBoxIcon />}
          </CheckBox>
          <TextWrapper>
            <Title checkTotalAgree={checkTotalAgree(id)}>{text}</Title>
            <FullConvention checkTotalAgree={checkTotalAgree(id)} onClick={() => showConventionModal(policy, true)}>
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

const ConventionCheckBoxWrapper = styled.section<{ checkTotalAgree: boolean }>`
  display: flex;
  align-items: center;

  width: 56rem;
  height: ${({ checkTotalAgree }) => (checkTotalAgree ? 4.4 : 3.5)}rem;

  padding-bottom: ${({ checkTotalAgree }) => checkTotalAgree && 0.4}rem;
  margin-bottom: ${({ checkTotalAgree }) => checkTotalAgree && 0.9}rem;

  border-bottom: 0.1rem solid ${({ theme, checkTotalAgree }) => (checkTotalAgree ? theme.colors.gray4 : "transparent")};
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
`;

const Title = styled.h1<{ checkTotalAgree: boolean }>`
  color: ${({ theme, checkTotalAgree }) => (checkTotalAgree ? theme.colors.gray1 : theme.colors.gray2)};
  ${({ theme }) => theme.fonts.checkbox};
`;

const FullConvention = styled.p<{ checkTotalAgree: boolean }>`
  visibility: ${({ checkTotalAgree }) => (checkTotalAgree ? "hidden" : "visible")};

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
