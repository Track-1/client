import { PropsWithChildren } from 'react';

export default function EmptyLayout(props: PropsWithChildren) {
  const { children } = props;
  return <main>{children}</main>;
}
