import styled from 'styled-components';
import { PADDING_SIDE } from '../../layout';
import Text from '../../common/Text';
import PortfolioForm from './portfolioForm';
import PlayCoverForm from '../../common/Form/playCoverForm';
import { ProducerVocalSearchingType, UserPortfolioType } from '../../../type/profile';
import { useState } from 'react';
import { StyledVerticalLined } from '../../common/DivisionLine';

interface ProducerPortfolioProps {
  producerPortfolio: UserPortfolioType[] | undefined;
  producerVocalSearchings: ProducerVocalSearchingType[] | undefined;
  userName?: string;
}

type ProducerPortfolioType = 'Portfolio' | 'Vocal Searching';

export default function ProducerPortfolio(props: ProducerPortfolioProps) {
  const { producerPortfolio, producerVocalSearchings, userName } = props;

  console.log(producerPortfolio, producerVocalSearchings);
  const [menu, setMenu] = useState<ProducerPortfolioType>('Portfolio');

  const [playingTrack, setPLayingTrack] = useState<UserPortfolioType['portfolioId'] | null>(null);

  function handleSelectMenu(selectMenu: ProducerPortfolioType) {
    if (selectMenu === menu) return;
    setMenu(selectMenu);
  }

  function selectTrack(userId: UserPortfolioType['portfolioId']) {
    setPLayingTrack(userId);
  }

  return (
    <>
      <MenuWrapper>
        <Menu onClick={() => handleSelectMenu('Portfolio')}>
          <Text as="p" font="Alex_14_R" color={menu === 'Portfolio' ? 'white' : 'gray3'}>
            Portfolio
          </Text>
        </Menu>
        <StyledVerticalLined width={2.8} />
        <Menu onClick={() => handleSelectMenu('Vocal Searching')}>
          <Text as="p" font="Alex_14_R" color={menu === 'Vocal Searching' ? 'white' : 'gray3'}>
            Vocal Searching
          </Text>
        </Menu>
      </MenuWrapper>
      <PortfolioList>
        {menu === 'Portfolio' ? (
          <>
            {producerPortfolio?.map((portfolio) => (
              <PortfolioForm
                pageType="tracks"
                category={portfolio.portfolioCategory}
                title={portfolio.portfolioTitle}
                hashTagList={portfolio.portfolioKeyword}
                introduce={portfolio.portfolioContent}>
                <PlayCoverForm
                  imageFile={portfolio.portfolioImageFile}
                  audioFile={portfolio.portfolioAudioFile}
                  audioId={portfolio.portfolioId}
                  audioTitle={portfolio.portfolioTitle}
                  userName={userName || ''}
                  playingTrack={playingTrack}
                  selectTrack={selectTrack}
                  width={12}
                  height={12}
                  shape="rectangle"
                  align="rightBottom"
                />
              </PortfolioForm>
            ))}
          </>
        ) : (
          <>
            {producerVocalSearchings?.map((trackInfo) => (
              <PortfolioForm
                pageType="tracks"
                category={trackInfo.trackCategory}
                title={trackInfo.trackTitle}
                hashTagList={trackInfo.trackKeyword}
                introduce={trackInfo.trackContent}>
                <PlayCoverForm
                  imageFile={trackInfo.trackImageFile}
                  audioFile={trackInfo.trackAudioFile}
                  audioId={trackInfo.trackId}
                  audioTitle={trackInfo.trackTitle}
                  userName={userName || ''}
                  playingTrack={playingTrack}
                  selectTrack={selectTrack}
                  width={12}
                  height={12}
                  shape="rectangle"
                  align="rightBottom"
                />
              </PortfolioForm>
            ))}
          </>
        )}
      </PortfolioList>
    </>

  );
}

const MenuWrapper = styled.ul`
  display: flex;
  align-items: center;

  width: calc(${`100% + ${PADDING_SIDE}*2`});
  height: 4.8rem;

  padding: 1rem 0;

  margin-left: ${`-${PADDING_SIDE}`};

  background-color: ${({ theme }) => theme.colors.gray6};
`;

const PortfolioList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5rem;

  margin-top: 3rem;
`;

const Menu = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;
