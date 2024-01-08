import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { EmptyBox, HashtagWrapper, ImageWrapper } from '../../common/Interface';
import { PageType } from '../../../type/common/pageType';
import Text from '../../common/Text';

interface PortfolioFormProps {
  pageType: PageType;
  category: string;
  title: string;
  hashTagList: string[];
  introduce?: string;
  linkTo?: string;
}

export default function PortfolioForm(props: PropsWithChildren<PortfolioFormProps>) {
  const { pageType, category, title, hashTagList, introduce, linkTo, children } = props;
  return (
    <Container>
      <PortfolioWrapper>
        <ImageWrapper width={12} height={12}>
          {children}
        </ImageWrapper>

        <PortfolioInfoWrapper>
          <EmptyBox>
            <Text
              as="p"
              font="Pre_14_R"
              color={pageType === 'tracks' ? 'neon_green' : 'neon_pink'}
              margin="0 0 0.5rem 0">
              {category}
            </Text>
            <Text as="p" font="Alex_16_R" color="white" margin="0 0 1.8rem 0">
              {title}
            </Text>
          </EmptyBox>

          <HashtagWrapper>
            {hashTagList.map((hashtag) => (
              <Text as="p" font="Pre_14_R" color="gray3">{`# ${hashtag}`}</Text>
            ))}
          </HashtagWrapper>
        </PortfolioInfoWrapper>
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

const PortfolioInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  overflow: hidden;
`;

const IntroduceWrapper = styled.div`
  width: 100%;

  ${({ theme }) => theme.fonts.Pre_14_R};
  color: ${({ theme }) => theme.colors.white};
  line-height: 180%;

  margin-top: 3rem;
`;
