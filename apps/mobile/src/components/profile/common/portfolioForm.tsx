import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import TrackInfoTextForm from '../../common/Form/trackInfoTextForm';
import { HashtagWrapper, ImageWrapper } from '../../common/Interface';
import { CategoryType } from '../../../type/common/category';
import { PageType } from '../../../type/common/pageType';
import Text from '../../common/Text';

interface PortfolioFormProps {
  pageType: PageType;
  category: string;
  title: string;
  hashTagList: string[];
  introduce?: string;
}

export default function PortfolioForm(props: PropsWithChildren<PortfolioFormProps>) {
  const { pageType, category, title, hashTagList, introduce, children } = props;
  return (
    <Container>
      <PortfolioWrapper>
        <ImageWrapper width={12} height={12}>
          {children}
        </ImageWrapper>

        <TrackInfoTextForm
          topItem={category}
          topItemColor={pageType === 'tracks' ? 'neon_green' : 'neon_pink'}
          middleItem={title}
          middleItemMargin="0 0 1.8rem 0">
          {
            <HashtagWrapper>
              {hashTagList.map((hashtag) => (
                <Text as="p" font="Pre_14_R" color="gray3">{`# ${hashtag}`}</Text>
              ))}
            </HashtagWrapper>
          }
        </TrackInfoTextForm>
      </PortfolioWrapper>
      <IntroduceWrapper>{introduce}</IntroduceWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const PortfolioWrapper = styled.div`
  display: flex;

  gap: 2.5rem;

  width: 100%;
`;

const IntroduceWrapper = styled.div`
  width: 100%;

  ${({ theme }) => theme.fonts.Pre_14_R};
  color: ${({ theme }) => theme.colors.white};
  line-height: 180%;

  margin-top: 3rem;
`;
