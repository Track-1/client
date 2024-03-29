import InputContainer from "../../@common/inputContainer";
import styled from "styled-components";
import { UseFormReturn } from "react-hook-form";

interface ProducerContactEditProps {
  methods: UseFormReturn<
    {
      nickName: string;
      contact: string;
    },
    any,
    undefined
  >;
}

export default function VocalContactEdit(props: ProducerContactEditProps) {
  const {
    methods: { register },
  } = props;

  return (
    <Container>
      <InputContainer title="Contact">
        <ContactInput type="text" placeholder="Enter your phone number or SNS account" {...register("contact", {})} />
      </InputContainer>
    </Container>
  );
}
const Container = styled.div`
  margin-bottom: 4.3rem;
`;

const ContactInput = styled.input`
  color: white;

  border-bottom: 1px solid ${({ color }) => color};

  width: 56rem;

  ${({ theme }) => theme.fonts.input}
`;
