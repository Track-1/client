
import styled from 'styled-components';
import { Cover } from 'track-1-design-system';

interface SlideCardsProp {
  images: { id: number; imageFile: string }[];
  link?: string;
}

export default function SlideCards(props: SlideCardsProp) {
  const { images } = props;

  return (
    <Styled.CardContainer>
      <Styled.CardWrapper>
        {images.length > 0 &&
          images.map(({ id, imageFile }) => {
            return <Cover imageUrl={imageFile} shape="rectangle" width={15.8} height={15.8} key={id} />;
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
    margin-left: -6rem;
  `,
  CardContainer: styled.div`
    width: 100%;
    overflow-x: scroll;
  `,
};
