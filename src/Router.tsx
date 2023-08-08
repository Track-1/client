import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProducerProfileEditPage from "./@pages/producerProfileEditPage";
import TrackPostPage from "./@pages/trackPostPage";
import UploadPage from "./@pages/uploadPage";
import VocalProfileEditPage from "./@pages/vocalProfileEditPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/portfolio-edit/producer/:portfolioId" element={<UploadPage />} />
        <Route path="/portfolio-edit/vocal/:portfolioId" element={<UploadPage />} />
        {/* [ 예원 ] 리팩토링 임시 라우터 */}
        <Route path="/producer/profile-edit" element={<ProducerProfileEditPage />} />
        <Route path="/vocal/profile-edit" element={<VocalProfileEditPage />} />
        <Route path="/track-post/:id" index element={<TrackPostPage />} />
      </Routes>
    </BrowserRouter>
  );
}
