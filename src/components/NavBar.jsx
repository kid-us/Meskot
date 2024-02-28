import React, { useState, useEffect } from "react";
import Large from "./Navbar/Large";
import Small from "./Navbar/Small";
import { useAuth } from "../context/Auth";

const NavBar = () => {
  const { auth } = useAuth();
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(auth);
  }, [auth]);
  return (
    <>
      {/* ${
          user
            ? user.User_Type === "traveler"
              ? "travelers-bg"
              : "buyers-bg"
            : ""
        } */}
      <div className="navbar-container pt-1 pb-2 border small bg-white">
        <div className="d-none d-md-block">
          <Large user={user}></Large>
        </div>
        <div className="d-block d-md-none">
          <Small user={user}></Small>
        </div>
      </div>
    </>
  );
};

export default NavBar;
