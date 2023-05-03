// import Header from "./components/Header";
// import Products from "./components/Products";
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

const Layout = () => {
  return (
    <div>
      {/* <Header /> */}
      <ScrollRestoration />
      <Outlet />
      {/* <Footer /> */}
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
        path: "/login/admin",
        element: <LoginAdmin />,
      },
      {
        path: "/admin/register",
        element: <AdminRegister />,
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
