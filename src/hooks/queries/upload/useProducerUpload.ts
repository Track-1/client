import { useMutation } from "react-query";
import { USER_DATA } from "../../../core/common/userData";
import { uploadProducerPortfolio, uploadVocalSearching } from "../../../api/upload/producer/uploadProducer";
import { QUERIES_KEY } from "../../../core/common/queriesKey";
import { UploadData } from "../../../recoil/upload/uploadData";
import { useRecoilValue } from "recoil";

export default function useProducerUpload(uploadType: string) {
  const uploadData = useRecoilValue(UploadData);

  const { data: uploadProducerPortfolioData, mutate: uploadProducerPortfolioMutate } = useMutation(
    QUERIES_KEY.UPLOAD_PRODUCER_PORTFOLIO,
    () => uploadProducerPortfolio(uploadData),
    {},
  );

  const { data: uploadVocalSearchingData, mutate: uploadVocalSearchingMutate } = useMutation(
    QUERIES_KEY.UPLOAD_VOCAL_SEARCHING,
    () => uploadVocalSearching(uploadData),
    {},
  );

  return uploadType === USER_DATA.PORTFOLIO
    ? { uploadProducerPortfolioData, uploadProducerPortfolioMutate }
    : { uploadVocalSearchingData, uploadVocalSearchingMutate };
}
