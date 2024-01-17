import { useOverlay } from '@toss/use-overlay';
import { useCallback } from 'react';
import styled from 'styled-components';
import Modal from '.';
import { CONVENTION } from '../../../core/common/convention';
import { CONVENTION_SELECTED_CHECK } from '../../../core/common/convention/conventionSelectedCheck';

export function useConvention() {
  const { open, close } = useOverlay();

  const showConvention = useCallback(
    (options: { index: number }) =>
      new Promise<boolean>((resolve) => {
        console.log(options.index);
        open(({ isOpen, close }) => (
          <Modal
            isOpen={isOpen}
            onClose={() => {
              resolve(false);
              close();
            }}
            header={<Styled.Title>{CONVENTION_SELECTED_CHECK[options.index]}</Styled.Title>}>
            <>
              {CONVENTION[options.index]?.INTRO && <Styled.Intro>{CONVENTION[options.index]?.INTRO}</Styled.Intro>}
              <Styled.Contents isShort={options.index !== 2}>
                {CONVENTION[options.index]?.CONTENTS.map((content, index) => (
                  <div key={index}>
                    <p dangerouslySetInnerHTML={{ __html: content }}></p>
                    <br />
                  </div>
                ))}
              </Styled.Contents>
            </>
          </Modal>
        ));
      }),
    [open]
  );

  return { showConvention, close };
}

interface ModalProps {
  index: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ConventionModal({ isOpen, onClose, index }: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} header={<Styled.Title>{CONVENTION_SELECTED_CHECK[index]}</Styled.Title>}>
      <>
        {CONVENTION[index]?.INTRO && <Styled.Intro>{CONVENTION[index]?.INTRO}</Styled.Intro>}
        <Styled.Contents isShort={index !== 2}>
          {CONVENTION[index]?.CONTENTS.map((content, index) => (
            <div key={index}>
              <p dangerouslySetInnerHTML={{ __html: content }}></p>
              <br />
            </div>
          ))}
        </Styled.Contents>
      </>
    </Modal>
  );
}

const Styled = {
  Title: styled.header`
    color: white;
    font-family: Pretendard;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    letter-spacing: -0.016rem;
  `,
  Intro: styled.div`
    color: #d9d9d9;
    font-family: Pretendard;
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 400;
    line-height: 170%;
    letter-spacing: -0.014rem;
    border-bottom: 1px solid #313338;
    padding-bottom: 2rem;
  `,
  Contents: styled.div<{ isShort: boolean }>`
    color: #9ea1ab;
    font-family: Pretendard;
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 400;
    line-height: 170%;
    letter-spacing: -0.014rem;

    margin-top: 2rem;
    height: ${({ isShort }) => (isShort ? 27 : 42)}rem;
    overflow-y: scroll;
  `,
};
