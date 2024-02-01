import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from './@pages/mainPage';
import ProducerProfilePage from './@pages/producerProfilePage';
import SignupProfilePage from './@pages/signupProfilePage';
import SignupStepPage from './@pages/signupStepPage';
import SignupSuccessPage from './@pages/signupSuccessPage';
import TrackPostPage from './@pages/trackPostPage';
import UploadPage from './@pages/uploadPage';

import ErrorPage from './@pages/errorPage';
import ForgotPasswordPage from './@pages/forgotPasswordPage';
import LoginPage from './@pages/loginPage';
import ProfileEditPage from './@pages/profileEditPage';
import ResetPasswordPage from './@pages/resetPasswordPage';
import TrackSearchPage from './@pages/trackSearchPage';
import UploadEditPage from './@pages/uploadEditPage';
import VocalProfilePage from './@pages/vocalProfilePage';
import VocalSearchPage from './@pages/vocalSearchPage';
import PrivateRoute from './utils/common/privateRouter';
import EventPage from './@pages/eventPage';
import AdminPage from './@pages/adminPage';
import AboutPage from './@pages/aboutPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/event/:eventId" element={<EventPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signup" element={<SignupStepPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/track-search" element={<TrackSearchPage />} />
        <Route path="/vocal-search" element={<VocalSearchPage />} />
        <Route path="/track-post/:id" element={<TrackPostPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />

        {/* 반드시 인증 필요 */}
        <Route element={<PrivateRoute authentication={true} />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/signup/profile" element={<SignupProfilePage />} />
          <Route path="/signup/success" element={<SignupSuccessPage />} />
          <Route path="/upload/vocal/portfolio" element={<UploadPage />} />
          <Route path="/upload/producer/:uploadType" element={<UploadPage />} />
          <Route path="/portfolio-edit/producer/:trackId" element={<UploadEditPage />} />
          <Route path="/vocal-searching-edit/producer/:trackId" element={<UploadEditPage />} />
          <Route path="/portfolio-edit/vocal/:trackId" element={<UploadPage />} />
          <Route path="/profile-edit/:id" element={<ProfileEditPage />} />
          <Route path="/vocal-profile/:vocalId" element={<VocalProfilePage />} />
          <Route path="/producer-profile/:producerId" element={<ProducerProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
