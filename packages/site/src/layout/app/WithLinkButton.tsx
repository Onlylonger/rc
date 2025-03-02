import { Button } from "@shilong/rc/dev";
import { NavLink, NavLinkProps } from "react-router";

type WithLinkButtonProps = {
  to: NavLinkProps["to"];
  children: React.ReactNode;
};

export const WithLinkButton = (props: WithLinkButtonProps) => {
  const { to, children } = props;

  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <Button
          variant="ghost"
          className={isActive ? "bg-accent text-accent-foreground" : ""}
        >
          {({ className }) => <span className={className}>{children}</span>}
        </Button>
      )}
    </NavLink>
  );
};
