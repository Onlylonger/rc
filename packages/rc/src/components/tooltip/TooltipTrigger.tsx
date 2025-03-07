import { Button } from "../button";
import { useTooltipContext } from "./context";
import { type TooltipChildParams } from "./Tooltip";
import { ChildrenType } from "./type";

export interface TooltipTriggerProps {
  children: ChildrenType<{
    referenceProps: TooltipChildParams["referenceProps"];
  }>;
}

export const TooltipTrigger = (props: TooltipTriggerProps) => {
  const { children } = props;

  const { refs, getReferenceProps } = useTooltipContext();

  const rootProps = {
    ref: refs.setReference,
    ...getReferenceProps(),
  };

  if (typeof children === "function") {
    const childrenParams = {
      referenceProps: rootProps,
    };
    return children(childrenParams);
  }

  return <Button {...rootProps}>{children}</Button>;
};
