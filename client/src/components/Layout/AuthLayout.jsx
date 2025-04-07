import { useOutlet } from "react-router-dom";
import { AuthProvider } from "../../hooks/useAuth";

export const AuthLayout = () => {
  console.log("RENDER AUTH LAYOUT");
  const outlet = useOutlet();
  return <AuthProvider>{outlet}</AuthProvider>;
};
