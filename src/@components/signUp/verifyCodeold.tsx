export default function VerifyCodeOld() {
  return (
    <>
      {/* {isSendCode && (
        <InputContainer>
          <Text>Verification code</Text>
          <InputWrapper>
            <Input
              type="text"
              placeholder="Verify your email address"
              onChange={handleChangeVerificationCode}
              underline={checkInputUnderline(verificationCodes.message)}
            />
            {CheckErrorIcon(verificationCodes.message) && (
              <IconWrapper>{CheckErrorIcon(verificationCodes.message)}</IconWrapper>
            )}
            <Button isActive={checkIsVerificationCodeActive()} onClick={handleVerifyCode}>
              <SignupEmailVerifyIc />
            </Button>
          </InputWrapper>
          <MessageWrapper textColor={checkMessageColor(verificationCodes.message)}>
            {verificationCodes.message}
          </MessageWrapper>
        </InputContainer>
      )} */}
    </>
  );
}

// const InputContainer = styled.section`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
// `;

// const Text = styled.h1`
//   margin: 13.4rem 0 3rem 0;

//   color: ${({ theme }) => theme.colors.gray2};
//   ${({ theme }) => theme.fonts.body1};
// `;

// const Input = styled.input<{ underline: string }>`
//   width: 42.2rem;
//   height: 4rem;

//   border-bottom: 1px solid ${({ underline }) => underline};

//   color: ${({ theme }) => theme.colors.gray2};
//   ${({ theme }) => theme.fonts.input};
// `;

// const Button = styled.button<{ isActive: boolean }>`
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   width: 12.7rem;
//   height: 4rem;

//   border-radius: 2.2rem;
//   background-color: ${({ theme, isActive }) => (isActive ? theme.colors.main : theme.colors.gray4)};
// `;

// const InputWrapper = styled.article`
//   display: flex;
//   justify-content: space-between;

//   width: 56rem;
//   height: 3.5rem;
// `;

// const IconWrapper = styled.div`
//   margin-left: -3.9rem;
// `;

// const MessageWrapper = styled.p<{ textColor: string }>`
//   margin-top: 1.1rem;

//   color: ${({ textColor }) => textColor};

//   ${({ theme }) => theme.fonts.message};
// `;
