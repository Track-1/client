export type SelectContextType = {
  isSelecBoxOpen: boolean;
  toggleBoxOpen: () => void;
  selectedId: number | null;
  selectOption: (id: number | null) => void;
};

export type SelectBoxProps<T> = {
  defaultOpen?: boolean;
  externalSelectState?: T;
};

export type externalStateType = {
  (id: number | null): void;
};

export type LabelProps = {
  asChild: boolean;
};

export type DescriptionProps = {
  asChild: boolean;
};

export type TriggerProps = {
  asChild: boolean;
};

export type OptionGroupProps = {
  asChild: boolean;
};

export type OptionProps = {
  asChild: boolean;
  id: number;
  isUnSelectable?: boolean;
};

export type IndicatorProps = OptionProps;
