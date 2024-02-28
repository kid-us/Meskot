import React, { useEffect, useState } from "react";
import NavBar from "../NAvBar";
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

  // const [filter, setFilter] = useState("All");
  // const [filterClicked, setFilterClicked] = useState(false);
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

  // const handleFilters = (status) => {
  //   setFilterClicked(false);
  //   if (orders) {
  //     const filtered = orders.results.filter(
  //       (result) => result.status === status
  //     );
  //     setOrders({ ...orders, request: filtered });
  //   }
  // };

  return (
    <>
      {loading && <Loading></Loading>}
      <NavBar></NavBar>
      <div className="container mt-5 pt-4 fw-semibold">
        {user && user.User_Type === "buyer" ? (
          <div>
            {/* <div className="row justify-content-between">
              <div className="col-10 ">
                <p>Filter</p>
              </div>
              <div className="position-relative col-2 text-end">
                <p
                  className="cursor text-uppercase"
                  onClick={() => setFilterClicked(!filterClicked)}
                >
                  {filter}
                  <span
                    className={`${
                      filterClicked ? "bi-caret-up-fill" : "bi-caret-down-fill"
                    } ms-3`}
                  ></span>
                </p>
                {filterClicked && (
                  <div
                    className={`position-absolute mt-2 buyers-bg text-white small w-75 ms-5 px-4 pt-3 rounded shadow text-start`}
                    style={{ lineHeight: "12px" }}
                  >
                    <p
                      onClick={() => handleFilters("All")}
                      className="cursor text-uppercase small"
                    >
                      All
                    </p>
                    <p
                      onClick={() => handleFilters("Pending")}
                      className="cursor text-uppercase small"
                    >
                      Pending
                    </p>
                    <p
                      onClick={() => handleFilters("Approved")}
                      className="cursor text-uppercase small"
                    >
                      Approved
                    </p>
                    <p
                      onClick={() => handleFilters("Accepted")}
                      className="cursor text-uppercase small"
                    >
                      Accepted
                    </p>
                    <p
                      onClick={() => handleFilters("Payed")}
                      className="cursor text-uppercase small"
                    >
                      Payed
                    </p>
                    <p
                      onClick={() => handleFilters("Purchased")}
                      className="cursor text-uppercase small"
                    >
                      Purchased
                    </p>
                    <p
                      onClick={() => handleFilters("Completed")}
                      className="cursor text-uppercase small"
                    >
                      Completed
                    </p>
                  </div>
                )}
              </div>
            </div> */}
            {orders ? (
              orders.results.length > 0 ? (
                <BuyerDashboard orders={orders}></BuyerDashboard>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="mt-2">
            {window ? (
              window.results.length > 0 ? (
                <TravelerDashboard window={window}></TravelerDashboard>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
        )}
      </div>
      <Footer></Footer>
    </>
  );
};

export default Dashboard;
