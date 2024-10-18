import { ComponentPropsWithoutRef, ReactNode } from "react";

interface ButtonTypeProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
}

interface LinkTypeProps extends ComponentPropsWithoutRef<"a"> {
  children: ReactNode;
}

// example of a component that outputs different jsx that uses different types.
// Use discriminate union types. each type uses ComponentPropsWithoutRef to extend the interface or type with the props for the relevant html element. Instead of including the custom el key can compare the props of the different elements. example href prop only exists on the a tag element. So do my logic for which element to render basedon if href element exists on the props. If it does... render the a tag. Cam take this further by writing a function that returns a boolean true for includeshref and call it isAnchorPropsType and the return type of this function would be props is LinkTypeProps.

type ButtonProps = ButtonTypeProps | LinkTypeProps;

function isLinkTypeProps(props: ButtonProps): props is LinkTypeProps {
  return "href" in props;
}

export default function Button({ ...props }: ButtonProps) {
  if (isLinkTypeProps(props)) {
    return (
      <>
        <a href={props.href} {...props}>
          {props.children}
        </a>
      </>
    );
  }
  return (
    <>
      <button className="button" {...props}></button>
    </>
  );
}
