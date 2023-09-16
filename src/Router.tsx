import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./@pages/errorPage";
import ForgotPasswordPage from "./@pages/forgotPasswordPage";
import LoginPage from "./@pages/loginPage";
import MainPage from "./@pages/mainPage";
import MobileLandingPage from "./@pages/mobileLandingPage";
import ProducerPortfolioEditPage from "./@pages/producerPortfolioEditPage";
import ProducerProfileEditPage from "./@pages/producerProfileEditPage";
import ProducerProfilePage from "./@pages/producerProfilePage";
import ResetPasswordPage from "./@pages/resetPasswordPage";
import SignUpPage from "./@pages/signUpPage";
import TrackPostEditPage from "./@pages/trackPostEditPage";
import TrackPostPage from "./@pages/trackPostPage";
import TrackSearchPage from "./@pages/trackSearchPage";
import UploadPage from "./@pages/uploadPage";
import VocalPortfolioEditPage from "./@pages/vocalPortfolioEditPage";
import VocalProfileEditPage from "./@pages/vocalProfileEditPage";
import VocalProfilePage from "./@pages/vocalProfilePage";
import VocalsPage from "./@pages/vocalsPage";
import PrivateRoute from "./utils/common/privateRoute";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<MainPage />} />
        <Route path="/login" index element={<LoginPage />} />
        <Route path="/track-search" index element={<TrackSearchPage />} />
        <Route path="/vocal-search" index element={<VocalsPage />} />
        <Route path="/track-post/:beatId" index element={<TrackPostPage />} />

        {/* 반드시 인증 필요 */}
        <Route element={<PrivateRoute authentication={true} />}>
          <Route path="/track-post/edit/:beatId" element={<TrackPostEditPage />} />
          <Route path="/producer-profile/:producerId" element={<ProducerProfilePage />} />
          <Route path="/portfolio-edit/producer/:portfolioId" element={<ProducerPortfolioEditPage />} />
          <Route path="/portfolio-edit/vocal/:portfolioId" element={<VocalPortfolioEditPage />} />
          <Route path="/vocal-profile/:vocalId" element={<VocalProfilePage />} />
          <Route path="/upload/:producerUploadType" element={<UploadPage />} />
        </Route>

        <Route path="/forgot-password" index element={<ForgotPasswordPage />} />
        <Route path={"/reset-password/:token"} index element={<ResetPasswordPage />} />
        <Route path="/sign-up" index element={<SignUpPage />} />

        {/* 반드시 인증 필요 */}
        <Route element={<PrivateRoute authentication={true} />}>
          <Route path="/profile-edit/producer/:id" element={<ProducerProfileEditPage />} />
          <Route path="/profile-edit/vocal/:id" element={<VocalProfileEditPage />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />

        {/* 모바일 랜딩 임시라우팅 */}
        <Route path="/mobile" element={<MobileLandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
