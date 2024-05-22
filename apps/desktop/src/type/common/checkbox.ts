import { ComponentPropsWithoutRef } from "react";

export type CheckBoxProps = {
  id?: string;
  externalFn?: any;
  defaultChecked?: boolean;
};

export type IndicatorProps = {
  asChild?: boolean;
} & ComponentPropsWithoutRef<"input">;

export type LabelProps = {
  asChild?: boolean;
};
