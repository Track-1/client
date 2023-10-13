import { useLocation, useNavigate } from "react-router-dom";

export default function usePrevPage(staticPrevURL?: string | number) {
  const prevURL = useLocation().state?.prevURL;
  const navigate = useNavigate();

  console.log(useLocation());

  function handleMovePrevPage() {
    if (switchSpecificPrevPage()) return;

    staticPrevURL
      ? typeof staticPrevURL === "string"
        ? navigate(staticPrevURL)
        : navigate(-1)
      : prevURL
      ? navigate(prevURL)
      : navigate(-1);
  }

  function switchSpecificPrevPage() {
    switch (prevURL) {
      case "/profile-edit":
        navigate(-1);
        return true;
      case "/signup/success":
        navigate(-1);
        return true;
      default:
        return false;
    }
  }

  return { handleMovePrevPage };
}
