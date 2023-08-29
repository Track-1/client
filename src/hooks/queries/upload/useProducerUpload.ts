import { useMutation } from "react-query";
import { UPLOAD_TYPE } from "../../../core/common/uploadType";
import { uploadProducerPortfolio, uploadVocalSearching } from "../../../api/upload/producer/uploadProducer";
import { QUERIES_KEY } from "../../../core/common/queriesKey";
import { UploadData } from "../../../recoil/upload/uploadData";
import { useRecoilValue } from "recoil";

export default function useProducerUpload(uploadType: string) {
  const uploadData = useRecoilValue(UploadData);

  const { mutate: uploadProducerPortfolioMutate } = useMutation(
    QUERIES_KEY.UPLOAD_PRODUCER_PORTFOLIO,
    () => uploadProducerPortfolio(uploadData),
    {},
  );

  const { mutate: uploadVocalSearchingMutate } = useMutation(
    QUERIES_KEY.UPLOAD_VOCAL_SEARCHING,
    () => uploadVocalSearching(uploadData),
    {},
  );

  return uploadType === UPLOAD_TYPE.PORTFOLIO ? [uploadProducerPortfolioMutate] : [uploadVocalSearchingMutate];
}
