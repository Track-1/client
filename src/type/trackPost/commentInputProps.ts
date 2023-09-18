import { UseFormReturn } from "react-hook-form";
import { CommentDataType } from "./commentDataType";

export interface CommentInputProps {
  methods: UseFormReturn<CommentDataType, any, undefined>;
}
