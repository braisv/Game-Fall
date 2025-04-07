import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import Main from "../components/Main/Main";
import Shop from "../components/Shop/Shop";
import Profile from "../components/Profile/Profile";
import NewGame from "../components/NewGame/NewGame";
import AboutUs from "../components/AboutUs/AboutUs";
import GameCard from "../components/GameCard/GameCard";
import Cart from "../components/Cart/Cart";
import { ProtectedLayout } from "../components/Layout/ProtectedLayout";
import { AuthLayout } from "../components/Layout/AuthLayout";

const protectedRoutes = [
  {
    path: "",
    element: <Main />,
  },
  {
    path: "edit/:id",
    element: <Shop />,
  },
  {
    path: "shop",
    element: <Shop />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "addgame",
    element: <NewGame />,
  },
  {
    path: "aboutus",
    element: <AboutUs />,
  },
  {
    path: "game/:id",
    element: <GameCard />,
  },
  {
    path: "cart",
    element: <Cart />,
  },
];

const unprotectedRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  // {
  //     path: '/*',
  //     element: <NotFound />,
  // },
];

const routes = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <ProtectedLayout />,
        children: protectedRoutes,
      },
      ...unprotectedRoutes,
    ],
  },
];

export const router = createBrowserRouter(routes);
