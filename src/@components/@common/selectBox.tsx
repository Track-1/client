import { PropsWithChildren, ReactElement } from "react";
import { useContextScope } from "../../hooks/common/useContextScope";
import { combineStates, getCustomElement } from "../../utils/common/compound";
import {
  DescriptionProps,
  externalStateType,
  IndicatorProps,
  LabelProps,
  OptionGroupProps,
  OptionProps,
  SelectBoxProps,
  SelectContextType,
  TriggerProps,
} from "../../type/common/select";
import { useSelect } from "../../hooks/common/useSelect";
import { SelectContext } from "../../context/selectContext";
import styled from "styled-components";

const DefaultLabel = styled.div`
  ${({ theme }) => theme.fonts.body1}
`;

const DefaultDescription = styled.div`
  ${({ theme }) => theme.fonts.body1}
`;

const DefaultTrigger = styled.div`
  width: 2rem;
  height: 2rem;
`;

const DefaultIndicator = styled.div<{ isSelected: boolean }>`
  width: 0.2rem;
  height: 0.2rem;
`;

const DefaultOptionGroup = styled.div``;

const DefaultOption = styled.div<{ isSelected: boolean }>`
  width: 8rem;
  height: 2rem;
`;

// select컴포넌트가 context를 공유할 수 있게 하는 provider컴포넌트
export const SelectBox = (props: PropsWithChildren<SelectBoxProps<externalStateType>>) => {
  const { children, defaultOpen, externalSelectState } = props;
  const {
    selectedOption: selectedId,
    selectOption: innerSelectState,
    isSelecBoxOpen,
    toggleBoxOpen,
  } = useSelect<number | null>(defaultOpen);
  const selectOption = combineStates(externalSelectState, innerSelectState);
  return (
    <SelectContext.Provider value={{ isSelecBoxOpen, toggleBoxOpen, selectedId, selectOption }}>
      {children}
    </SelectContext.Provider>
  );
};

// select컴포넌트의 라벨
export const Label = (props: PropsWithChildren<LabelProps>) => {
  const { asChild = false, children, ...restProps } = props;

  if (asChild) {
    return getCustomElement(children as ReactElement, { ...restProps });
  }
  return <DefaultLabel>{children}</DefaultLabel>;
};

// select컴포넌트에 대한 설명
export const Description = (props: PropsWithChildren<DescriptionProps>) => {
  const { asChild = false, children, ...restProps } = props;

  if (asChild) {
    return getCustomElement(children as ReactElement, { ...restProps });
  }
  return <DefaultDescription>{children}</DefaultDescription>;
};

// 클릭하면 selectBox를 보여줄 수 있는 trigger 버튼
export const Trigger = (props: PropsWithChildren<TriggerProps>) => {
  const { asChild = false, children, ...restProps } = props;
  const { toggleBoxOpen } = useContextScope<SelectContextType>(SelectContext);

  if (asChild) {
    return getCustomElement(children as ReactElement, {
      ...restProps,
      onClick: toggleBoxOpen,
    });
  }
  return <DefaultTrigger onClick={toggleBoxOpen}>{children}</DefaultTrigger>;
};

// Option들을 담는 컨테이너 컴포넌트
export const OptionGroup = (props: PropsWithChildren<OptionGroupProps>) => {
  const { asChild = false, children, ...restProps } = props;
  const { isSelecBoxOpen } = useContextScope<SelectContextType>(SelectContext);

  if (asChild) {
    return isSelecBoxOpen ? getCustomElement(children as ReactElement, { ...restProps }) : null;
  }
  return isSelecBoxOpen ? <DefaultOptionGroup>{children}</DefaultOptionGroup> : null;
};

// Option이 선택되었는지 나타내는 indicator
export const Indicator = (props: PropsWithChildren<IndicatorProps>) => {
  const { asChild = false, children, ...restProps } = props;
  const { selectedId } = useContextScope<SelectContextType>(SelectContext);
  const isSelected = restProps.id === selectedId;

  if (asChild) {
    return getCustomElement(children as ReactElement, { ...restProps, isSelected });
  }
  return <DefaultIndicator isSelected={isSelected}>{children}</DefaultIndicator>;
};

// select의 각 Option
export const Option = (props: PropsWithChildren<OptionProps>) => {
  const { asChild = false, children, ...restProps } = props;
  const { selectOption, selectedId } = useContextScope<SelectContextType>(SelectContext);
  const isSelected = restProps.id === selectedId;

  function unSelectOption() {
    selectOption(null);
  }

  function handleClickOption(id: number) {
    if (restProps.isUnSelectable) {
      isSelected ? unSelectOption() : selectOption(id);
      return;
    }
    selectOption(id);
  }

  if (asChild) {
    return getCustomElement(children as ReactElement, {
      ...restProps,
      isSelected,
      onClick: () => handleClickOption(restProps.id),
    });
  }
  return (
    <DefaultOption isSelected={isSelected} onClick={() => selectOption(restProps.id)}>
      {children}
    </DefaultOption>
  );
};

export const Select = Object.assign(SelectBox, {
  Label,
  Description,
  Trigger,
  OptionGroup,
  Indicator,
  Option,
});
