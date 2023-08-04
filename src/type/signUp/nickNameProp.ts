import { UseFormReturn } from "react-hook-form";

export interface NickNameProp {
  methods: UseFormReturn<{ nickName: string }, any, undefined>;
}
