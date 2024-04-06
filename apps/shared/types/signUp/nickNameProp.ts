import { UseFormReturn } from "react-hook-form";

export interface NickNameProp {
  methods: UseFormReturn<{ nickName: string }, any, undefined>;
}

export interface ContactProp {
  methods: UseFormReturn<{ contact: string }, any, undefined>;
}
