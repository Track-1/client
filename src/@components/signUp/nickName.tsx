import { FormProvider } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { NICKNAME_MESSAGE } from "../../core/signUp/errorMessage";
import { isNextStep } from "../../recoil/signUp/isNextStep";
import { joinUserData } from "../../recoil/signUp/joinUserData";
import { ConventionChecksType } from "../../type/signUp/conventionChecksType";
import { JoinUserDataPropsType } from "../../type/signUp/joinUserDataType";
import { NickNameProp } from "../../type/signUp/nickNameProp";
import { checkEssentialAgree } from "../../utils/signUp/checkEssentialAgree";
import { checkNicknamForm } from "../../utils/signUp/checkForm";
import Input from "./Input";
import InputTitle from "./inputTitle";

interface NickNameProps extends NickNameProp {
  checkedConventions: ConventionChecksType[];
}

export default function NickName(props: NickNameProps) {
  const { methods, checkedConventions } = props;
  const [isSuccess, setIsSuccess] = useRecoilState<boolean>(isNextStep);
  const [userData, setUserData] = useRecoilState<JoinUserDataPropsType>(joinUserData);

  const {
    handleSubmit,
    setError,
    resetField,
    getValues,
    formState: { errors },
    watch,
  } = methods;

  return (
    <>
      <FormProvider {...methods}>
        <form>
          <InputTitle>
            <p>What’s your name?</p>
            <ImportantIcon>*</ImportantIcon>
          </InputTitle>
          <Input
            name="nickName"
            rules={{
              required: true,
              // pattern: {
              //   value: CHECK_NICKNAME_FORM,
              //   message: NICKNAME_MESSAGE.ERROR,
              // },
              validate: {
                check: (value) => {
                  if (checkNicknamForm(value)) {
                    if (checkEssentialAgree(checkedConventions)) {
                      setIsSuccess(true);
                      setUserData({ ...userData, userName: value });
                    } else {
                      setIsSuccess(false);
                    }
                    return NICKNAME_MESSAGE.SUCCESS;
                  } else {
                    setIsSuccess(false);
                    return NICKNAME_MESSAGE.ERROR;
                  }
                },
              },
            }}
            type="text"
            placeholder="Enter your user name"
            width={56}
          />
        </form>
      </FormProvider>
    </>
  );
}

const ImportantIcon = styled.i`
  margin-left: 0.47rem;

  color: ${({ theme }) => theme.colors.main};
`;
