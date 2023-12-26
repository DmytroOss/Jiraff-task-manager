import { UserResponseDto } from "@/features/auth/dto/user-response.dto.ts";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ServerResponseDto } from "@/dto/server-response.dto.ts";
import { AuthResponseDto } from "@/features/auth/dto/auth-response.dto.ts";
import { httpClient } from "@/util/axios.ts";

type AuthContext = {
  isAuthenticated: boolean;
  currentUser: UserResponseDto | undefined;
  login: (res: AuthResponseDto) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContext>({
  isAuthenticated: false,
  currentUser: undefined,
  logout: () => {},
  login: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserResponseDto | undefined>(
    undefined,
  );
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth().then((r) => {
      if (r === false) {
        removeToken();
        setIsAuthenticated(false);
        return;
      }
      setIsAuthenticated(true);
      setCurrentUser(r);
    });
  }, []);

  const login = (res: AuthResponseDto) => {
    setToken(res.token);
    setCurrentUser(res.user);
    setIsAuthenticated(true);

    toast.success("signed in successfully");
    navigate("/");
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    navigate("/auth");
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const checkAuth = async () => {
  if (!getToken()) return false;

  try {
    const res = await httpClient.post<ServerResponseDto<AuthResponseDto>>(
      "/auth/validate",
      {
        token: getToken(),
      },
    );
    const data = res.data.data;

    if (!data?.token) return false;

    return data.user;
  } catch (e) {
    return false;
  }
};

const setToken = (token: string) => {
  window.localStorage.setItem("token", token);
};

const removeToken = () => {
  window.localStorage.removeItem("token");
};

const getToken = () => {
  return window.localStorage.getItem("token");
};
