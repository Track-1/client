import { useLocation, useParams } from "react-router-dom";
import { useEditTrack } from "../tracks";
import { useEditProducerPortfolio, useEditVocalPortfolio } from "../mypage";
import { ROLE } from "../../../core/common/roleType";

export default function useUploadEditAPI() {
  const location = useLocation();
  const pathName = location.pathname;
  let { trackId } = useParams() as { trackId: string | number };
  trackId = Number(trackId);

  const { editTrack } = useEditTrack();
  const { editVocalPortfolio } = useEditVocalPortfolio();
  const { editProducerPortfolio } = useEditProducerPortfolio();

  function uploadEditAPI() {
    if (pathName.includes(ROLE.PRODUCER)) {
      return pathName.includes("portfolio") ? editProducerPortfolio : editTrack;
    } else {
      return editVocalPortfolio;
    }
  }

  return { uploadEditAPI, trackId };
}
