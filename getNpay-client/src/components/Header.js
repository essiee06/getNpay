import React from "react";
import { cartImg, logo3, defaultAvatar, shoppingcart } from "../assets/index";
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
          navigate("/");
        }, 1500);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#7aa5f9] border-b-[1px]">
      <div class=" px-5 py-3 lg:px-5 lg:pl-5">
        <div class="max-w-screen-xl mx-auto  flex items-center justify-between">
          {/* <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between"> */}
          <NavLink to="/">
            <img className="h-12 mr-5" src={logo3} alt="Logo" />
          </NavLink>

          <div className="flex items-center gap-8">
            <NavLink to="/cart" className="relative">
              <button
                type="button"
                className="relative inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-300 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <img className="w-5 h-5" src={shoppingcart} alt="cart" />

                <span className="sr-only">Notifications</span>

                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                  {productData.length}
                </div>
              </button>
            </NavLink>

            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-12 h-12 rounded-full"
                      src={
                        userInfo
                          ? userInfo.image
                          : "https://community.intersystems.com/sites/default/files/pictures/picture-default.jpg"
                      }
                      alt="profile"
                    />
                  </button>
                </div>
                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    {userInfo && (
                      <p className="text-sm text-gray-900 dark:text-white">
                        {userInfo.name}
                      </p>
                    )}
                    {userInfo && (
                      <p
                        className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                        role="none"
                      >
                        {userInfo.email}
                      </p>
                    )}
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        My Account
                      </a>
                    </li>

                    <li>
                      <div
                        onClick={handleSignOut}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* 
            <button
              id="dropdownUserAvatarButton"
              data-dropdown-toggle="dropdownAvatar"
              className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              type="button"
            >
              <span className="sr-only">Open user menu</span>

              <img
                className="w-10 rounded-full"
                src={
                  userInfo
                    ? userInfo.image
                    : "https://www.nicepng.com/png/detail/115-1150821_default-avatar-comments-sign-in-icon-png.png"
                }
                alt="profile"
              />
            </button>

            <!-- Dropdown menu -->
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

              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownUserAvatarButton"
              >
                <li>
                  <a
                    href="/profile"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    My Account
                  </a>
                </li>
              </ul>
              <div className="py-2">
                <div
                  onClick={handleSignOut}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
