import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProducerProfileEditPage from "./@pages/producerProfileEditPage";
import VocalProfileEditPage from "./@pages/vocalProfileEditPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* [ 예원 ] 리팩토링 임시 라우터 */}
        <Route path="/producer/profile-edit" element={<ProducerProfileEditPage />} />
        <Route path="/vocal/profile-edit" element={<VocalProfileEditPage />} />
      </Routes>
    </BrowserRouter>
  );
}
