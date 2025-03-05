import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

import styles from "./index.module.css";

export const getButtonClassNames = cva(styles.Base, {
  variants: {
    variant: {
      default: styles.VariantDefault,
      destructive: styles.VariantDestructive,
      outline: styles.VariantOutline,
      secondary: styles.VariantSecondary,
      ghost: styles.VariantGhost,
      link: styles.VariantLink,
    },
    size: {
      default: styles.SizeDefault,
      sm: styles.SizeSm,
      lg: styles.SizeLg,
      icon: styles.SizeIcon,
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
    children?: React.ReactNode | (() => React.ReactNode);
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
    return children();
  }

  return <button className={classNames} {...reset} children={children} />;
};
