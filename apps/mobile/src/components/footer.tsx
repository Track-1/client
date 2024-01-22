import styled from 'styled-components';
import Text from './common/Text';
import { useConvention } from './common/Modal/useConvention';

export default function Footer() {
  const { showConvention, close } = useConvention();

  return (
    <>
      <Container>
        <FooterItemWrapper>
          <Text as="li" font="Pre_14_R" color="gray2">
            <span onClick={() => showConvention({ index: 1 })}>개인정보 처리방침</span>
          </Text>
          <Text as="li" font="Pre_14_R" color="gray2">
            |
          </Text>
          <Text as="li" font="Pre_14_R" color="gray2">
            <span onClick={() => showConvention({ index: 2 })}>서비스 이용약관</span>
          </Text>
        </FooterItemWrapper>

        <SnsWrapper>
          <Text as="li" font="Pre_14_R" color="white">
            <SnsLinkText href="https://www.instagram.com/track1.kr/">Instagram</SnsLinkText>
          </Text>
          <Text as="li" font="Pre_14_R" color="white">
            <SnsLinkText href="https://www.youtube.com/@Track-1.official">Youtube</SnsLinkText>
          </Text>
          <Text as="li" font="Pre_14_R" color="white">
            admin@track-1.link
          </Text>
        </SnsWrapper>

        <Text as="p" font="Pre_14_R" color="gray4">
          ©Track1. All rights reserved.
        </Text>
      </Container>
    </>
  );
}

const Container = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 21.7rem;

  padding: 3rem 0;

  background-color: ${({ theme }) => theme.colors.gray5};
`;

const FooterItemWrapper = styled.ul`
  display: flex;
  gap: 1rem;
`;

const SnsWrapper = styled.ul`
  display: flex;
  gap: 2rem;

  margin: 2rem 0 5rem;
`;

const SnsLinkText = styled.a`
  text-decoration: underline;
`;
