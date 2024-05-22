import styled from 'styled-components';
import { PropsWithChildren, ReactElement } from 'react';
import { useContextScope } from '../../hooks/common/useContextScope';
import { combineStates, getCustomElement } from '../../utils/common/compound';
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
} from '../../type/common/select';
import { useSelect } from '../../hooks/common/useSelect';
import { SelectContext } from '../../context/selectContext';

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

export const Label = (props: PropsWithChildren<LabelProps>) => {
  const { asChild = false, children, ...restProps } = props;

  if (asChild) {
    return getCustomElement(children as ReactElement, { ...restProps });
  }
  return <DefaultLabel>{children}</DefaultLabel>;
};

export const Description = (props: PropsWithChildren<DescriptionProps>) => {
  const { asChild = false, children, ...restProps } = props;

  if (asChild) {
    return getCustomElement(children as ReactElement, { ...restProps });
  }
  return <DefaultDescription>{children}</DefaultDescription>;
};

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

export const OptionGroup = (props: PropsWithChildren<OptionGroupProps>) => {
  const { asChild = false, children, ...restProps } = props;
  const { isSelecBoxOpen } = useContextScope<SelectContextType>(SelectContext);

  if (asChild) {
    return isSelecBoxOpen ? getCustomElement(children as ReactElement, { ...restProps }) : null;
  }
  return isSelecBoxOpen ? <DefaultOptionGroup>{children}</DefaultOptionGroup> : null;
};

export const Indicator = (props: PropsWithChildren<IndicatorProps>) => {
  const { asChild = false, children, ...restProps } = props;
  const { selectedId } = useContextScope<SelectContextType>(SelectContext);
  const isSelected = restProps.id === selectedId;

  if (asChild) {
    return getCustomElement(children as ReactElement, { ...restProps, isSelected });
  }
  return <DefaultIndicator isSelected={isSelected}>{children}</DefaultIndicator>;
};

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

export const Select = Object.assign(SelectBox, {
  Label,
  Description,
  Trigger,
  OptionGroup,
  Indicator,
  Option,
});
