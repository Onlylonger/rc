import {
  type UseFloatingReturn,
  type UseInteractionsReturn,
} from "@floating-ui/react";
import { createContext, useContext } from "react";

export interface TooltipContextValue {
  refs: UseFloatingReturn["refs"];
  open: boolean;
  floatingStyles: UseFloatingReturn["floatingStyles"];
  getFloatingProps: UseInteractionsReturn["getFloatingProps"];
  getReferenceProps: UseInteractionsReturn["getReferenceProps"];
}

export const TooltipContext = createContext<null | TooltipContextValue>(null);

export const useTooltipContext = () => {
  const value = useContext(TooltipContext);

  if (value === null) {
    throw new Error("Tooltip components must be wrapped in <Tooltip />");
  }

  return value;
};

export const useChildren = (children: unknown) => {
  if (typeof children === "function") {
    return children();
  }

  return <></>;
};
