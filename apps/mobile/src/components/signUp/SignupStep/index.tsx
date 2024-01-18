import { useState } from 'react';
import { SIGNUP_STEP } from '../../../core/signUp/stepRenderer';
import ProgressBar from '../../common/ProgressBar';
import Footer from '../common/Footer';

import Header from '../../header';
import { Layout, SignupHeader } from './Layout';
import NicknameConvention from './NicknameConvention';
import StepButtons from './StepButtons';
import Title from './Title';

export default function SingupStep() {
  const [step, setStep] = useState(SIGNUP_STEP.ROLE);

  return (
    <>
      <Header />
      <Layout>
        <SignupHeader>
          <ProgressBar progress={(step / 3) * 100} />
          <Title step={step} />
        </SignupHeader>
        <NicknameConvention />
        {/* <StepMain step={step} /> */}
        <StepButtons step={step} setStep={setStep} />
        <Footer />
      </Layout>
    </>
  );
}
