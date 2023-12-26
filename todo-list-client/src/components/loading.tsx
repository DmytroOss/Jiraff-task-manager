import { ReactNode } from "react";
import { Loader } from "@/components/loader.tsx";

export const Loading = ({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: ReactNode;
}) => {
  return isLoading ? <Loader /> : children;
};
