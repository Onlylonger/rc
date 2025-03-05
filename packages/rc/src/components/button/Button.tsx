import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

export const getButtonClassNames = cva("Base", {
  variants: {
    variant: {
      default: "VariantDefault",
      destructive: "VariantDestructive",
      outline: "VariantOutline",
      secondary: "VariantSecondary",
      ghost: "VariantGhost",
      link: "VariantLink",
    },
    size: {
      default: "SizeDefault",
      sm: "SizeSm",
      lg: "SizeLg",
      icon: "SizeIcon",
    },
  },
});

export type ComponentRenderFn<Props, State> = (
  props: Props,
  state: State
) => React.ReactElement<unknown>;

type getButtonClassNamesType = typeof getButtonClassNames;
type getButtonClassNamesProps = VariantProps<getButtonClassNamesType>;
type ButtonProps = Omit<React.ComponentProps<"button">, "children"> &
  getButtonClassNamesProps & {
    children?:
      | React.ReactNode
      | ((
          state?: null,
          props?: Omit<ButtonProps, "children">
        ) => React.ReactNode);
  };

export const Button = (props: ButtonProps) => {
  const {
    variant = "default",
    size = "default",
    className,
    children,
    ...reset
  } = props;

  const classNames = clsx(getButtonClassNames({ variant, size }), className);

  if (typeof children === "function") {
    return children(null, { ...props, className: classNames });
  }

  return <button className={classNames} {...reset} children={children} />;
};
