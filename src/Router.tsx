import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./@pages/mainPage";
import ProducerProfilePage from "./@pages/producerProfilePage";
import SignupProfilePage from "./@pages/signupProfilePage";
import SignupStepPage from "./@pages/signupStepPage";
import SignupSuccessPage from "./@pages/signupSuccessPage";
import TrackPostPage from "./@pages/trackPostPage";
import UploadPage from "./@pages/uploadPage";
import TrackSearchPage from "./@pages/trackSearchPage";
import VocalProfileEditPage from "./@pages/vocalProfileEditPage";
import ProducerPortfolioEditPage from "./@pages/producerPortfolioEditPage";
import { LoginPage } from "./@pages/loginPage";

import VocalProfilePage from "./@pages/vocalProfilePage";
import VocalSearchPage from "./@pages/vocalSearchPage";
import ForgotPasswordPage from "./@pages/forgotPasswordPage";
import ResetPasswordPage from "./@pages/resetPasswordPage";
import UploadEditPage from "./@pages/uploadEditPage";
import ProfileEditPage from "./@pages/profileEditPage";
import ErrorPage from "./@pages/errorPage";

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
        <Route path="/upload/vocal/portfolio" element={<UploadPage />} />
        <Route path="/upload/producer/:uploadType" element={<UploadPage />} />
        <Route path="/portfolio-edit/producer/:trackId" element={<UploadEditPage />} />
        <Route path="/vocal-searching-edit/producer/:trackId" element={<UploadEditPage />} />
        <Route path="/portfolio-edit/vocal/:trackId" element={<UploadPage />} />
        {/* [ 예원 ] 리팩토링 임시 라우터 */}
        <Route path="/profile-edit" element={<ProfileEditPage />} />
        <Route path="/track-post/:id" index element={<TrackPostPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/vocal-profile/:vocalId" element={<VocalProfilePage />} />
        <Route path="/producer-profile/:producerId" element={<ProducerProfilePage />} />
        <Route path="/track-search" element={<TrackSearchPage />} />
        <Route path="/vocal-search" element={<VocalSearchPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
