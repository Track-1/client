
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Cover } from 'track-1-design-system';

interface SlideCardsProp {
  images: { id: number; imageFile: string }[];
  link: string;
}

export default function SlideCards(props: SlideCardsProp) {
  const { images,link } = props;

  return (
    <Styled.CardContainer>
      <Styled.CardWrapper>
        {images.length > 0 &&
          images.map(({ id, imageFile }) => {
            return <Link to={`/${link}/${id}`} key={id}> <Cover imageUrl={imageFile} shape="rectangle" width={15.8} height={15.8} /></Link>;
          })}
      </Styled.CardWrapper>
    </Styled.CardContainer>
  );
}

const Styled = {
  CardWrapper: styled.div`
    display: flex;
    min-width: 102rem;
    gap: 1.5rem;
    display: flex;
  position: relative;
  animation: autoPlay 15s linear infinite;


  @keyframes autoPlay {
    0% {
      transition: translateX(0);
    }
    100% {
      transform: translateX(calc(-200px * 5));
    }
  }
  `,
  CardContainer: styled.div`
    width: 100%;
    overflow-x: scroll;
  `,
}
