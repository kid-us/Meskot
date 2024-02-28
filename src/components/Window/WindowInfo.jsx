import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { request } from "../../constant/request";
import NavBar from "../NAvBar";
import Footer from "../Footer";
import Loading from "../Loading/Loading";
import ViewWindow from "./ViewWindow";

const windowInfo = () => {
  const { id } = useParams();
  const [windowInfo, setWindowInfo] = useState();
  const [traveler, setTraveler] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${request.baseUrl}api/window/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setWindowInfo(response.data);
        if (response.data.user_id) {
          axios
            .get(`${request.userUrl}/${response.data.user_id}/`, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              // console.log(response.data.name);
              setTraveler(response.data);
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {loading && <Loading></Loading>}
      <NavBar></NavBar>

      <div className="container-fluid mt-5 pt-5">
        <div className="row px-lg-4">
          <div className="col-lg-11 col-9">
            <div className="top-border buyers-bg"></div>
          </div>
          <div className="col-lg-1 col-1">
            <p className="text-uppercase text-end fw-semibold small me-lg-5">
              Traveler
            </p>
          </div>
        </div>

        <div className="container bg-white rounded pt-4 mt-4">
          {windowInfo && traveler && (
            <ViewWindow
              country={windowInfo.country}
              open={windowInfo.open_date}
              close={windowInfo.close_date}
              arrival={windowInfo.arrival_date}
              traveler={traveler.name}
            ></ViewWindow>
          )}
        </div>
      </div>
      <div className="mt-5">
        <Footer></Footer>
      </div>
    </>
  );
};

export default windowInfo;
