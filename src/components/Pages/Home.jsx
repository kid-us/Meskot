import React, { useState, useEffect } from "react";
import LoginUserPage from "./HomePage/LoginUserPage";
import NotLoginUser from "./HomePage/NotLoginUser";
import { useAuth } from "../../context/Auth";
import Loading from "../Loading/Loading";
import axios from "axios";
import { request } from "../../constant/request";
import { useAtom } from "jotai";
import notification from "../../libs/NotficationAtom";
import { useNavigate } from "react-router-dom";

function App() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [userNotification, setUserNotification] = useAtom(notification);

  useEffect(() => {
    setUser(auth);
    if (auth) {
      console.log(auth);
      if (auth.User_Type === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/order");
      }

      axios
        .get(`${request.baseUrl}api/notifications/${auth.id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (auth.User_Type === "buyer") {
            setUserNotification(response.data.order);
          } else if (auth.User_Type === "traveler") {
            console.log(response);
            setUserNotification(response.data.window);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [auth]);

  return (
    <>
      {loading && <Loading></Loading>}
      {user !== null ? (
        <LoginUserPage userData={user}></LoginUserPage>
      ) : (
        <NotLoginUser></NotLoginUser>
      )}
    </>
  );
}

export default App;
