import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { role } from '../../../../recoil/common/role';
import { isNextStep } from '../../../../recoil/signUp/isNextStep';
import { theme } from '../../../../style/theme';
import Card from './Card';
import { UserType } from '../../../../type/common/userType';

const ROLE_TITLE = {
  PRODUCER: 'Producer',
  VOCAL: 'Vocal',
} satisfies Record<string, string>;

const ROLE_DESCRIPTION = {
  PRODUCER: 'You can upload the Vocal Searching \ntrack by signing up with a producer account.',
  VOCAL: 'You can search for limitless chance and \nmake your own musician profile.',
} satisfies Record<string, string>;

export default function Role(props: { moveToNextStep: () => void }) {
  const { moveToNextStep } = props;
  const [selectedRole, setSelectedRole] = useRecoilState(role);
  const setIsSuccess = useSetRecoilState<boolean>(isNextStep);

  function handleSelectRole(role: UserType) {
    setSelectedRole(role);
    setIsSuccess(true);

    setTimeout(() => {
      moveToNextStep();
    }, 300);
  }

  function checkIsSelected(role: UserType) {
    if (!selectedRole) return false;
    return selectedRole === role;
  }

  return (
    <Styled.RoleSection>
      <Card
        color={theme.colors.neon_green}
        isSelected={checkIsSelected('producer')}
        title={ROLE_TITLE.PRODUCER}
        description={ROLE_DESCRIPTION.PRODUCER}
        onClick={() => handleSelectRole('producer')}
      />
      <Card
        color={theme.colors.neon_pink}
        isSelected={checkIsSelected('vocal')}
        title={ROLE_TITLE.VOCAL}
        description={ROLE_DESCRIPTION.VOCAL}
        onClick={() => handleSelectRole('vocal')}
      />
    </Styled.RoleSection>
  );
}

const Styled = {
  RoleSection: styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,
};
