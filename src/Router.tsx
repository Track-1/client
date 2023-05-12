import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupSuccessPage from "./@pages/signupSuccessPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup/success" element={<SignupSuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}
