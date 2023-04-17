import React from "react";
import { cartImg, logo3, profile, shoppingcart } from "../assets/index";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signOut } from "firebase/auth";
import { removeUser } from "../redux/getNpaySlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const productData = useSelector((state) => state.getNpay.productData);
  const userInfo = useSelector((state) => state.getNpay.userInfo);
  console.log(userInfo);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const navigate = useNavigate("");

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // toast.success("Log Out Successfully!");
        dispatch(removeUser());
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full h-20 bg-[#7aa5f9] border-b-[1px]  sticky top-0 z-50">
      <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between">
        <NavLink to="/">
          <img className="w-40 py-5" src={logo3} alt="Logo" />
        </NavLink>

        <div className="flex items-center gap-8">
          <NavLink to="/cart" className="relative">
            <button
              type="button"
              className="relative inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-300 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <img className="w-5 h-5 mr-1" src={shoppingcart} alt="cart" />

              <span className="sr-only">Notifications</span>

              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                {productData.length}
              </div>
            </button>
          </NavLink>

          <button
            id="dropdownUserAvatarButton"
            data-dropdown-toggle="dropdownAvatar"
            className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            type="button"
          >
            <span className="sr-only">Open user menu</span>

            <img
              class="w-10 rounded-full"
              src={
                userInfo
                  ? userInfo.image
                  : "https://www.nicepng.com/png/detail/115-1150821_default-avatar-comments-sign-in-icon-png.png"
              }
              alt="profile"
            />
          </button>

          {/* <!-- Dropdown menu --> */}
          <div
            id="dropdownAvatar"
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <NavLink to="/profile">
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>
                  {" "}
                  {userInfo && (
                    <p className="text-base font-titleFont font-semibold ">
                      {userInfo.name}
                    </p>
                  )}
                </div>
                <div className="font-medium truncate">
                  {" "}
                  {userInfo && (
                    <p className="text-base font-medium truncate ">
                      {userInfo.email}
                    </p>
                  )}
                </div>
              </div>
            </NavLink>

            {/* <ul
              class="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownUserAvatarButton"
            >
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
            </ul> */}
            <div className="py-2">
              <div
                onClick={handleSignOut}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </div>
            </div>
          </div>

          {/* <NavLink to="/login">
            <img
              className="w-10 rounded-full"
              src={userInfo ? userInfo.image : { profile }}
              alt="userLogo"
            />
            {userInfo && (
              <p className="text-base font-titleFont font-semibold underline underline-offset-2">
                {userInfo.name}
              </p>
            )}
          </NavLink> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
