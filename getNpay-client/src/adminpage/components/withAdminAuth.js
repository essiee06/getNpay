import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { isAdmin } from "./isAdmin";
import { auth } from "../../firebase.config";
import Splash from "../../components/Splash";

export default function withAdminAuth(Component) {
  return function AdminAuthComponent(props) {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isAdminUser, setIsAdminUser] = useState(false);

    useEffect(() => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const admin = await isAdmin(user);
          setIsAdminUser(admin);
          setLoading(false);
        } else {
          navigate("/admin/login");
        }
      });
    }, [navigate]);

    useEffect(() => {
      if (!loading && !isAdminUser) {
        navigate("/admin/login");
      }
    }, [loading, isAdminUser, navigate]);

    if (loading) {
      return (
        <div>
          <Splash />
        </div>
      );
    }

    return <Component {...props} />;
  };
}
