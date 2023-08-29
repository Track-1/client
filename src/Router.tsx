import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProducerProfileEditPage from "./@pages/producerProfileEditPage";
import TrackPostPage from "./@pages/trackPostPage";
import SignupProfilePage from "./@pages/signupProfilePage";
import SignupStepPage from "./@pages/signupStepPage";
import SignupSuccessPage from "./@pages/signupSuccessPage";
import UploadPage from "./@pages/uploadPage";
import TrackSearchPage from "./@pages/trackSearchPage";
import VocalProfileEditPage from "./@pages/vocalProfileEditPage";
import VocalSearchPage from "./@pages/vocalSearchPage";
import ProducerPortfolioEditPage from "./@pages/producerPortfolioEditPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupStepPage />} />
        <Route path="/signup/profile" element={<SignupProfilePage />} />
        <Route path="/signup/success" element={<SignupSuccessPage />} />
        <Route path="/upload/:uploadType" element={<UploadPage />} />
        <Route path="/portfolio-edit/producer/:trackId" element={<ProducerPortfolioEditPage />} />
        <Route path="/vocal-searching-edit/producer/:trackId" element={<ProducerPortfolioEditPage />} />
        <Route path="/portfolio-edit/vocal/:trackId" element={<UploadPage />} />
        {/* [ 예원 ] 리팩토링 임시 라우터 */}
        <Route path="/producer/profile-edit" element={<ProducerProfileEditPage />} />
        <Route path="/vocal/profile-edit" element={<VocalProfileEditPage />} />
        <Route path="/track-post/:id" index element={<TrackPostPage />} />
        <Route path="/track-search" element={<TrackSearchPage />} />
        <Route path="/vocal-search" element={<VocalSearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}
