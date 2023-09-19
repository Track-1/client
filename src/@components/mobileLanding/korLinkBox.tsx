import styled from "styled-components";

export default function KorLinkBox() {
  return (
    <LinkBoxContainer>
      <Name>Email</Name>
      <Content className="kor-email" isEmail={true}>
        contact.track1@gmail.com
      </Content>
      <Name>Instagram</Name>
      <Content className="kor-instagram" isEmail={false}>
        <a href="https://www.instagram.com/track1.kr/">@track1.kr</a>
      </Content>
      <Name>Youtube</Name>
      <Content className="kor-youtube" isEmail={false}>
        <a href="www.youtube.com/@Track-1.official">www.youtube.com/@Track-1.official</a>
      </Content>
      <Name>Our website</Name>
      <Content className="kor-website" isEmail={false}>
        <a href="www.track1.site">www.track1.site</a>
      </Content>

      <CopyRight>©Track1. All rights reserved.</CopyRight>
    </LinkBoxContainer>
  );
}

const LinkBoxContainer = styled.section`
  display: flex;
  flex-direction: column;

  justify-content: flex-start;

  padding-left: 2rem;
  margin-bottom: 10rem;
`;

const Name = styled.h1`
  color: var(--gray3, #535559);
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: 160%;

  margin-top: 2rem;
`;

const Content = styled.p<{ isEmail: boolean }>`
  color: var(--gray1, #d9d9d9);
  font-family: Pretendard;
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
  line-height: 160%; /* 3.2rem */
  text-decoration-line: ${({ isEmail }) => !isEmail && "underline"};
`;

const CopyRight = styled.p`
  color: var(--gray4, #313338);
  font-family: Pretendard;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 500;
  line-height: 160%;

  margin: 2.6rem 0 6rem 0;
`;
