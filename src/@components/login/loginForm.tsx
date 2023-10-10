import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LoginButtonIc, PasswordEyeIc } from "../../assets";
import background from "../../assets/icon/signupBackgroundIc.svg";
import { ROLE } from "../../core/common/roleType";
import useConventionModal from "../../hooks/common/useConventionModal";
import { useLogin } from "../../hooks/queries/user";
import { UserType } from "../../type/common/userType";
import ConventionModal from "../@common/conventionModal";
import Footer from "../@common/footer";
import InputContainer from "../@common/inputContainer";
import SwitchToggle from "./switchToggle";

const Container = styled.section`
  position: absolute;
  top: 9.9rem;
  left: 96rem;
  right: 18.1rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 77.9rem;
  height: 88.8rem;

  backdrop-filter: blur(1rem);

  border: 0.3rem solid transparent;
  border-radius: 5rem;
  background-image: linear-gradient(rgba(13, 14, 17, 0.9), rgba(20, 21, 23, 0.6)),
    linear-gradient(to top, transparent, #3e4045);

  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const TitleWrapper = styled.div`
  width: 100%;
`;

const FormTitle = styled.h1`
  ${({ theme }) => theme.fonts.title}

  margin-top: 10.9rem;
  margin-left: 11rem;

  color: ${({ theme }) => theme.colors.white};
`;

const FormDescription = styled.h2`
  ${({ theme }) => theme.fonts.body1}

  margin-left: 11rem;
  margin-bottom: 7.8rem;

  color: ${({ theme }) => theme.colors.gray2};

  & > strong {
    color: ${({ theme }) => theme.colors.main};
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 11.1rem;

  margin-bottom: 5.3rem;
  padding: 0 11rem;
`;

const InputField = styled.input`
  ${({ theme }) => theme.fonts.input}

  width: 100%;
  height: 4rem;

  padding-bottom: 1rem;

  color: ${({ theme }) => theme.colors.white};

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

const PasswordAndEyeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PasswordEyeIcon = styled(PasswordEyeIc)`
  width: 3.5rem;
  height: 3.5rem;
`;

const ErrorMessage = styled.strong`
  ${({ theme }) => theme.fonts.description}

  width: 100%;
  height: 2rem;

  color: ${({ theme }) => theme.colors.red};

  margin-top: 1.1rem;
`;

const LoginButton = styled.button<{ userType: string; error: boolean }>`
  ${({ theme }) => theme.fonts.inputTitle};
  display: flex;
  justify-content: center;
  align-items: center;

  width: 56.1rem;
  height: 6.7rem;
  margin-top: 8rem;

  background-color: ${(props) =>
    props.userType === ROLE.PRODUCER
      ? ({ theme, error }) => (error ? theme.colors.gray4 : theme.colors.sub1)
      : ({ theme, error }) => (error ? theme.colors.gray4 : theme.colors.sub2)};
  border-radius: 30px;
`;

const LoginButtonIcon = styled(LoginButtonIc)`
  width: 9.1rem;
  height: 2rem;

  path {
    fill: ${({ theme }) => theme.colors.black};
  }
`;

const Img = styled.img`
  margin-top: 11rem;
  position: absolute;
  width: 192rem;
  height: 98rem;
`;

const Body = styled.section`
  width: 192rem;
  height: 98rem;
`;

const SignupText = styled.strong`
  cursor: pointer;
`;

const ForgotEmailText = styled.p`
  ${({ theme }) => theme.fonts.inputTitle};
  color: ${({ theme }) => theme.colors.gray2};

  margin-top: 3.2rem;

  cursor: pointer;
`;

export default function LoginForm() {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [userType, setUserType] = useState<UserType>("vocal");
  const { login, error } = useLogin();
  const { conventionModalInform } = useConventionModal();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  function switchUserType() {
    userType === "producer" ? setUserType("vocal") : setUserType("producer");
  }

  function handleMoveToSignup() {
    navigate("/signup");
  }

  function handleMoveToForgotPassword() {
    navigate("/forgot-password");
  }

  function toggleHidePassword() {
    setIsPasswordVisible((prev) => !prev);
  }

  return (
    <>
      {conventionModalInform?.isOpen && <ConventionModal />}

      <Img src={background} alt="배경" />
      <Body>
        <form
          onChange={handleSubmit(() => {})}
          onSubmit={handleSubmit((userInfo) => {
            login({ userEmail: userInfo.email, userPw: userInfo.password, userType: userType });
          })}>
          <Container>
            <TitleWrapper>
              <FormTitle>Log in</FormTitle>
              <FormDescription>
                If you are a new user, <SignupText onClick={handleMoveToSignup}>Sign up here</SignupText>
              </FormDescription>
            </TitleWrapper>

            <InputWrapper>
              <InputContainer title="Email" error={"email" in errors}>
                <InputField
                  placeholder="Enter your email address"
                  {...register("email", {
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Enter a valid email" },
                  })}
                />
              </InputContainer>
              <ErrorMessage>
                {errors.email?.message ||
                  (error?.response?.data.status === "U003" && "We don't have an account with that emial adress")}
              </ErrorMessage>
            </InputWrapper>
            <InputWrapper>
              <InputContainer title="password" error={"password" in errors}>
                <PasswordAndEyeWrapper>
                  <InputField
                    placeholder="Enter your password"
                    {...register("password", {
                      pattern: {
                        value: /^(?=.*[a-zA-Z])(?=.*[?!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
                        message: "Wrong password. Try again or click Forgot password to reset it.",
                      },
                    })}
                    type={isPasswordVisible ? "text" : "password"}
                  />
                  <PasswordEyeIcon onClick={toggleHidePassword} />
                </PasswordAndEyeWrapper>
              </InputContainer>
              <ErrorMessage>
                {errors.password?.message ||
                  (error?.response?.data.status === "U002" &&
                    "Wrong password. Try again or click Forgot password to reset it")}
              </ErrorMessage>
            </InputWrapper>
            <SwitchToggle switchUserType={switchUserType} />
            <LoginButton
              type="submit"
              userType={userType}
              error={!isDirty || "email" in errors || "password" in errors}>
              <LoginButtonIcon />
            </LoginButton>
            <ForgotEmailText onClick={handleMoveToForgotPassword}>Forgot password?</ForgotEmailText>
          </Container>
        </form>
      </Body>
      <Footer />
    </>
  );
}
