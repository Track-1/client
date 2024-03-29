import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from './pages/mainPage';
import ProducerProfilePage from './pages/producerProfilePage';
import SignupProfilePage from './pages/signupProfilePage';
import SignupStepPage from './pages/signupStepPage';
import SignupSuccessPage from './pages/signupSuccessPage';
import TrackPostPage from './pages/trackPostPage';
import LoginPage from './pages/loginPage';
import TrackSearchPage from './pages/trackSearchPage';
import VocalProfilePage from './pages/vocalProfilePage';
import VocalSearchPage from './pages/vocalSearchPage';
import PrivateRoute from './utils/common/privateRouter';
import EventPage from './pages/eventPage';
import AboutPage from './pages/aboutPage';
import EventDetailPage from './pages/eventDetailPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/event/:eventId" element={<EventDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signup" element={<SignupStepPage />} />

        <Route path="/track-search" element={<TrackSearchPage />} />
        <Route path="/vocal-search" element={<VocalSearchPage />} />
        <Route path="/track-post/:id" element={<TrackPostPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PrivateRoute authentication />}>
          <Route path="/signup/profile" element={<SignupProfilePage />} />
          <Route path="/signup/success" element={<SignupSuccessPage />} />
          <Route path="/vocal-profile/:vocalId" element={<VocalProfilePage />} />
          <Route path="/producer-profile/:producerId" element={<ProducerProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
