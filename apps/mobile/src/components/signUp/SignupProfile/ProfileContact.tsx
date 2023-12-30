import { useFormContextWithRef } from 'track-1-form-with-react-hook-form';
import InputForm from '../../common/Form/inputForm';
import { StyledInput } from '../../common/Input';

export default function ProfileContact() {
  const { registerWithRef, ...methods } = useFormContextWithRef();

  return (
    <InputForm inputTitle="Contact information">
      <StyledInput
        {...registerWithRef('contact', {})}
        type="text"
        placeholder="Enter your phone number or SNS account"
      />
    </InputForm>
  );
}
