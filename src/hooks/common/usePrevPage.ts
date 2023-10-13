import { useLocation, useNavigate } from "react-router-dom";

export default function usePrevPage(staticPrevURL?: string | number) {
  const prevURL = useLocation().state?.prevURL;
  const navigate = useNavigate();

  console.log(useLocation());

  function handleMovePrevPage() {
    staticPrevURL
      ? typeof staticPrevURL === "string"
        ? navigate(staticPrevURL)
        : navigate(-1)
      : prevURL
      ? navigate(prevURL)
      : navigate(-1);
  }

  return { handleMovePrevPage };
}
