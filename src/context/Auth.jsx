import React, { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      let verifyToken = {
        token: localStorage.getItem("token"),
      };

      axios
        .post(
          "http://meskot.pythonanywhere.com/auth/jwt/verify/",
          verifyToken,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          axios
            .get(
              `http://meskot.pythonanywhere.com/auth/users/${decoded.user_id}/`,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((response) => {
              setAuth(response.data);
            })
            .catch((error) => {
              console.log(error);
              localStorage.clear();
              navigate("/");
            });
        })
        .catch((error) => {
          localStorage.clear();
          navigate("/");
        });
    }
  }, [token]);

  const logout = () => {
    setAuth(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ auth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
