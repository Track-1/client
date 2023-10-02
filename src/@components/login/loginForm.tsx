import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { LoginButtonIc } from "../../assets";
import background from "../../assets/icon/signupBackgroundIc.svg";
import useConventionModal from "../../hooks/common/useConventionModal";
import { useLogin } from "../../hooks/queries/user";
import { UserType } from "../../type/common/userType";
import ConventionModal from "../@common/conventionModal";
import Footer from "../@common/footer";
import SignUpBackButton from "../signUp/signUpBackButton";
import SwitchToggle from "./switchToggle";

const BackButtonWrapper = styled.div`
  margin: 5.9rem 0 0 7.9rem;
`;

const Container = styled.section`
  position: absolute;
  top: 9.9rem;
  left: 96rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 77.9rem;
  height: 88.8rem;

  right: 18.1rem;

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

  margin-top: 9.5rem;
  margin-left: 10.9rem;

  color: ${({ theme }) => theme.colors.white};
`;

const FormDescription = styled.h2`
  ${({ theme }) => theme.fonts.body1}

  margin-top: 1.4rem;
  margin-left: 10.9rem;
  margin-bottom: 1.2rem;

  color: ${({ theme }) => theme.colors.gray2};

  & > strong {
    color: ${({ theme }) => theme.colors.main};
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 11.1rem;

  margin-top: 5.3rem;
  padding: 0 10.9rem;
`;

const InputTitle = styled.h3`
  ${({ theme }) => theme.fonts.body1}
  color: ${({ theme }) => theme.colors.gray2};
`;

const InputField = styled.input<{ error: boolean }>`
  ${({ theme }) => theme.fonts.input}

  width: 100%;
  height: 4rem;

  margin-top: 2.4rem;
  padding-bottom: 1rem;
  border-bottom: 0.1rem solid ${({ theme, error }) => (error ? theme.colors.red : theme.colors.gray4)};

  color: ${({ theme }) => theme.colors.white};

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

const ErrorMessage = styled.strong`
  ${({ theme }) => theme.fonts.input}

  width: 100%;
  height: 2rem;

  color: ${({ theme }) => theme.colors.red};

  margin-top: 1.1rem;
`;

const LoginButton = styled.button`
  ${({ theme }) => theme.fonts.inputTitle};
  display: flex;
  justify-content: center;
  align-items: center;

  width: 56.1rem;
  height: 6.7rem;
  margin-top: 8.8rem;

  background-color: ${({ theme }) => theme.colors.sub1};
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

export default function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [userType, setUserType] = useState<UserType>("vocal");
  const { login } = useLogin();
  const { conventionModalInform } = useConventionModal();

  function switchUserType() {
    userType === "producer" ? setUserType("vocal") : setUserType("producer");
  }

  return (
    <>
      {conventionModalInform?.isOpen && <ConventionModal />}

      <BackButtonWrapper>
        <SignUpBackButton />
      </BackButtonWrapper>
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
                If you are a new user, <strong>Sign up here</strong>
              </FormDescription>
            </TitleWrapper>
            <InputWrapper>
              <InputTitle>Email</InputTitle>
              <InputField
                placeholder="Enter your email address"
                {...register("email", {
                  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Enter a valid email" },
                })}
                error={"email" in errors}
              />
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper>
              <InputTitle>Password</InputTitle>
              <InputField
                placeholder="Enter your password"
                {...register("password", {
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{10,}$/,
                    message: "Wrong password. Try again or click Forgot password to reset it.",
                  },
                })}
                error={"password" in errors}
              />
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            </InputWrapper>
            <SwitchToggle switchUserType={switchUserType} />
            <LoginButton type="submit">
              <LoginButtonIcon />
            </LoginButton>
          </Container>
        </form>
      </Body>
      <Footer />
    </>
  );
}
