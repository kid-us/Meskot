import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NAvBar";
import Footer from "../Footer";
import OrderBy from "./OrderBy";
import ViewOrder from "./ViewOrder";
import axios from "axios";
import { request } from "../../constant/request";
import Loading from "../Loading/Loading";

const OrderInfo = () => {
  const { id } = useParams();
  const [orderInfo, setOrderInfo] = useState();
  const [orderedBy, setOrderedBy] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${request.baseUrl}api/order/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setOrderInfo(response.data);
        if (response.data.user_id) {
          axios
            .get(`${request.userUrl}/${response.data.user_id}/`, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              setOrderedBy(response.data);
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
            <p className="text-uppercase text-end fw-semibold small">Product</p>
          </div>
        </div>
      </div>

      <div className="container bg-white rounded pt-4 mt-4">
        {orderInfo && (
          <ViewOrder
            img={orderInfo.upload_img}
            name={orderInfo.object_name}
            country={orderInfo.country}
            price={orderInfo.price}
            size={orderInfo.size}
            quantity={orderInfo.quantity}
            description={orderInfo.Description}
            object={orderInfo.object_type}
            weight={orderInfo.approx_weight}
            url={orderInfo.url}
          ></ViewOrder>
        )}
      </div>

      <div className="pt-4">
        {orderedBy && (
          <OrderBy
            order_id={orderInfo.order_id}
            name={orderedBy.name}
          ></OrderBy>
        )}
      </div>

      <div className="mt-5">
        <Footer></Footer>
      </div>
    </>
  );
};

export default OrderInfo;
