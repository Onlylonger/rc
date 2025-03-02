import {
  flip,
  offset,
  safePolygon,
  shift,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import { useMemo, useState } from "react";
import { TooltipContext, type TooltipContextValue } from "./context";
import { ChildrenType } from "./type";

export interface ToolTipProps {
  children: ChildrenType<TooltipChildParams>;
}

export interface TooltipChildParams {
  open: TooltipContextValue["open"];
  referenceProps: {
    ref: TooltipContextValue["refs"]["setReference"];
  } & ReturnType<TooltipContextValue["getReferenceProps"]>;
  floatingProps: {
    style: TooltipContextValue["floatingStyles"];
    ref: TooltipContextValue["refs"]["setFloating"];
  } & ReturnType<TooltipContextValue["getFloatingProps"]>;
}

export const Tooltip = (props: ToolTipProps) => {
  const { children } = props;

  const [open, setOpen] = useState(false);

  const { context, refs, floatingStyles } = useFloating({
    onOpenChange(open) {
      setOpen(open);
    },
    middleware: [offset(5), shift(), flip()],
  });

  const hoverEffect = useHover(context, {
    handleClose: safePolygon(),
  });
  const focus = useFocus(context);

  const { getFloatingProps, getReferenceProps } = useInteractions([
    hoverEffect,
    focus,
  ]);

  const value = useMemo(
    () => ({
      open,
      refs,
      floatingStyles,
      getFloatingProps,
      getReferenceProps,
    }),
    [floatingStyles, getFloatingProps, getReferenceProps, open, refs]
  );

  if (typeof children === "function") {
    const childrenParams = {
      open,
      referenceProps: {
        ref: refs.setReference,
        ...getReferenceProps(),
      },
      floatingProps: {
        style: floatingStyles,
        ref: refs.setFloating,
        ...getFloatingProps(),
      },
    };
    return children(childrenParams);
  }

  return (
    <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>
  );
};
