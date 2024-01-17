import { useOverlay } from '@toss/use-overlay';
import { useCallback } from 'react';
import styled from 'styled-components';
import Modal from '.';
import { CONVENTION } from '../../../core/common/convention';
import { CONVENTION_SELECTED_CHECK } from '../../../core/common/convention/conventionSelectedCheck';
import Text from '../Text';

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
            header={
              <Text as="p" font="Pre_16_B" color="white" lineHeight="100%" letterSpacing="-0.016rem">
                {CONVENTION_SELECTED_CHECK[options.index]}
              </Text>
            }>
            <>
              {CONVENTION[options.index]?.INTRO && <Styled.Intro>{CONVENTION[options.index]?.INTRO}</Styled.Intro>}
              <Styled.Contents index={options.index}>
                <div>
                  {CONVENTION[options.index]?.CONTENTS.map((content, index) => (
                    <div key={index}>
                      <p dangerouslySetInnerHTML={{ __html: content }}></p>
                      <br />
                    </div>
                  ))}
                </div>
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header={
        <Text as="p" font="Pre_16_B" color="white" lineHeight="100%" letterSpacing="-0.016rem">
          {CONVENTION_SELECTED_CHECK[index]}
        </Text>
      }>
      <>
        {CONVENTION[index]?.INTRO && <Styled.Intro>{CONVENTION[index]?.INTRO}</Styled.Intro>}
        <Styled.Contents index={index}>
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
  Intro: styled.p`
    color: ${({ theme }) => theme.colors.gray1};
    ${({ theme }) => theme.fonts.Pre_14_R};
    line-height: 170%;
    letter-spacing: -0.014rem;

    border-bottom: 1px solid ${({ theme }) => theme.colors.gray4};
    padding-bottom: 2rem;
  `,
  Contents: styled.div<{ index: number }>`
    color: ${({ theme }) => theme.colors.gray2};
    ${({ theme }) => theme.fonts.Pre_14_R};
    line-height: 170%;
    letter-spacing: -0.014rem;

    margin-top: 2rem;
    height: ${({ index }) => (index === 1 ? 27 : index === 2 ? 42 : 29)}rem;
    overflow-y: scroll;
  `,
};
