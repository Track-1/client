import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./@pages/mainPage";
import ProducerProfilePage from "./@pages/producerProfilePage";
import TrackPostPage from "./@pages/trackPostPage";
import TrackSearchPage from "./@pages/trackSearchPage";
import VocalProfilePage from "./@pages/vocalProfilePage";
import VocalsPage from "./@pages/vocalsPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/track-search" element={<TrackSearchPage />} />
        <Route path="/vocals" element={<VocalsPage />} />
        <Route path="/track-post" element={<TrackPostPage />} />
        <Route path="/producer-profile" element={<ProducerProfilePage />} />
        <Route path="/vocal-profile" element={<VocalProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}
