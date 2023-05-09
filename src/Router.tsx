import { BrowserRouter, Route, Routes } from "react-router-dom";
import UploadPage from "./@pages/uploadPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </BrowserRouter>
  );
}
