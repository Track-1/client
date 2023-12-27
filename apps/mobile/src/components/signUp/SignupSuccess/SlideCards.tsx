
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Cover } from 'track-1-design-system';

interface SlideCardsProp {
  images: { id: number; imageFile: string }[];
  link: string;
}

export default function SlideCards(props: SlideCardsProp) {
  const { images, link } = props;

  return (
    <Styled.CardContainer>
      <Styled.CardWrapper>
        {images.length > 0 &&
          images.concat(images).map(({ id, imageFile }, idx) => {
            return (
              <Link to={`/${link}/${id}`} key={`${id}${idx}`}>
                {' '}
                <Cover imageUrl={imageFile} shape="rectangle" width={15.8} height={15.8} />
              </Link>
            );
          })}
      </Styled.CardWrapper>
    </Styled.CardContainer>
  );
}

const Styled = {
  CardWrapper: styled.div`
    gap: 1.5rem;
    display: flex;
    position: relative;
    width: calc(26.4rem * 10);
    animation: autoPlay 15s linear infinite;

    @keyframes autoPlay {
      0% {
        transition: translateX(0);
      }
      100% {
        /* MEMO: 17.3은 이미지+여백 크기, 6개는 이미지의 개수 */
        transform: translateX(calc(-17.3rem * 6));
      }
    }
  `,
  CardContainer: styled.div`
    width: 100%;

    overflow: hidden;
  `,
};
