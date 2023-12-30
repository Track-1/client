import { useState } from 'react';
import { SIGNUP_STEP } from '../../../core/signUp/stepRenderer';
import ProgressBar from '../../common/ProgressBar';
import Footer from '../common/Footer';

import { Header, Layout } from './Layout';
import StepButtons from './StepButtons';
import StepMain from './StepMain';
import Title from './Title';

export default function SingupStep() {
  const [step, setStep] = useState(SIGNUP_STEP.ROLE);

  return (
    <Layout>
      <Header>
        <ProgressBar progress={(step / 3) * 100} />
        <Title step={step} />
      </Header>
      <StepMain step={step} />
      <StepButtons step={step} setStep={setStep} />
      <Footer />
    </Layout>
  );
}
