import styled from 'styled-components';
import { UserType } from '../../../type/common/userType';
import { isProducer } from '../../../utils/common/checkRoleType';
import { PADDING_SIDE } from '../../layout';
import { StyledVerticalLined } from '../../common/DivisionLine';

interface TrackProfileToggleBtnProps {
  userType: UserType;
}
export default function TrackProfileToggleBtn(props: TrackProfileToggleBtnProps) {
  const { userType } = props;
  return (
    <>
      <ToggleWrapper>
        <ToggleItem className={userType}>Portfolio</ToggleItem>
        {isProducer(userType) && (
          <>
            <StyledVerticalLined width="2.8rem" />
            <ToggleItem className={userType}>Vocal Searching</ToggleItem>
          </>
        )}
      </ToggleWrapper>
    </>
  );
}

const ToggleWrapper = styled.ul`
  display: flex;
  align-items: center;

  width: calc(${`100% + ${PADDING_SIDE}*2`});
  height: 4.8rem;

  padding: ${`0 -${PADDING_SIDE}`};
  margin-left: ${`-${PADDING_SIDE}`};

  background-color: ${({ theme }) => theme.colors.gray6};
`;

const ToggleItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  width: calc(100% / 2);
  height: 100%;

  ${({ theme }) => theme.fonts.Alex_14_R}
  color: ${({ theme }) => theme.colors.white};

  &.vocal {
    justify-content: left;
    width: 100%;
    padding: ${`0 ${PADDING_SIDE}`};
  }
`;
