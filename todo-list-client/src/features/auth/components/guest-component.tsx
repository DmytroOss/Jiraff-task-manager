import { ReactNode } from "react";
import { useAuth } from "@/features/auth/providers/auth-provider.tsx";
import { useNavigate } from "react-router-dom";

export const GuestComponent = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const navigator = useNavigate();

  if (!isAuthenticated) return children;
  else return navigator("/");
};
