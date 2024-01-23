import ProgressBar from '../../common/ProgressBar';
import Footer from '../common/Footer';
import Header from '../../header';
import NicknameConvention from './NicknameConvention';
import StepButtons from './StepButtons';
import Title from './Title';
import { useStep } from '../../../hooks/common/useStep';
import Role from './Role';
import EmailPassword from './EmailPassword';
import styled from 'styled-components';
import { StyledLayout } from '../../layout';
// import Layout from '../../layout';

export default function SingupStep() {
  const { step, moveToNextStep, moveToPrevStep } = useStep();

  return (
    <>
      <Header />
      <Layout>
        <SignupHeader>
          <ProgressBar progress={(step / 3) * 100} />
          <Title step={step} />
        </SignupHeader>
        {
          {
            1: <Role moveToNextStep={moveToNextStep} />,
            2: <EmailPassword />,
            3: <NicknameConvention />,
          }[step]
        }
        <StepButtons step={step} moveToNextStep={moveToNextStep} moveToPrevStep={moveToPrevStep} />
        <Footer />
      </Layout>
    </>
  );
}

const Layout = styled(StyledLayout)`
  justify-content: space-between;
`;

const SignupHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  width: 100%;

  margin: 4rem 0rem 6rem;
`;
