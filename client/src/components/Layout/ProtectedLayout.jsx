import { Navigate } from "react-router-dom";
import { useOutlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Navbar from "../Navbar/Navbar";

export const ProtectedLayout = () => {
  const { user } = useAuth();
  console.log({ user });
  const outlet = useOutlet();

  if (!user) {
    return (
      <div className="layout">
        <div className="App flex">
          <header className="App-header">
            <Navbar />
          </header>
        </div>
        <Navigate to="/login" />;
      </div>
    );
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
