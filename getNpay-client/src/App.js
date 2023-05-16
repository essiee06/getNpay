import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import Cart from "./pages/Cart";
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
import Splash from "./components/Splash";
import Success from "./components/Success";
import ErrorPage from "./pages/ErrorPage";
import Failed from "./components/Failed";
import SelectCart from "./pages/SelectCart";
import SpecificCartPage from "./pages/SpecificCartPage";

const Layout = () => {
  return (
    <div>
      <ScrollRestoration />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
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
      {
        path: "/selectcart",
        element: <SelectCart />,
      },
      {
        path: "/cart/:cartId",
        element: <SpecificCartPage />,
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
