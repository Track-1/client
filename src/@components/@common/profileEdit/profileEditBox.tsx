import { useForm } from "react-hook-form";
import styled from "styled-components";
import ContactInput from "./contactInput";

export default function ProfileEditBox() {
  const methods = useForm({
    defaultValues: {
      userContact: "",
      userCategory: [],
      userKeyword: "",
      userIntroduction: "",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
    watch,
  } = methods;

  return (
    <EditBox>
      <InputWrapper>
        <ContactInput methods={methods} />
      </InputWrapper>
    </EditBox>
  );
}

const InputWrapper = styled.div`
  margin-top: 5.7rem;
`;

const EditBox = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  right: 18.1rem;

  width: 77.9rem;
  height: 88.8rem;

  margin-left: 10rem;

  backdrop-filter: blur(1rem);

  border: 0.3rem solid transparent;
  border-radius: 5rem;
  background-image: linear-gradient(rgba(13, 14, 17, 0.9), rgba(20, 21, 23, 0.6)),
    linear-gradient(to top, transparent, #3e4045);

  background-origin: border-box;
  background-clip: content-box, border-box;
`;
