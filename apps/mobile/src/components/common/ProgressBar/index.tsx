import styled from 'styled-components';

interface ProgressBarProps {
  // MEMO: progress는 %값으로 내려주세요. 내려진 progress 있는 그대로 width 스타일링 예정입니다!
  progress: number;
}

export default function ProgressBar(props: ProgressBarProps) {
  const { progress } = props;

  return (
    <>
      {progress === 100 && <Styled.AlmostDone>Almost done!</Styled.AlmostDone>}
      <Styled.ProgressContainer>
        <Styled.ProgressBarWrapper>
          <Styled.Progress progress={progress} />
        </Styled.ProgressBarWrapper>
      </Styled.ProgressContainer>
    </>
  );
}

const Styled = {
  AlmostDone: styled.p`
    margin: -2.2rem 0rem;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    color: ${({ theme }) => theme.colors.neon_purple};
    ${({ theme }) => theme.fonts.Pre_14_R};
  `,
  ProgressContainer: styled.div`
    display: flex;
    justify-content: center;
  `,
  ProgressBarWrapper: styled.div`
    width: 100%;
    height: 0.4rem;
    border-radius: 0.2rem;
    background-color: ${({ theme }) => theme.colors.gray5};
    overflow: hidden;
  `,
  Progress: styled.div<{ progress: number }>`
    width: ${({ progress }) => progress}%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.neon_purple};
  `,
};
