import styled from "styled-components";
import { Switch } from "../@common/switch";

const Container = styled.section`
  width: 55.9rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  margin-top: 0.04rem;
`;

interface SwitchToggleProps {
  switchUserType: () => void;
}

export default function SwitchToggle(props: SwitchToggleProps) {
  const { switchUserType } = props;

  return (
    <Container>
      <Switch externalState={switchUserType}>
        <Switch.Label onLabel="Producer Mode" offLabel="Producer Mode" />
        <Switch.Root>
          <Switch.Thumb />
        </Switch.Root>
      </Switch>
    </Container>
  );
}
