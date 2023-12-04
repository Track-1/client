import { PropsWithChildren } from 'react';
import EmptyLayout from './emptyLayout';
import HeaderFooterLayout from './headerFooterLayout';
import HeaderLayout from './headerLayout';

const layouts = {
  header: HeaderLayout,
  empty: EmptyLayout,
  headerFooter: HeaderFooterLayout,
};

interface LayoutProps {
  layoutKey: keyof typeof layouts;
}

export default function Layout(props: PropsWithChildren<LayoutProps>) {
  const { layoutKey, children } = props;

  const LayoutContainer = layouts[layoutKey];

  return <LayoutContainer>{children}</LayoutContainer>;
}
