import { PropsWithChildren } from "react";

interface WrapperProps extends PropsWithChildren {
  extraClass?: string;
}

export default function Wrapper({ children, extraClass = "" }: WrapperProps) {
  return <main className={`mx-auto px-2 lg:max-w-4xl ${extraClass}`}>{children}</main>;
}