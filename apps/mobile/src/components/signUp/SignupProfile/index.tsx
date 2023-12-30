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
    getValues,
    formState: { isDirty },
  } = methods;

  const { profileAtferJoin } = useProfileAfterJoin();
  const navigate = useNavigate();

  function handleMoveToSuccess() {
    navigate('/signup/success');
  }

  function handleSubmitProfile() {
    profileAtferJoin({
      userContact: getValues('contact'),
      userCategory: getValues('category'),
      userKeyword: getValues('hashtag').length > 0 ? getValues('hashtag').filter((item) => item.length > 0) : [],
      userIntroduction: getValues('description'),
    });
  }

  return (
    <FormProvider {...methods}>
      <Styled.SignupProfileLayout>
        <Header />
        <Styled.Layout>
          <Styled.InputWrapper>
            <ProfileContact />
            <ProfileSelectCategoryEdit />
            <ProfileHashtagEdit />
            <ProfileDescriptionEdit />
          </Styled.InputWrapper>
          <Styled.Buttons>
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
          </Styled.Buttons>
        </Styled.Layout>
      </Styled.SignupProfileLayout>
    </FormProvider>
  );
}

const Styled = {
  Layout: styled.div`
    width: 100%;
    height: 100vh;
    padding: 2.5rem;
  `,
  Buttons: styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 6rem;
    padding-bottom: 6rem;
  `,
  SignupProfileLayout: styled.div`
    width: 100%;
    height: 100vh;

    overflow-y: scroll;
  `,
  Skip: styled.div`
    ${({ theme }) => theme.fonts.Pre_16_R};
    color: ${({ theme }) => theme.colors.gray3};
    background-color: transparent;
    height: 5.2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  InputWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;
    margin-top: -15.1rem;
  `,
};
