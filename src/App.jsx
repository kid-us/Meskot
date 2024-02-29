import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/Login";
import SignUpBuyers from "./components/Pages/SignUpBuyers";
import SignUpTravellers from "./components/Pages/SignUpTravellers";
import ForgotPassword from "./components/Pages/ForgotPassword";
import NewPassword from "./components/Pages/NewPassword";
import { AuthProvider } from "./context/Auth";
import Protect from "./context/Protect";
import Dashboard from "./components/Pages/Dashboard";
import Orders from "./components/Pages/Orders";
import Profile from "./components/Pages/Profile";
import Window from "./components/Pages/Window";
import OrderInfo from "./components/Order/OrderInfo";
import PostOrder from "./components/Order/PostOrders";
import EmailVerify from "./components/Pages/EmailVerify";
import PostWindow from "./components/Window/PostWindow";
import WindowInfo from "./components/Window/WindowInfo";
import Dash from "./components/Admin/Dash";
import PostBlog from "./components/Blog/PostBlog";
import Blog from "./components/Pages/Blog";
import BlogView from "./components/Blog/BlogView";
import AboutUs from "./components/Pages/AboutUs";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" exact element={<Home></Home>}></Route>
          <Route path="/login" exact element={<Login></Login>}></Route>
          <Route
            path="/verify-email"
            exact
            element={<EmailVerify></EmailVerify>}
          ></Route>
          <Route
            path="sign-up-buyers"
            exact
            element={<SignUpBuyers></SignUpBuyers>}
          ></Route>
          <Route
            path="sign-up-travellers"
            exact
            element={<SignUpTravellers></SignUpTravellers>}
          ></Route>
          <Route
            path="forgot-password"
            exact
            element={<ForgotPassword></ForgotPassword>}
          ></Route>
          <Route
            path="new-password"
            exact
            element={<NewPassword></NewPassword>}
          ></Route>

          <Route
            path="/dashboard"
            exact
            element={
              <Protect>
                <Dashboard></Dashboard>
              </Protect>
            }
          ></Route>
          <Route
            path="/profile"
            exact
            element={
              <Protect>
                <Profile></Profile>
              </Protect>
            }
          ></Route>
          <Route path="/blog" exact element={<Blog></Blog>}></Route>
          <Route path="/blog/:id" exact element={<BlogView></BlogView>}></Route>
          <Route
            path="/order"
            exact
            element={
              <Protect>
                <Orders></Orders>
              </Protect>
            }
          ></Route>
          <Route
            path="/order/post-order"
            exact
            element={
              <Protect>
                <PostOrder></PostOrder>
              </Protect>
            }
          ></Route>
          <Route
            path="/order/:id"
            exact
            element={
              <Protect>
                <OrderInfo></OrderInfo>
              </Protect>
            }
          ></Route>
          <Route
            path="/window"
            exact
            element={
              <Protect>
                <Window></Window>
              </Protect>
            }
          ></Route>
          <Route
            path="/window/post-window"
            exact
            element={
              <Protect>
                <PostWindow></PostWindow>
              </Protect>
            }
          ></Route>
          <Route
            path="/window/:id"
            exact
            element={
              <Protect>
                <WindowInfo></WindowInfo>
              </Protect>
            }
          ></Route>

          {/* Admin */}
          <Route
            path="/admin"
            exact
            element={
              <Protect>
                <Dash></Dash>
              </Protect>
            }
          ></Route>
          <Route
            path="/admin/post-blog"
            exact
            element={
              <Protect>
                <PostBlog></PostBlog>
              </Protect>
            }
          ></Route>
          <Route path="/about-us" exact element={<AboutUs></AboutUs>}></Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
