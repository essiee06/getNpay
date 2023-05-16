import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase.config";
// import Dashboard from "./Dashboard";
import HeaderAdmin from "../components/HeaderAdmin";
import { profile } from "../assets";
import { onAuthStateChanged, updatePassword } from "firebase/auth";

const AdminProfile = () => {
  const [admins, setAdmin] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setAdmin(currentUser);

      const fetchAdminData = async () => {
        if (admins) {
          const docRef = doc(db, "admins", admins.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setFirstName(data.firstName || "");
            setLastName(data.lastName || "");
          } else {
            console.log("No such document!");
          }
        }
      };

      fetchAdminData();
    });

    return () => {
      unsubscribe();
    };
  }, [admins]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (admins) {
      const docRef = doc(db, "admins", admins.uid);
      try {
        await setDoc(
          docRef,
          {
            firstName,
            lastName,
          },
          { merge: true }
        );
        console.log("User data updated");
      } catch (error) {
        console.error("Error updating user data: ", error);
      }
    }
  };

  const onChangePassword = async (e) => {
    e.preventDefault();

    if (admins) {
      try {
        await updatePassword(auth.currentUser, newPassword);
        console.log("Password updated");
      } catch (error) {
        console.error("Error updating password: ", error);
      }
    }
  };

  const onSubmitPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    if (admins) {
      try {
        await updatePassword(admins, newPassword);
        console.log("Password updated");

        // Update password in Firestore (not recommended)
        const docRef = doc(db, "admins", admins.uid);
        await setDoc(
          docRef,
          {
            password: newPassword, // This is not secure!
          },
          { merge: true }
        );
      } catch (error) {
        console.error("Error updating password: ", error);
      }
    }
  };

  return (
    <div className="bg-background  bg-no-repeat bg-cover bg-center">
      <HeaderAdmin />
      <div className="min-h-screen max-w-screen-xl mx-auto flex-1 justify-center">
        <div className="bg-background bg-no-repeat bg-cover max-w-screen-xl mx-auto min-h-screen  bg-center">
          <div className="grid  grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
            <div className="mt-12 pt-5 col-span-full xl:mb-2">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                ADMIN PROFILE
              </h1>
            </div>
            {/* <!-- Right Content --> */}
            <div className="col-span-full xl:col-auto">
              <div className="p-4 mb-4 bg-blue-400 bg-opacity-30 border  border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                  <img
                    className="mb-4 rounded-full w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
                    src={profile}
                    alt="profile"
                  />
                  <div>
                    <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                      Profile picture
                    </h3>
                    <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                      JPG, GIF or PNG. Max size of 800K
                    </div>
                    <div className="flex items-center space-x-4">
                      <label
                        className="inline-flex items-center px-3 py-2 text-sm bg-blue-400 font-medium text-center text-blue rounded-lg border-primary-800 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        for="file"
                      >
                        <svg
                          className="w-4 h-4 mr-2 -ml-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path>
                          <path d="M9 13h2v5a1 1 0 11-2 0v-5z"></path>
                        </svg>
                        Upload Picture
                      </label>

                      <input
                        id="file"
                        class="absolute w-full  h-full"
                        type="file"
                        style={{ visibility: "hidden" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="p-4 mb-4 bg-blue-400 bg-opacity-25 border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-semibold dark:text-white">
                  General information
                </h3>
                <form action="#">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="first-name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Bonnie"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="last-name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Green"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-full">
                      <button
                        className="text-black bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        type="submit"
                        onClick={onSubmit}
                      >
                        Save all
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="p-4 mb-4 bg-blue-400 bg-opacity-25 border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-semibold dark:text-white">
                  Password information
                </h3>
                <form action="#">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="current-password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Current password
                      </label>
                      <input
                        type="password"
                        name="current-password"
                        id="current-password"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        New password
                      </label>
                      <input
                        data-popover-target="popover-password"
                        data-popover-placement="bottom"
                        type="password"
                        name="new-password"
                        id="new-password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                      <div
                        data-popover
                        id="popover-password"
                        role="tooltip"
                        className="absolute z-10 invisible inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
                      >
                        <div className="p-3 space-y-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            Must have at least 6 characters
                          </h3>
                          <div className="grid grid-cols-4 gap-2">
                            <div className="h-1 bg-orange-300 dark:bg-orange-400"></div>
                            <div className="h-1 bg-orange-300 dark:bg-orange-400"></div>
                            <div className="h-1 bg-gray-200 dark:bg-gray-600"></div>
                            <div className="h-1 bg-gray-200 dark:bg-gray-600"></div>
                          </div>
                          <p>It’s better to have:</p>
                          <ul>
                            <li className="flex items-center mb-1">
                              <svg
                                className="w-4 h-4 mr-2 text-green-400 dark:text-green-500"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                              Upper & lower case letters
                            </li>
                            <li className="flex items-center mb-1">
                              <svg
                                className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                              A symbol (#$&)
                            </li>
                            <li className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                              A longer password (min. 12 chars.)
                            </li>
                          </ul>
                        </div>
                        <div data-popper-arrow></div>
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="confirm-password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Confirm password
                      </label>
                      <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-span-6 sm:col-full">
                      <button
                        className="text-black bg-blue hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        type="submit"
                        onClick={onSubmitPassword}
                      >
                        Save all
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
