export type SwitchContextType = {
  currentThumb: "on" | "off";
  switchThumb: () => void;
};

export type SwitchProps = {
  externalState?: any;
};

export type LabelProps = {
  asChild?: boolean;
  onLabel: string;
  offLabel: string;
};

export type RootProps = {
  asChild?: boolean;
};

export type ThumbProps = {
  asChild?: boolean;
};
