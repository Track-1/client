import styled from "styled-components";

export const FormContainer = styled.section`
  position: absolute;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 77.9rem;

  backdrop-filter: blur(1rem);
  border: 0.3rem solid transparent;
  border-radius: 5rem;
  background-image: linear-gradient(rgba(20, 21, 23, 0.6), rgba(20, 21, 23, 0.6)),
    linear-gradient(to top, transparent, #3e4045);
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

export const InputContainer100 = styled.section`
  display: flex;
  justify-content: space-between;

  width: 55.9rem;
`;

export const InputContainer200 = styled.input`
  color: white;

  border-bottom: 1px solid ${({ color }) => color};

  width: 56rem;

  ${({ theme }) => theme.fonts.input}
`;

export const InputTitle = styled.h2`
  margin-bottom: 3rem;

  color: ${({ theme }) => theme.colors.gray2};
  ${({ theme }) => theme.fonts.body1};
`;
