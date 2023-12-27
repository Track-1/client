import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { ROLE } from '../../../../core/common/roleType';
import { role } from '../../../../recoil/common/role';
import { theme } from '../../../../style/theme';
import { UserType } from '../../../../type/common/userType';
import Card from './Card';

const ROLE_TITLE = {
  PRODUCER: 'Producer',
  VOCAL: 'Vocal',
} satisfies Record<string, string>;

const ROLE_DESCRIPTION = {
  PRODUCER: 'You can upload the Vocal Searching \ntrack by signing up with a producer account.',
  VOCAL: 'You can search for limitless chance and \nmake your own musician profile.',
} satisfies Record<string, string>;

export default function Role() {
  const [selectedRole, setSelectedRole] = useRecoilState<string | UserType>(role);

  function handleSelectRole(role: string) {
    setSelectedRole(role);
  }

  function checkIsSelected(role: string) {
    return selectedRole === role;
  }

  return (
    <Styled.RoleSection>
      <Card
        color={theme.colors.neon_green}
        isSelected={checkIsSelected(ROLE.PRODUCER)}
        title={ROLE_TITLE.PRODUCER}
        description={ROLE_DESCRIPTION.PRODUCER}
        onClick={() => handleSelectRole(ROLE.PRODUCER)}
      />
      <Card
        color={theme.colors.neon_pink}
        isSelected={checkIsSelected(ROLE.VOCAL)}
        title={ROLE_TITLE.VOCAL}
        description={ROLE_DESCRIPTION.VOCAL}
        onClick={() => handleSelectRole(ROLE.VOCAL)}
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
