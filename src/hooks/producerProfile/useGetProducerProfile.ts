import { useQuery } from "react-query";
import { getProducerProfile } from "../../api/profile";

export default function useGetProducerProfile(userId: number) {
  const { data: producerProfile } = useQuery(
    ["getProducerProfile"],
    () =>
      getProducerProfile({
        userId: userId,
        page: 1,
        limit: 1,
      }),
    {
      onError: (err) => {
        console.log(err);
      },
    },
  );

  return { producerProfile };
}
