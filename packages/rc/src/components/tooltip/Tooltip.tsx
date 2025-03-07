import {
  safePolygon,
  useFloating,
  UseFloatingReturn,
  useFocus,
  useHover,
  useInteractions,
  UseInteractionsReturn,
} from "@floating-ui/react";
import { createContext, useContext, useMemo, useState } from "react";

export const TooltipContext = createContext<null | State>(null);

export const useTooltipContext = () => {
  const value = useContext(TooltipContext);

  if (value === null) {
    throw new Error("Tooltip components must be wrapped in <Tooltip />");
  }

  return value;
};

interface State {
  refs: UseFloatingReturn["refs"];
  open: boolean;
  floatingStyles: UseFloatingReturn["floatingStyles"];
  getFloatingProps: UseInteractionsReturn["getFloatingProps"];
  getReferenceProps: UseInteractionsReturn["getReferenceProps"];
}

type ChildParams = {
  open: State["open"];
  referenceProps: {
    ref: State["refs"]["setReference"];
  } & ReturnType<State["getReferenceProps"]>;
  floatingProps: {
    style: State["floatingStyles"];
    ref: State["refs"]["setFloating"];
  } & ReturnType<State["getFloatingProps"]>;
};

export const Tooltip = (props: {
  children:
    | React.ReactNode
    | ((state: ChildParams, props?: object) => React.ReactNode);
}) => {
  const { children } = props;

  const [open, setOpen] = useState(false);

  const { context, refs, floatingStyles } = useFloating({
    onOpenChange(open) {
      setOpen(open);
    },
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
    return children({
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
    });
  }

  return <TooltipContext value={value}>{children}</TooltipContext>;
};

export const TooltipTrigger = (props: { children: React.ReactNode }) => {
  const { children } = props;

  const { refs, getReferenceProps } = useTooltipContext();

  return (
    <button ref={refs.setReference} {...getReferenceProps()}>
      {children}
    </button>
  );
};

export const TooltipContent = (props: { children: React.ReactNode }) => {
  const { children } = props;

  const { refs, getFloatingProps, floatingStyles, open } = useTooltipContext();

  if (!open) return null;

  return (
    <div style={floatingStyles} ref={refs.setFloating} {...getFloatingProps()}>
      {children}
    </div>
  );
};
