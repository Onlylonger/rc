import { useIsMobile } from "../../hooks/use-mobile";
import {
  HomeIcon,
  MenuIcon,
  SettingsIcon,
  SunIcon,
  ArrowDownIcon,
} from "../../icons";
import { Button } from "../button";

export const BackTop = () => {
  return <>||</>;
};

const Layout = (props: { left: React.ReactNode; right?: React.ReactNode }) => {
  const { left, right } = props;

  return (
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 h-14 w-full border-b backdrop-blur">
      <div className="flex h-full w-full items-center justify-between px-5">
        <div>{left}</div>
        <div className="flex gap-2">{right}</div>
      </div>
    </header>
  );
};

export const AppBar = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Layout
        left={
          <Button variant="outline">
            <HomeIcon />
            Home
          </Button>
        }
        right={
          <>
            <Button variant="outline">
              <MenuIcon />
              Menu
            </Button>

            <Button variant="outline">
              <SettingsIcon />
              Settings
            </Button>
          </>
        }
      />
    );
  }

  return (
    <Layout
      left={
        <>
          <Button variant="link">
            <HomeIcon /> <span>Slogan</span>
          </Button>
        </>
      }
      right={
        <>
          <Button variant="link">Projects</Button>
          <Button variant="link">Blogs</Button>
          <Button variant="link">Introduction</Button>
          <Button variant="link">
            <SunIcon />
            <span>Light</span>
            <ArrowDownIcon />
          </Button>
        </>
      }
    />
  );
};
