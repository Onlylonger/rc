import { useIsMobile } from "../../hooks/use-mobile";

export const BackTop = () => {
  return <>||</>;
};

interface LayoutProps {
  left: React.ReactNode;
  right?: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { left, right } = props;

  return (
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 h-14 w-full border-b backdrop-blur">
      <div className="flex h-full w-full items-center justify-between px-5">
        <div className="flex items-center gap-2">{left}</div>
        <div className="flex gap-2">{right}</div>
      </div>
    </header>
  );
};

export const AppBar = (props: { mobile: LayoutProps; tablet: LayoutProps }) => {
  const { mobile, tablet } = props;
  const isMobile = useIsMobile();

  if (isMobile) {
    return <Layout left={mobile.left} right={mobile.right} />;
  }

  return <Layout left={tablet.left} right={tablet.right} />;
};
