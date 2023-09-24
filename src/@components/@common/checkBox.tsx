import { createContext, PropsWithChildren, ReactElement, useState } from "react";
import { useContextScope } from "../../hooks/common/useContextScope";
import { CheckBoxProps, IndicatorProps, LabelProps } from "../../type/common/checkbox";
import { getCustomElement } from "../../utils/common/compound";
import styled from "styled-components";

const DefaultIndocator = styled.input<{ isChecked: boolean }>``;

const DefaultLabel = styled.label``;

const CheckBoxContext = createContext({
  isChecked: false,
  check: () => {},
  id: "",
});

export function CheckBoxRoot(props: PropsWithChildren<CheckBoxProps>) {
  const { children, id } = props;
  const [isChecked, setIsChecked] = useState(false);
  function check() {
    setIsChecked((prev) => !prev);
  }

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
  const { id } = useContextScope(CheckBoxContext);

  if (asChild) {
    return getCustomElement(children as ReactElement, { ...restProps, htmlFor: id });
  }
  return <DefaultLabel htmlFor={id}>{children}</DefaultLabel>;
}

export const CheckBox = Object.assign(CheckBoxRoot, {
  Indicator,
  Label,
});
