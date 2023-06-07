import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProducerProfileEditPage from "./@pages/producerProfileEditPage";
import SignupProfilePage from "./@pages/signupProfilePage";
import SignupStepPage from "./@pages/signupStepPage";
import SignupSuccessPage from "./@pages/signupSuccessPage";
import VocalProfileEditPage from "./@pages/vocalProfileEditPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupStepPage />} />
        <Route path="/signup/profile" element={<SignupProfilePage />} />
        <Route path="/signup/success" element={<SignupSuccessPage />} />
        {/* [ 예원 ] 리팩토링 임시 라우터 */}
        <Route path="/producer/profile-edit" element={<ProducerProfileEditPage />} />
        <Route path="/vocal/profile-edit" element={<VocalProfileEditPage />} />
      </Routes>
    </BrowserRouter>
  );
}
