import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Text from '../../common/Text';

export default function Footer() {
  return (
    <Style.FooterWrapper>
      <Text as="span" font="Pre_14_R" color={'gray4'}>
        {'Have an account?'}
      </Text>
      <Link to="/login">
        <Text as="span" font="Pre_14_R" color={'neon_purple'}>
          {' Log in here'}
        </Text>
      </Link>
    </Style.FooterWrapper>
  );
}

const Style = {
  FooterWrapper: styled.footer`
    display: flex;
    justify-content: center;
    width: 100%;

    padding-bottom: 7rem;
  `,
};
