import React, { useState, useEffect } from "react";
import Large from "./Navbar/Large";
import Small from "./Navbar/Small";
import { useAuth } from "../context/Auth";
import notification from "../libs/NotficationAtom";
import { useAtom } from "jotai";

const NavBar = () => {
  const { auth } = useAuth();
  const [user, setUser] = useState("");
  const [userNotification, setUserNotification] = useAtom(notification);

  useEffect(() => {
    setUser(auth);
  }, [auth]);
  return (
    <>
      <div className="navbar-container pt-1 pb-2 border small bg-white">
        <div className="d-none d-md-block">
          <Large user={user} notification={userNotification}></Large>
        </div>
        <div className="d-block d-md-none">
          <Small user={user} notification={userNotification}></Small>
        </div>
      </div>
    </>
  );
};

export default NavBar;
