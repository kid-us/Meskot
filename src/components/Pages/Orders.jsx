import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import NavBar from "../NavBar";
import Footer from "../Footer";
import Products from "../Order/Products";
import { Link } from "react-router-dom";
import LargeFilter from "../Filter/LargeFilter";
import axios from "axios";
import { request } from "../../constant/request";
import Loading from "../Loading/Loading";
import MultiRangeSlider from "multi-range-slider-react";
import Select from "react-select";
// Jotai
import size from "../../libs/SizeAtom";
import object from "../../libs/ObjectAtom";
import { useAtom } from "jotai";

const Orders = () => {
  const { auth } = useAuth();
  const [user, setUser] = useState();
  const [filterClicked, setFilterClicked] = useState(false);
  const [orders, setOrders] = useState("");
  const [loading, setLoading] = useState(true);
  // Jotai State
  const [sizeFilter, setSizeFilter] = useAtom(size);
  const [objectFilter, setObjectFilter] = useAtom(object);
  // Size Range
  const [minValue, set_minValue] = useState(1);
  const [maxValue, set_maxValue] = useState(5000);
  // Country
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [countryChange, setCountryChange] = useState(0);

  // Country
  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue);
      });
  }, []);

  // user
  useEffect(() => {
    setUser(auth);
    axios
      .get(`${request.baseUrl}/api/order`, {
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
  }, [auth]);

  // Handle All Windows
  const handleAllOrders = () => {
    axios
      .get(`${request.baseUrl}/api/order`, {
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
  };

  // Handle Range
  const handleRangeInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  // Handle Small filter
  const handleFilter = () => {
    setFilterClicked(!filterClicked);
  };

  // Filter button
  const filterOrders = () => {
    // Filter by Both
    if (sizeFilter.length > 0 && objectFilter.length > 0) {
      let filter;
      if (minValue === 1 && maxValue === 5000) {
        filter = `object_type=${objectFilter.join(",")}&size=${sizeFilter.join(
          ","
        )}${countryChange === 1 ? `&country=${selectedCountry.value}` : ""}`;
      } else {
        filter = `object_type=${objectFilter.join(",")}&size=${sizeFilter.join(
          ","
        )}&minPrice=${minValue}&maxPrice=${maxValue}${
          countryChange === 1 ? `&country=${selectedCountry.value}` : ""
        }`;
      }
      fetchFilters(filter);
      // Only Filtered by Size
    } else if (sizeFilter.length > 0) {
      let filter;
      if (minValue === 1 && maxValue === 5000) {
        filter = `&size=${sizeFilter.join(",")}${
          countryChange === 1 ? `&country=${selectedCountry.value}` : ""
        }`;
      } else {
        filter = `&size=${sizeFilter.join(
          ","
        )}&minPrice=${minValue}&maxPrice=${maxValue}${
          countryChange === 1 ? `&country=${selectedCountry.value}` : ""
        }`;
      }
      fetchFilters(filter);
      // Only Filtered by Object
    } else if (objectFilter.length > 0) {
      let filter;
      if (minValue === 1 && maxValue === 5000) {
        filter = `object_type=${objectFilter.join(",")}${
          countryChange === 1 ? `&country=${selectedCountry.value}` : ""
        }`;
      } else {
        filter = `object_type=${objectFilter.join(
          ","
        )}&minPrice=${minValue}&maxPrice=${maxValue}${
          countryChange === 1 ? `&country=${selectedCountry.value}` : ""
        }`;
      }
      fetchFilters(filter);
      // Filtered by only Price
    } else if (
      sizeFilter.length === 0 &&
      objectFilter.length === 0 &&
      minValue !== 1 &&
      maxValue !== 5000
    ) {
      let filter = `minPrice=${minValue}&maxPrice=${maxValue}${
        countryChange === 1 ? `&country=${selectedCountry.value}` : ""
      }`;
      fetchFilters(filter);
    } else if (
      sizeFilter.length === 0 &&
      objectFilter.length === 0 &&
      minValue === 1 &&
      maxValue === 5000 &&
      countryChange === 1
    ) {
      let filter = `country=${selectedCountry.value}`;
      fetchFilters(filter);
    }
  };

  // Filter fetch function
  function fetchFilters(url) {
    axios
      .get(`${request.baseUrl}api/filter/order?${url}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      {loading && <Loading></Loading>}
      <NavBar user={user}></NavBar>
      <div className="container-fluid px-lg-5 mt-5 pt-4">
        <div className="row justify-content-center ms-lg-3">
          <div className="col-lg-2 col-5 mt-3 fw-semibold">
            <p>
              <Link to={"/"} className="text-black">
                Home
              </Link>
              &nbsp; / <span className="text-secondary">Order</span>
            </p>
          </div>
          <div
            className="col-lg-8 col-3 buyers-bg"
            style={{ height: "10px", marginTop: "25px" }}
          ></div>
          {user &&
            (user.User_Type === "buyer" ? (
              <div className="col-lg-2 col-4 mt-lg-3 mt-4 fw-semibold text-end pe-lg-5">
                <Link
                  to={"/order/post-order"}
                  className="buyers-bg text-white px-lg-4 px-2 py-2 rounded small"
                >
                  Post Order
                </Link>
              </div>
            ) : (
              <div className="col-lg-2 col-4 mt-lg-3 mt-3 fw-semibold text-end pe-lg-5">
                <p className="text-uppercase">Traveler</p>
              </div>
            ))}

          {/* Filter */}
          <div className="col-2 d-none d-md-block fw-semibold mt-3 pb-5">
            <div className="row">
              <div className="col-9">
                <p className="fs-5">
                  <span className="bi-sliders"></span> Filter
                </p>
              </div>
              <div className="col-1 mt-1">
                {(sizeFilter.length > 0 ||
                  objectFilter.length > 0 ||
                  minValue > 1 ||
                  maxValue < 5000 ||
                  countryChange === 1) && (
                  <button
                    onClick={() => filterOrders()}
                    className="small bi-check-all border rounded buyers-bg text-white px-2 cursor"
                  ></button>
                )}
              </div>
            </div>

            <p
              onClick={() => handleAllOrders()}
              className="cursor fw-semibold bi-check"
            >
              &nbsp; All Orders
            </p>

            <p className="font-poppins mt-3 bi-flag-fill"> Country</p>

            <Select
              options={countries}
              value={selectedCountry}
              onChange={(selectedOption) => {
                setSelectedCountry(selectedOption);
                setCountryChange(1);
              }}
              className={`mb-3 fs-6 fw-semibold border rounded border-warning`}
            />

            <p className="font-poppins bi-cash"> Price</p>
            <MultiRangeSlider
              min={1}
              max={5000}
              step={10}
              minValue={minValue}
              maxValue={maxValue}
              onInput={(e) => {
                handleRangeInput(e);
              }}
              ruler={false}
              barInnerColor="blue"
              style={{ border: "none", boxShadow: "none", color: "#fff" }}
              className="text-black font-monospace pt-3"
            />
            <LargeFilter></LargeFilter>
          </div>

          {/* Small Filter */}
          <div className="d-md-block d-md-none pt-2">
            <p className="fw-semibold fs-5">
              Filter
              <span
                onClick={() => handleFilter()}
                className="bi-sliders fs-3 float-end"
              ></span>
            </p>
          </div>

          {/* Products */}
          <div className="col-lg-10 col-md-10 col-12 px-lg-5 px-1 mb-4 mt-4">
            {orders === "" && (
              <div className="text-center mt-5">
                <p className="fw-semibold fs-5">
                  There is no available Orders! Create your Buyer Account and
                  Post Orders!
                </p>
              </div>
            )}

            {orders ? (
              orders.results.length > 0 ? (
                <Products orders={orders}></Products>
              ) : (
                <>
                  <div className="text-center">
                    <p className="fw-semibold fs-5">
                      There is no Available Orders! Create your Buyer Account
                      and Post one
                    </p>
                  </div>
                </>
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <Footer user={user}></Footer>

      {/* Small Device Filter */}
      {filterClicked && (
        <div className="animate__animated animate__fadeInUp small-filter px-4 pt-4 border shadow rounded">
          <div className="row">
            <div className="col-7">
              <p className="fw-semibold fs-5">Filter Out By</p>
            </div>
            <div className="offset-1 col-1 text-end">
              {(sizeFilter.length > 0 ||
                objectFilter.length > 0 ||
                minValue > 1 ||
                maxValue < 5000) && (
                <button
                  onClick={() => filterOrders()}
                  className="small bi-check-all border rounded buyers-bg text-white px-2 cursor"
                ></button>
              )}
            </div>
            <div className="col-3 text-end">
              <p onClick={() => handleFilter()} className="bi-x-lg"></p>
            </div>
          </div>

          <p
            onClick={() => handleAllOrders()}
            className="cursor fw-semibold bi-check
"
          >
            &nbsp; All Orders
          </p>

          <p className="font-poppins mt-3 bi-flag-fill"> Country</p>

          <Select
            options={countries}
            value={selectedCountry}
            onChange={(selectedOption) => setSelectedCountry(selectedOption)}
            className={`mb-3 fs-6 fw-semibold border rounded border-warning`}
          />

          <p className="font-poppins bi-cash"> Price</p>
          <MultiRangeSlider
            min={1}
            max={5000}
            step={10}
            minValue={minValue}
            maxValue={maxValue}
            onInput={(e) => {
              handleRangeInput(e);
            }}
            ruler={false}
            barInnerColor="blue"
            style={{ border: "none", boxShadow: "none", color: "#fff" }}
            className="text-black font-monospace pt-3"
          />
          <LargeFilter></LargeFilter>
        </div>
      )}
    </>
  );
};

export default Orders;
