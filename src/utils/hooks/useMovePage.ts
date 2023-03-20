import { useNavigate } from "react-router-dom";

export default function useMovePage() {
  const navigate = useNavigate();
  function setPage(url: string) {
    return navigate(url);
  }
  return [setPage];
}
