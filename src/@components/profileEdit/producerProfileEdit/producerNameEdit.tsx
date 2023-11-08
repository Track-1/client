import InputContainer from "../../@common/inputContainer";
import { NICKNAME_MESSAGE } from "../../../core/signUp/errorMessage";
import styled from "styled-components";
import { CHECK_NICKNAME_FORM } from "../../../core/signUp/checkForm";
import { useGetProducerProfile } from "../../../hooks/queries/mypage";
import { useParams } from "react-router-dom";
import { InputContainer200 } from "../../@common/styledComponents";

interface ProducerNameEditProps {
  methods: any;
}

export default function ProducerNameEdit(props: ProducerNameEditProps) {
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
