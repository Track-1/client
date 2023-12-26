import { PropsWithChildren, useContext, useState } from 'react';
import { SwitchContext } from '../../context/switchContext';
import { LabelProps, RootProps, SwitchProps, ThumbProps } from '../../type/common/switch';
import styled, { css, keyframes } from 'styled-components';

const DefaultLabel = styled.p`
  ${({ theme }) => theme.fonts.Pre_14_R}

  margin-right: 1.1rem;

  color: ${({ theme }) => theme.colors.gray1};
`;

const DefaultRoot = styled.div<{ width?: number; height?: number; switchState: 'on' | 'off' }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  width: ${(props) => (props.width ? props.width : 5.8)}rem;
  height: ${(props) => (props.height ? props.height : 2.8)}rem;

  border-radius: 15px;
  padding: 0 0.3rem;

  ${({ switchState }) =>
    switchState === 'on'
      ? css`
          background-color: ${({ theme }) => theme.colors.neon_green};
          justify-content: flex-start;
        `
      : css`
          background-color: ${({ theme }) => theme.colors.gray4};
          justify-content: flex-end;
        `}
`;

const moveRightAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
`;

const moveLeftAnimation = keyframes`
  0% {
      transform: translateX(100%);
}
100% {
      transform: translateX(0);
  }
`;

const DefaultThumb = styled.div<{ switchState: 'on' | 'off'; height?: number }>`
  width: ${(props) => (props.height ? props.height : 2.2)}rem;
  height: ${(props) => (props.height ? props.height : 2.2)}rem;

  border-radius: 50%;

  ${({ switchState }) =>
    switchState === 'on'
      ? css`
          background-color: ${({ theme }) => theme.colors.black};
          ${moveRightAnimation} 0 linear forwards;
        `
      : css`
          background-color: ${({ theme }) => theme.colors.gray2};
          ${moveLeftAnimation} 0 linear forwards;
        `}
`;

function SwitchBox(props: PropsWithChildren<SwitchProps>) {
  const { externalState, children } = props;
  const [currentThumb, setCurrentThumb] = useState<'on' | 'off'>('off');

  const combineState = (externalFn: any, internalFn: any) => {
    return () => {
      externalFn?.();
      internalFn?.();
    };
  };

  function internalSwitchThumb() {
    currentThumb === 'on' ? setCurrentThumb('off') : setCurrentThumb('on');
  }
  const switchThumb = combineState(externalState, internalSwitchThumb);
  return <SwitchContext.Provider value={{ currentThumb, switchThumb }}>{children}</SwitchContext.Provider>;
}

function Label(props: LabelProps) {
  const { onLabel, offLabel } = props;
  const { currentThumb } = useContext(SwitchContext);

  return <DefaultLabel>{currentThumb === 'on' ? onLabel : offLabel}</DefaultLabel>;
}

function Root(props: PropsWithChildren<RootProps>) {
  const { width, height, children } = props;
  const { currentThumb } = useContext(SwitchContext);

  return (
    <DefaultRoot width={width} height={height} switchState={currentThumb}>
      {children}
    </DefaultRoot>
  );
}

function Thumb(props: ThumbProps) {
  const { height } = props;
  const { switchThumb, currentThumb } = useContext(SwitchContext);

  return <DefaultThumb switchState={currentThumb} onClick={switchThumb} height={height} />;
}

export const Switch = Object.assign(SwitchBox, {
  Label,
  Root,
  Thumb,
});
