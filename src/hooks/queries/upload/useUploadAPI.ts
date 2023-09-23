import { useLocation } from "react-router-dom";
import { useUploadTrack } from "../tracks";
import { useUploadProducerPortfolio, useUploadVocalPortfolio } from "../mypage";
import { ROLE } from "../../../core/common/roleType";

export default function useUploadAPI() {
  const location = useLocation();
  const pathName = location.pathname;

  const { uploadTrack } = useUploadTrack();
  const { uploadProducerPortfolio } = useUploadProducerPortfolio();
  const { uploadVocalPortfolio } = useUploadVocalPortfolio();

  function uploadAPI() {
    if (pathName.includes(ROLE.PRODUCER)) {
      return pathName.includes("portfolio") ? uploadProducerPortfolio : uploadTrack;
    } else {
      return uploadVocalPortfolio;
    }
  }

  return { uploadAPI };
}
