import { useTooltipContext } from "./context";
import { type TooltipChildParams } from "./Tooltip";
import { ChildrenType } from "./type";

export interface TooltipContentProps {
  children: ChildrenType<{
    floatingProps: TooltipChildParams["floatingProps"];
  }>;
}

export const TooltipContent = (props: TooltipContentProps) => {
  const { children } = props;

  const { refs, getFloatingProps, floatingStyles, open } = useTooltipContext();

  if (!open) return null;

  const rootProps = {
    style: floatingStyles,
    ref: refs.setFloating,
    ...getFloatingProps(),
  };

  if (typeof children === "function") {
    return children({
      floatingProps: rootProps,
    });
  }

  return <div {...rootProps}>{children}</div>;
};
