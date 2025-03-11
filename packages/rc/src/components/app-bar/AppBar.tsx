import { useIsMobile } from "../../hooks/use-mobile";

export const BackTop = () => {
  return <>||</>;
};

export const AppBar = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <header className="border-color bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 h-14 w-full border-b backdrop-blur">
        mobile appbar
      </header>
    );
  }

  return <div>tablet appbar</div>;
};
