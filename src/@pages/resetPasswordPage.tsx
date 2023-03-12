import { useEffect } from "react";
import ResetPasswordInput from "../@components/resetPassword/resetPasswordInput";
import { validateResetPasswordToken } from "../core/api/validateResetPasswordToken";
import { useQuery } from "react-query";

export default function ResetPasswordPage() {
  const { data, isSuccess } = useQuery("validateToken", validateResetPasswordToken);

  return <>{isSuccess && <ResetPasswordInput />}</>;
}
