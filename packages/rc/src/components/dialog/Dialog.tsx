import {
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  autoPlacement,
  safePolygon,
} from "@floating-ui/react";
import { useState } from "react";

export const Dialog = () => {
  const [open, setOpen] = useState(false);

  const { context, refs, floatingStyles, middlewareData } = useFloating({
    onOpenChange(open) {
      setOpen(open);
    },
    middleware: [
      //   offset(10),
      //   arrow({ element: arrowRef.current, padding: 5 }),
      autoPlacement(),
    ],
  });

  const arrowStyle = {};

  if (middlewareData.arrow) {
    const { x, y } = middlewareData.arrow;
    Object.assign(arrowStyle, {
      left: x != null ? `${x}px` : "",
      top: y != null ? `${y}px` : "",
    });
  }

  const hoverEffect = useHover(context, {
    handleClose: safePolygon(),
  });
  const focus = useFocus(context);

  const { getFloatingProps, getReferenceProps } = useInteractions([
    hoverEffect,
    focus,
  ]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button ref={refs.setReference} {...getReferenceProps()}>
          nihao
        </button>
      </div>
      {open && (
        <div
          style={floatingStyles}
          ref={refs.setFloating}
          {...getFloatingProps()}
        >
          tooltips
          {/* <div
            style={{
              position: "absolute",
              width: 10,
              height: 10,
              backgroundColor: "black",
              ...arrowStyle,
            }}
            ref={arrowRef}
          ></div> */}
        </div>
      )}
    </div>
  );
};
