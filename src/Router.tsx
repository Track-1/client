import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupSuccessPage from "./@pages/signupSuccessPage";
import SignupStepPage from "./@pages/signupStepPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupStepPage />} />
        <Route path="/signup/success" element={<SignupSuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}
