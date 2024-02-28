import React, { useState, useEffect } from "react";
import LoginUserPage from "./HomePage/LoginUserPage";
import NotLoginUser from "./HomePage/NotLoginUser";
import { useAuth } from "../../context/Auth";
import Loading from "../Loading/Loading";

function App() {
  const { auth } = useAuth();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(auth);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

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
