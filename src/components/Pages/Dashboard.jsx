import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import { request } from "../../constant/request";
import BuyerDashboard from "../Dashboard/BuyerDashboard";
import TravelerDashboard from "../Dashboard/TravelerDashboard";
import Footer from "../../components/Footer";
import Loading from "../Loading/Loading";

const Dashboard = () => {
  const [user, setUser] = useState();
  const [orders, setOrders] = useState();
  const [window, setWindow] = useState();
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState("All");
  // const [pending, setPending] = useState();
  // const [approved, setApproved] = useState();
  // const [accepted, setAccepted] = useState();
  // const [payed, setPayed] = useState();
  // const [purchased, setPurchased] = useState();
  // const [completed, setCompleted] = useState();

  const { auth } = useAuth();

  useEffect(() => {
    setUser(auth);
    if (auth.User_Type === "buyer") {
      axios
        .get(`${request.baseUrl}api/buyer/order/${auth.id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setOrders(response.data);

          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`${request.baseUrl}api/filter/window?`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setWindow(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleChange = (event) => {
    let stat = event.target.value;
    setDisplay(stat);
    let filter = orders.results.filter(
      (item) => item.status.trim() === `${stat}`
    );

    let data = {
      count: filter.length,
      next: null,
      previous: null,
      results: filter,
    };

    setOrders(data);
  };

  return (
    <>
      {loading && <Loading></Loading>}
      <NavBar></NavBar>
      <div className="container mt-5 pt-4 fw-semibold">
        {user && user.User_Type === "buyer" ? (
          <div>
            <div>
              <p className="my-2 pb-3 pt-3">
                Welcome
                <span className="buyers-bg rounded px-4 text-white p-1">
                  {user.name}
                </span>
                &nbsp; this is your dashboard you can manage your orders here
              </p>
              <div className="row justify-content-between">
                <div className="col-lg-4 col-6">
                  <p className="pb-2 fs-5 bi-hash">
                    &nbsp;
                    {display === "All" ? "All Orders" : display}
                  </p>
                </div>
                <div className="col-lg-2 col-6 text-end">
                  <select className="form-select" onChange={handleChange}>
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Payed">Payed</option>
                    <option value="Purchased">Purchased</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
            {orders ? (
              orders.results.length > 0 ? (
                <>
                  <BuyerDashboard orders={orders}></BuyerDashboard>
                </>
              ) : (
                <p className="my-5 p-5 bg-white fs-5 text-center">
                  There is no Orders under this "{display}" Status
                </p>
              )
            ) : (
              ""
            )}
          </div>
        ) : (
          user && (
            <div className="mt-2">
              <div>
                <p className="my-2 pb-3">
                  Welcome
                  <span className="buyers-bg rounded px-4 text-white p-1">
                    {user.name}
                  </span>
                  &nbsp; this is your dashboard you can manage your windows here
                </p>
                <div className="row justify-content-between">
                  <div className="col-lg-4 col-6">
                    <p className="mt-3 pb-2 fs-5 bi-hash">
                      &nbsp;
                      {display === "All" ? "All of your Orders" : display}
                    </p>
                  </div>
                  <div className="col-lg-2 col-6 text-end">
                    <select className="form-select" onChange={handleChange}>
                      <option value="All">All</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      {user.User_Type === "buyer" && (
                        <>
                          <option value="Accepted">Accepted</option>
                          <option value="Payed">Payed</option>
                          <option value="Purchased">Purchased</option>
                          <option value="Completed">Completed</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div>
              {window ? (
                window.results.length > 0 ? (
                  <TravelerDashboard window={window}></TravelerDashboard>
                ) : (
                  <p className="my-5 p-5 bg-white fs-5 text-center">
                    There is no Windows under this "{display}" Status
                  </p>
                )
              ) : (
                ""
              )}
            </div>
          )
        )}
      </div>
      <Footer></Footer>
    </>
  );
};

export default Dashboard;
