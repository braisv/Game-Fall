import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import AuthService from "../components/auth/AuthService";
const AuthContext = createContext();

const service = new AuthService();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = useCallback(
    async (data) => {
      console.log("** LOGIN METHOD", { data });
      try {
        const loggedUser = await service.login(data.username, data.password);
        console.log({ loggedUser });

        setUser(data);
        navigate("/profile");
      } catch (error) {
        console.log("ERROR IN LOGIN", { error });
        console.error(error);
      }
    },
    [navigate, setUser]
  );

  const logout = useCallback(async () => {
    console.log("LOGOUT");
    try {
      const loggedOut = await service.logout();
      console.log({ loggedOut });
      setUser(null);
      // navigate("/", { replace: true });
    } catch (error) {
      console.log("ERROR IN LOGOUT", { error });
      console.error(error);
    }
  }, [navigate, setUser]);

  const isUserLoggedIn = useCallback(async () => {
    console.log("IS USER LOGGED IN");

    try {
      const loggedIn = await service.loggedin();
      console.log({ loggedIn });
    } catch (error) {
      console.log("ERROR IN LOGGED IN", { error });
      setUser(null);
      console.error(error);
    }
  }, []);

  useEffect(() => {
    isUserLoggedIn();
  }, [isUserLoggedIn]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
