import { FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'track-1-design-system';
import { useFormWithRef } from 'track-1-form-with-react-hook-form';
import { useProfileAfterJoin } from '../../../hooks/queries/user';
import Header from './Header';
import ProfileContact from './ProfileContact';
import ProfileDescriptionEdit from './ProfileDescriptionEdit';
import ProfileHashtagEdit from './ProfileHashtagEdit';
import ProfileSelectCategoryEdit from './ProfileSelectCategoryEdit';

export default function SignupProfile() {
  const methods = useFormWithRef({
    defaultValues: {
      contact: '',
      category: [],
      hashtag: [''],
      description: '',
    },
    mode: 'onChange',
  });

  const {
    formState: { isDirty },
    handleSubmit,
  } = methods;

  const { profileAtferJoin } = useProfileAfterJoin();
  const navigate = useNavigate();

  function handleMoveToSuccess() {
    navigate('/signup/success');
  }

  function handleSubmitProfile() {
    handleSubmit(({ contact, category, hashtag, description }) =>
      profileAtferJoin({
        userContact: contact,
        userCategory: category,
        userKeyword: hashtag.length > 0 ? hashtag.filter((item) => item.length > 0) : [],
        userIntroduction: description,
      })
    );
  }

  return (
    <FormProvider {...methods}>
      <Styled.SignupProfileLayout>
        <Header />
        <form>
          <ProfileContact />
          <ProfileSelectCategoryEdit />
          <ProfileHashtagEdit />
          <ProfileDescriptionEdit />
          <Button
            size="large"
            color={isDirty ? 'white' : 'grey'}
            backgroundColor={isDirty ? 'purple' : 'grey'}
            type="free"
            disabled={isDirty ? false : true}
            onClick={handleSubmitProfile}>
            Complete
          </Button>
          <Styled.Skip onClick={handleMoveToSuccess}>Skip</Styled.Skip>
        </form>
      </Styled.SignupProfileLayout>
    </FormProvider>
  );
}

const Styled = {
  SignupProfileLayout: styled.div`
    width: 100%;
  `,
  Skip: styled.div`
    color: ${({ theme }) => theme.colors.gray3};
    background-color: transparent;
    height: 5.2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
