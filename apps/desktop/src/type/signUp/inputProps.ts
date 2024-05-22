import { UseFormReturn } from "react-hook-form";
import { EmailPasswordInputType } from "./inputType";

export interface SignupInputProps {
  methods: UseFormReturn<EmailPasswordInputType, any, undefined>;
  placeholder?: string;
  width?: number;
}
