import "@stripe/stripe-js";
import Home from "./pages/Home";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import Cart from "./pages/Cart";
import { productsData } from "./api/Api";
import Product from "./components/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgotpass from "./pages/Forgotpass";
import LoginAdmin from "./adminpage/LoginAdmin";
import Dashboard from "./adminpage/Dashboard";
import AdminProfile from "./adminpage/AdminProfile";
import Profile from "./pages/Profile";
import AdminRegister from "./adminpage/AdminRegister";
import GCash from "./components/paymentMethod/GCash";
import CheckoutForm from "./components/CheckoutForm";
import { UserProvider } from "./components/context/UserContext";
import Splash from "./components/Splash";
import Success from "./components/Success";
import ErrorPage from "./pages/ErrorPage";
import Failed from "./components/Failed";

const Layout = () => {
  return (
    <div>
      <UserProvider>
        <ScrollRestoration />
        <Outlet />
      </UserProvider>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />,
        loader: productsData,
      },
      {
        path: "/ /:id",
        element: <Product />,
      },
      {
        path: "/splash",
        element: <Splash />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/forgotpass",
        element: <Forgotpass />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/admin/login",
        element: <LoginAdmin />,
      },
      {
        path: "/admin/register",
        element: <AdminRegister />,
      },
      {
        path: "/*",
        element: <ErrorPage />,
      },
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/profile",
        element: <AdminProfile />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/fail",
        element: <Failed />,
      },

      {
        path: "/gcash",
        element: <GCash />,
      },
      {
        path: "/checkout",
        element: <CheckoutForm />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
