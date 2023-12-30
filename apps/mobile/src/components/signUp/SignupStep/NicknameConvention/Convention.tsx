import { Fragment, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { CheckBox } from 'track-1-design-system';
import { useFormContextWithRef } from 'track-1-form-with-react-hook-form';
import { BtnDetailIc } from '../../../../assets';
import { CONVENTION_SELECTED_CHECK } from '../../../../core/common/convention/conventionSelectedCheck';
import { StyledLined } from '../../../common/DivisionLine';
import useConvention from '../../../common/Modal/useConvention';
import Text from '../../../common/Text';

interface ConventionLayoutProps {
  children: ReactNode;
  conventionIndex?: number;
}

function ConventionLayout(props: ConventionLayoutProps) {
  const { children, conventionIndex = 0 } = props;
  const { showConvention } = useConvention();

  function handleShowConvention(index:number){
    showConvention({ index: index })
  }

  return (
    <Styled.ConventionBox>
      <Styled.ConventionDetail>
        {children}

        <Text as="p" font="Pre_16_R" color="gray1" lineHeight="100%" letterSpacing="-0.016rem">
          <>{CONVENTION_SELECTED_CHECK[conventionIndex]}</>
        </Text>
      </Styled.ConventionDetail>
      {conventionIndex && <BtnDetailIc onClick={()=>handleShowConvention(conventionIndex)} />}
    </Styled.ConventionBox>
  );
}

export default function Convention() {
  const { registerWithRef, ...methods } = useFormContextWithRef();
  const [checked, setChecked] = useState<boolean[]>([false, false, false, false]);

  const {
    formState: { errors },
  } = methods;

  function handleCheckConvention(key: number) {
    let newCheckedConvention: boolean[] = [];

    checked.forEach((boolean, idx) => {
      if (idx === key) {
        newCheckedConvention.push(!boolean);
      } else {
        newCheckedConvention.push(boolean);
      }
    });

    let trueChecked = 0;
    if (newCheckedConvention[0]) {
      trueChecked = 3;
    }

    //  전체선택
    newCheckedConvention.forEach((boolean, idx) => {
      if (idx !== 0 && boolean) {
        trueChecked += 1;
      }
    });

    if (trueChecked === 3) {
      if (newCheckedConvention[0] && !checked[0]) {
        setChecked((checked) => [true, true, true, true]);
      } else if (!newCheckedConvention[0] && checked[0]) {
        setChecked((checked) => [false, false, false, false]);
      } else if (!newCheckedConvention[0] && !checked[0]) {
        setChecked((checked) => [true, true, true, true]);
      }
    } else if (trueChecked === 0) {
      if (newCheckedConvention[0] && !checked[0]) {
        setChecked((checked) => [true, true, true, true]);
      } else if (!newCheckedConvention[0] && checked[0]) {
        setChecked((checked) => [false, false, false, false]);
      } else if (!newCheckedConvention[0] && !checked[0]) {
        setChecked((checked) => [false, false, false, false]);
      }
    } else {
      if (newCheckedConvention[0] && !checked[0]) {
        setChecked((checked) => [true, true, true, true]);
      } else if (!newCheckedConvention[0] && checked[0]) {
        setChecked((checked) => [false, false, false, false]);
      } else {
        let checkedConvention: boolean[] = [];
        checkedConvention.push(false);
        newCheckedConvention.forEach((boolean, idx) => {
          if (idx !== 0) {
            checkedConvention.push(boolean);
          }
        });
        setChecked((checked) => checkedConvention);
      }
    }
  }

  return (
    <Styled.ConventionContainer>
      {checked.map((check, idx) => (
        <Fragment key={idx}>
          <ConventionLayout conventionIndex={idx}>
            <CheckBox checked={check} onChange={() => handleCheckConvention(idx)} />
          </ConventionLayout>
          {idx === 0 && <StyledLined />}
        </Fragment>
      ))}
    </Styled.ConventionContainer>
  );
}

const Styled = {
  ConventionContainer: styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 2rem;
  `,
  ConventionBox: styled.article`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  `,
  ConventionDetail: styled.div`
    gap: 1.2rem;

    display: flex;
  `,
};
