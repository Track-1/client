import styled from "styled-components";
import { Switch } from "../@common/switch";

const Container = styled.section`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  margin-top: 5.5rem;
  margin-right: 11rem;
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
