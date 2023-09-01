import { UseFormReturn } from "react-hook-form";

export interface ProfileEditType {
  methods: UseFormReturn<
    { userContact: string; userCategory: never[]; userKeyword: string; userIntroduction: string },
    any,
    undefined
  >;
}
