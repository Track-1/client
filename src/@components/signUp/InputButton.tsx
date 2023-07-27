interface InputButtonProp {
  title: string;
  disabled: boolean;
  onClick: () => void;
}

export default function InputButton(props: InputButtonProp) {
  const { title, disabled, onClick } = props;

  return (
    <button type="button" disabled={disabled} onClick={onClick}>
      {title}
    </button>
  );
}
