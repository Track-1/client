import { useOverlay } from '@toss/use-overlay';
import { useCallback } from 'react';
import styled from 'styled-components';
import Modal from '.';
import { CONVENTION } from '../../../core/common/convention';
import { CONVENTION_SELECTED_CHECK } from '../../../core/common/convention/conventionSelectedCheck';


export default function useConvention() {
  const { open, close } = useOverlay();

  const showConvention = useCallback(
    (options: { index: number }) =>
      new Promise<boolean>((resolve) => {
        open(({ isOpen, close }) => (
          <Modal
            isOpen={isOpen}
            onClose={() => {
              resolve(false);
              close();
            }}
            header={<Styled.Title>{CONVENTION_SELECTED_CHECK[options.index]}</Styled.Title>}>
            {CONVENTION[options.index]?.INTRO && <Styled.Intro>{CONVENTION[options.index]?.INTRO}</Styled.Intro>}
            <Styled.Contents>{CONVENTION[options.index]?.CONTENTS}</Styled.Contents>
          </Modal>
        ));
      }),
    [open]
  );

  return { showConvention, close };
}

const Styled = {
  Title: styled.header`
    color:   ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts.Pre_16_B};
  `,
  Intro: styled.div`
    color:   ${({ theme }) => theme.colors.gray1};
    ${({ theme }) => theme.fonts.Pre_14_R};
    border-bottom: 1px solid #313338;
    padding-bottom: 2rem;

    white-space: pre;
  `,
  Contents: styled.div`
    color:   ${({ theme }) => theme.colors.gray2};
    ${({ theme }) => theme.fonts.Pre_14_R};

    white-space: pre;

    max-height: 32rem;
    overflow-y: scroll;
  `,
};