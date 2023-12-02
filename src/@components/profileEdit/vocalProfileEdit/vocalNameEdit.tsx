import InputContainer from "../../@common/inputContainer";
import { NICKNAME_MESSAGE } from "../../../core/signUp/errorMessage";
import styled from "styled-components";
import { CHECK_NICKNAME_FORM } from "../../../core/signUp/checkForm";
import { InputContainer200 } from "../../@common/styledComponents";
import { UseFormReturn } from "react-hook-form";

interface ProducerNameEditProps {
  methods: UseFormReturn<
    {
      nickName: string;
      contact: string;
    },
    any,
    undefined
  >;
}

export default function VocalNameEdit(props: ProducerNameEditProps) {
  const {
    methods: { register },
  } = props;

  return (
    <InputContainer title="Name" isRequired>
      <NickNameInput
        type="text"
        placeholder="Enter your user name"
        {...register("nickName", {
          pattern: {
            value: CHECK_NICKNAME_FORM,
            message: NICKNAME_MESSAGE.ERROR,
          },
          required: true,
        })}
      />
    </InputContainer>
  );
}

const NickNameInput = styled(InputContainer200)``;
