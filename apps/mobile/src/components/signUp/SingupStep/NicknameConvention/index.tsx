import styled from 'styled-components';
import Nickname from './Nickname';
import ProfilImageContainer from './ProfileImageContainer';

export default function NicknameConvention() {
  return (
    <Styled.NicknameConventionWrapper>
      <ProfilImageContainer />
      <Nickname />
    </Styled.NicknameConventionWrapper>
  );
}

const Styled = {
  NicknameConventionWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
};
