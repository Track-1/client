import { useState } from "react";

export default function useForgotPasswordData() {
  const [producerType, setProducerType] = useState(false);

  function handleChangeUserType() {
    setProducerType((prev) => !prev);
  }

  return { producerType, handleChangeUserType };
}
