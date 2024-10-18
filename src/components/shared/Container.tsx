import {
  ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";

type ContainerProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

export default function Container<S extends ElementType>({
  as,
  children,
  ...props
}: ContainerProps<S>) {
  const Component = as || "div";
  return (
    <>
      <Component {...props}>{children}</Component>
    </>
  );
}
