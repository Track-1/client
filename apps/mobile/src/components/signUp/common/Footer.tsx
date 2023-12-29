import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Footer() {
  return (
    <Style.FooterWrapper>
      <Style.Font>Have an account?</Style.Font>
      <Link to="/login">
        <Style.Font color="purple">Log in here</Style.Font>
      </Link>
    </Style.FooterWrapper>
  );
}

const Style = {
  Font: styled.p<{ color?: string }>`
    ${({ theme }) => theme.fonts.Pre_14_R}
    color: ${({ theme, color }) => (color === 'purple' ? theme.colors.neon_purple : theme.colors.gray4)};
    margin-left: 0.5ch;
  `,
  FooterWrapper: styled.footer`
    display: flex;
    justify-content: center;
    width: 100%;
  `,
};
