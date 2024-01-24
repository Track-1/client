import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Text from '../../common/Text';
import { useMovePage } from '../../../hooks/common/useMovePage';

export default function Footer() {
  const { handleMovePage } = useMovePage();

  return (
    <Style.FooterWrapper>
      <Text as="span" font="Pre_14_R" color={'gray4'}>
        {'Have an account?'}
      </Text>

      <Text as="span" font="Pre_14_R" color={'neon_purple'}>
        <a
          onClick={() => {
            handleMovePage('login', undefined, location.pathname);
          }}>
          {'Log in here'}
        </a>
      </Text>
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
