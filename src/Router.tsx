import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPasswordPage from "./@pages/forgotPasswordPage";
import MainPage from "./@pages/mainPage";
import ProducerPortfolioEditPage from "./@pages/producerPortfolioEditPage";
import ProducerProfileEditPage from "./@pages/producerProfileEditPage";
import SignupProfilePage from "./@pages/signupProfilePage";
import SignupStepPage from "./@pages/signupStepPage";
import SignupSuccessPage from "./@pages/signupSuccessPage";
import TrackPostPage from "./@pages/trackPostPage";
import UploadPage from "./@pages/uploadPage";
import VocalProfileEditPage from "./@pages/vocalProfileEditPage";
import ProducerPortfolioEditPage from "./@pages/producerPortfolioEditPage";
import ForgotPasswordPage from "./@pages/forgotPasswordPage";
import ResetPasswordPage from "./@pages/resetPasswordPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignupStepPage />} />
        <Route path="/signup/profile" element={<SignupProfilePage />} />
        <Route path="/signup/success" element={<SignupSuccessPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/upload/:uploadType" element={<UploadPage />} />
        <Route path="/portfolio-edit/producer/:trackId" element={<ProducerPortfolioEditPage />} />
        <Route path="/vocal-searching-edit/producer/:trackId" element={<ProducerPortfolioEditPage />} />
        <Route path="/portfolio-edit/vocal/:trackId" element={<UploadPage />} />
        {/* [ 예원 ] 리팩토링 임시 라우터 */}
        <Route path="/producer/profile-edit" element={<ProducerProfileEditPage />} />
        <Route path="/vocal/profile-edit" element={<VocalProfileEditPage />} />
        <Route path="/track-post/:id" index element={<TrackPostPage />} />
      </Routes>
    </BrowserRouter>
  );
}
