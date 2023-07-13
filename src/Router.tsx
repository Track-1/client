import { BrowserRouter, Route, Routes } from "react-router-dom";
import UploadPage from "./@pages/uploadPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/portfolio-edit/producer/:portfolioId" element={<UploadPage />} />
        <Route path="/portfolio-edit/vocal/:portfolioId" element={<UploadPage />} />
      </Routes>
    </BrowserRouter>
  );
}
