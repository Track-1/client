import styled from 'styled-components';

import aboutBackgroundImg01 from '../../assets/image/aboutBackgroundImg01.png';
import aboutBackgroundImg02 from '../../assets/image/aboutBackgroundImg02.png';

export default function AboutContainer() {
  return (
    <section>
      <AboutBackgroundImg src={aboutBackgroundImg01} />
      <AboutBackgroundImg src={aboutBackgroundImg02} />
    </section>
  );
}

const AboutBackgroundImg = styled.img`
  width: 100%;
`;
