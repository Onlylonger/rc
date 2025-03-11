import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { styles } from "./style";

export const getButtonClassNames = cva(styles.base, {
  variants: {
    variant: {
      default: styles.variantDefault,
      destructive: styles.variantDestructive,
      outline: styles.variantOutline,
      secondary: styles.variantSecondary,
      ghost: styles.variantGhost,
      link: styles.variantLink,
    },
    size: {
      default: styles.sizeDefault,
      sm: styles.sizeSm,
      lg: styles.sizeLg,
      icon: styles.sizeIcon,
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
