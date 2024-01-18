import { FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'track-1-design-system';
import { useFormWithRef } from 'track-1-form-with-react-hook-form';
import { useProfileAfterJoin } from '../../../hooks/queries/user';
import ProfileContact from './ProfileContact';
import ProfileDescriptionEdit from './ProfileDescriptionEdit';
import ProfileHashtagEdit from './ProfileHashtagEdit';
import ProfileSelectCategoryEdit from './ProfileSelectCategoryEdit';
import SignupSuccessBackgroundImg from '../../../assets/image/signup/signupSuccessBackgroundImg.png';

export default function SignupProfile() {
  const methods = useFormWithRef<{ contact: string; category: any; hashtag: string[]; description: string }>({
    defaultValues: {
      contact: '',
      category: [],
      hashtag: [],
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
    console.log({
      userContact: getValues('contact'),
      userCategory: getValues('category'),
      userKeyword: getValues('hashtag').length > 0 ? getValues('hashtag').filter((item) => item.length > 0) : [],
      userIntroduction: getValues('description'),
    });
    // profileAtferJoin({
    //   userContact: getValues('contact'),
    //   userCategory: getValues('category'),
    //   userKeyword: getValues('hashtag').length > 0 ? getValues('hashtag').filter((item) => item.length > 0) : [],
    //   userIntroduction: getValues('description'),
    // });
  }

  return (
    <FormProvider {...methods}>
      <Styled.Background />
      <Styled.SignupProfileLayout>
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

    padding: 0 2.5rem;
  `,

  Buttons: styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 6rem;
    padding-bottom: 6rem;
  `,

  SignupProfileLayout: styled.div`
    width: 100%;

    overflow-y: scroll;
    margin-top: 24.9rem;
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
  `,

  Background: styled.div`
    position: fixed;
    top: 0;
    z-index: -1;

    width: 100%;
    height: 100%;

    background-image: url(${SignupSuccessBackgroundImg});
    background-repeat: no-repeat;
    background-size: contain;
  `,
};
