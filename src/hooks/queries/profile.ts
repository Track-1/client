import { useMutation } from "react-query";
import { patchProducerProfile, patchVocalProfile } from "../../api/profile";

export function useProducerInfo() {
  //무한스크롤 미적용
}

export function useVocalInfo() {
  //무한스크롤 미적용
}

export function useEditProdcerProfile() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: (formaData: FormData) => patchProducerProfile(formaData),
    onSuccess: () => {},
    onError: () => {},
  });
  return {
    editProducerProfile: mutate,
    ...restValues,
  };
}

export function useEditVocalProfile() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: (formaData: FormData) => patchVocalProfile(formaData),
    onSuccess: () => {},
    onError: () => {},
  });
  return {
    editVocalProfile: mutate,
    ...restValues,
  };
}
