import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

export const getButtonClassNames = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs",
        destructive: "",
        outline:
          "border-input bg-background hover:bg-accent hover:text-accent-foreground border shadow-xs",
        secondary: "",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "",
        lg: "",
        icon: "size-9",
      },
    },
  },
);

export type ComponentRenderFn<Props, State> = (
  props: Props,
  state: State,
) => React.ReactElement<unknown>;

type getButtonClassNamesType = typeof getButtonClassNames;
type getButtonClassNamesProps = VariantProps<getButtonClassNamesType>;
export type ButtonProps = Omit<React.ComponentProps<"button">, "children"> &
  getButtonClassNamesProps & {
    children?:
      | React.ReactNode
      | ((params: { className: string }) => React.ReactNode);
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
    return children({ className: classNames });
  }

  return <button className={classNames} {...reset} children={children} />;
};
