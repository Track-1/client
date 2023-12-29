import styled from 'styled-components';
import { Switch } from '../common/Switch/switch';

const Container = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

interface SwitchToggleProps {
  switchUserType: () => void;
  width?: number;
  height?: number;
}

export default function SwitchToggle(props: SwitchToggleProps) {
  const { switchUserType, width, height } = props;

  return (
    <Container>
      <Switch externalState={switchUserType}>
        <Switch.Label onLabel="Producer Mode" offLabel="Producer Mode" />
        <Switch.Root width={width} height={height}>
          <Switch.Thumb height={height && height - 0.4} />
        </Switch.Root>
      </Switch>
    </Container>
  );
}
