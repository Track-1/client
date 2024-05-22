import styled from 'styled-components';
import useModal from '../../hooks/common/useModal';
import useUpdateModal from '../../hooks/common/useUpdateModal';
import { useRecoilState } from 'recoil';
import { ProducerProfileShadowIc, RightArrorIc } from '../../assets';
import { producerState } from '../../recoil/common/profile';
import { PlayUseContext } from '../../context/playerContext';

export default function ProducerProfileShadow() {
  const [dataState, setDataState] = useRecoilState(producerState);
  const { unShowModal } = useModal();
  const { unShowModal: unShowUpdateModal } = useUpdateModal();
  const { quitAudioForMovePage } = PlayUseContext({});

  function handleChangeDataState(state: string) {
    setDataState(state);
    unShowModal();
    unShowUpdateModal();
    quitAudioForMovePage();
  }

  return (
    <ProducerProfileShadowWrapper>
      <TitleWrapper>
        <Title isSelected={dataState === 'Portfolio'} onClick={() => handleChangeDataState('Portfolio')}>
          <IconWrapper>{dataState === 'Portfolio' && <RightArrorIcon />}</IconWrapper>Portfolio
        </Title>
        <Title isSelected={dataState === 'Vocal Searching'} onClick={() => handleChangeDataState('Vocal Searching')}>
          <IconWrapper>{dataState === 'Vocal Searching' && <RightArrorIcon />}</IconWrapper>Vocal Searching
        </Title>
      </TitleWrapper>
      <ProducerProfileShadowIcon />
    </ProducerProfileShadowWrapper>
  );
}

const IconWrapper = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 1rem;
`;

const RightArrorIcon = styled(RightArrorIc)`
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 1rem;
`;

const ProducerProfileShadowWrapper = styled.section`
  margin-left: 60rem;
`;
const ProducerProfileShadowIcon = styled(ProducerProfileShadowIc)`
  position: fixed;
  z-index: -2;
`;

const Title = styled.p<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  height: 4rem;
  ${({ theme }) => theme.fonts.body1};
  color: ${({ isSelected, theme }) => (isSelected ? theme.colors.white : theme.colors.gray3)};

  cursor: pointer;
`;

const TitleWrapper = styled.header`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1;

  margin: 6rem 0 0 5.6rem;
`;
