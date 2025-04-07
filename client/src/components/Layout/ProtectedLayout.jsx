import { Navigate } from "react-router-dom";
import { useOutlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Navbar from "../Navbar/Navbar";

export const ProtectedLayout = () => {
  console.log("RENDER PROTECTED LAYOUT");
  const { user } = useAuth();
  console.log({ user });
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="layout">
      <div className="App flex">
        <header className="App-header">
          <Navbar />
        </header>
      </div>
      {outlet}
    </div>
  );
};
