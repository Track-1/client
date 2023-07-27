interface InputProps {
  type: string;
  title: string;
  placeholder: string;
  errorMessage: string;
  isButtonExist: boolean;
}

export default function Input(props: InputProps) {
  const { title, type, placeholder, errorMessage, isButtonExist } = props;

  return (
    <>
      <h1>{title}</h1>
      <input type={type} placeholder={placeholder} />
      {/* {isButtonExist && <InputButton />} */}
    </>
  );
}
