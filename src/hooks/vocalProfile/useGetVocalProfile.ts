import { useQuery } from "react-query";
import { getVocalProfile } from "../../api/profile";

export default function useGetVocalProfile(userId: number) {
  const { data: vocalProfile } = useQuery(
    ["getVocalProfile"],
    () =>
      getVocalProfile({
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

  return { vocalProfile };
}
