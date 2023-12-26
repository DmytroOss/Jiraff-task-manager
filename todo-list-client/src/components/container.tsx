import { ReactNode } from "react";

export const Container = ({ children }: { children: ReactNode }) => {
  return <div className={"h-full py-4 px-8"}>{children}</div>;
};
