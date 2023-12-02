import { createContext, PropsWithChildren, ReactElement, useState } from "react";
import { useContextScope } from "../../hooks/common/useContextScope";
import { CheckBoxProps, IndicatorProps, LabelProps } from "../../type/common/checkbox";
import { getCustomElement } from "../../utils/common/compound";
import styled from "styled-components";

const DefaultIndocator = styled.input<{ isChecked: boolean }>``;

const DefaultLabel = styled.label<{ isChecked: boolean }>``;

type CheckBoxContextType = {
  isChecked: boolean;
  check: (externalFn: any) => void;
  id?: string;
};

const CheckBoxContext = createContext<CheckBoxContextType>({
  isChecked: false,
  check: (externalFn: any) => {},
  id: "",
});

export function CheckBoxRoot(props: PropsWithChildren<CheckBoxProps>) {
  const { children, id, externalFn, defaultChecked } = props;
  const [isChecked, setIsChecked] = useState(defaultChecked ?? false);
  function innerCheck() {
    setIsChecked((prev) => !prev);
  }

  function combineFn(externalFn: any) {
    return (option: any) => {
      externalFn?.(option);
      innerCheck();
    };
  }

  const check = combineFn(externalFn);
  return <CheckBoxContext.Provider value={{ isChecked, check, id }}>{children}</CheckBoxContext.Provider>;
}

export function Indicator(props: PropsWithChildren<IndicatorProps>) {
  const { asChild, children, ...restProps } = props;
  const { isChecked, check, id } = useContextScope(CheckBoxContext);

  if (asChild) {
    return getCustomElement(children as ReactElement, {
      ...restProps,
      isChecked,
      onClick: check,
      type: "checkbox",
      id: id,
    });
  }

  return (
    <DefaultIndocator type="checkbox" id={id} onClick={check} isChecked={isChecked}>
      {children}
    </DefaultIndocator>
  );
}

export function Label(props: PropsWithChildren<LabelProps>) {
  const { children, asChild, ...restProps } = props;
  const { id, isChecked } = useContextScope(CheckBoxContext);

  if (asChild) {
    return getCustomElement(children as ReactElement, { ...restProps, htmlFor: id, isChecked });
  }
  return (
    <DefaultLabel htmlFor={id} isChecked={isChecked}>
      {children}
    </DefaultLabel>
  );
}

export const CheckBox = Object.assign(CheckBoxRoot, {
  Indicator,
  Label,
});
