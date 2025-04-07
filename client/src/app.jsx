import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

const App = () => {
  console.log("RENDER APP");
  return <RouterProvider router={router} />;
};

export default App;
