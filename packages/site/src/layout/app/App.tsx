import { AppBar, Button } from "@shilong/rc/dev";

import { HomeIcon } from "@shilong/rc/dev/icons";
import { Outlet } from "react-router";
import "./App.css";
import LogoPNG from "../../assets/logo.png";
import { MobileMenu } from "./MobileMenu";
import { WithLinkButton } from "./WithLinkButton";

function App() {
  return (
    <div className="">
      <AppBar
        mobile={{
          left: (
            <>
              <Button variant="outline">
                <HomeIcon />
                Barry
              </Button>
            </>
          ),
          right: (
            <>
              <MobileMenu />
            </>
          ),
        }}
        tablet={{
          left: (
            <>
              <img src={LogoPNG} width={48} height={48} />
              <span>Barry</span>
            </>
          ),
          right: (
            <>
              <WithLinkButton to="/projects">Projects</WithLinkButton>
              <WithLinkButton to="/blogs">Blogs</WithLinkButton>
              <WithLinkButton to="/introduction">Introduction</WithLinkButton>
            </>
          ),
        }}
      />
      <Outlet />
    </div>
  );
}

export default App;
