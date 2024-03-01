import React, { useEffect } from "react";
import { useAuth } from "./Auth";
import { useNavigate } from "react-router-dom";

const Protect = ({ children }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [auth, navigate]);

  return auth ? children : null;
};

export default Protect;
