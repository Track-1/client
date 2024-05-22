import React from 'react';

type CreateContextProps<TDefaultValues = {}> = {
  defaultValue: TDefaultValues;
  contextName: string;
};

type ContextReturnType<TDefaultValues> = {
  [key in `${CreateContextProps<TDefaultValues>['contextName']}Provider`]: ({
    children,
    contextValues,
    scope,
  }: React.PropsWithChildren<{
    contextValues: TDefaultValues;
    scope?: string;
  }>) => JSX.Element;
} & {
  [key in `${CreateContextProps<TDefaultValues>['contextName']}UseContext`]: ({
    scope,
  }: {
    scope?: string;
  }) => TDefaultValues;
};

export function createContext<TDefaultValues>(props: React.PropsWithChildren<CreateContextProps<TDefaultValues>>) {
  const { defaultValue, contextName } = props;
  const Context = React.createContext<TDefaultValues>(defaultValue);
  const scopeContext: Record<string, React.Context<TDefaultValues>> = {};

  function Provider(
    props: React.PropsWithChildren<{
      contextValues: TDefaultValues;
      scope?: string;
    }>
  ) {
    const { contextValues, children } = props;

    if (props.scope) {
      if (!scopeContext[props.scope]) {
        scopeContext[props.scope] = React.createContext<TDefaultValues>(defaultValue);
      }
      const TargetContext = scopeContext[props.scope];

      return <TargetContext.Provider value={contextValues}>{children}</TargetContext.Provider>;
    }

    return <Context.Provider value={contextValues}>{children}</Context.Provider>;
  }

  Context.displayName = contextName;

  function useContext({ scope }: { scope?: string }) {
    const value = React.useContext(scope ? scopeContext[scope] : Context);

    if (!value) {
      throw new Error(`This function can only be used within ${contextName}context.`);
    }

    return value;
  }

  return {
    [`${contextName}Provider`]: Provider,
    [`${contextName}UseContext`]: useContext,
  } as ContextReturnType<TDefaultValues>;
}
