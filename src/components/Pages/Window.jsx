import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import NavBar from "../NAvBar";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import WindowFeed from "../Window/WindowFeed";
import axios from "axios";
import { request } from "../../constant/request";
import Filter from "../Filter";
import Select from "react-select";
const Window = () => {
  const [user, setUser] = useState();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [window, setWindow] = useState();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [filterClicked, setFilterClicked] = useState(false);
  const [countryChange, setCountryChange] = useState(0);
  const [sort, setSort] = useState("");

  // Filter small
  const handleFilter = () => {
    setFilterClicked(!filterClicked);
  };

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

  // User
  useEffect(() => {
    setUser(auth);
    setLoading(false);
    axios
      .get(`${request.baseUrl}/api/window`, {
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
        setLoading(true);
      });
  }, [auth]);

  // Sorting
  const handleSorting = (sort) => {
    setSort(sort);
  };

  // Filter button
  const filterOrders = () => {
    if (sort !== "") {
      let filter;
      filter = `sort=${sort}${
        countryChange === 1 ? `&country=${selectedCountry.value}` : ""
      }`;
      fetchFilters(filter);
    } else if (sort === "") {
      let filter;
      filter = `&country=${selectedCountry.value}`;
      fetchFilters(filter);
    }
  };

  // Filter fetch function
  function fetchFilters(url) {
    axios
      .get(`${request.baseUrl}api/filter/window?${url}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setWindow(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      {loading && <Loading></Loading>}

      <NavBar user={user}></NavBar>

      <div className="container-fluid px-lg-4 mt-5 pt-4">
        <div className="row justify-content-center ms-lg-3">
          <div className="col-lg-2 col-5 mt-4 fw-semibold">
            <p>
              <Link to={"/"} className="text-black">
                Home
              </Link>
              &nbsp; / <span className="text-secondary">Window</span>
            </p>
          </div>
          <div
            className="col-lg-8 col-lg-3 col-1 buyers-bg"
            style={{ height: "10px", marginTop: "32px" }}
          ></div>

          {user &&
            (user.User_Type === "traveler" ? (
              <div className="col-lg-2 col-6 mt-lg-3 mt-4 fw-semibold text-end pe-lg-5">
                <Link
                  to={"/window/post-window"}
                  className="buyers-bg text-white px-lg-4 px-2 py-2 rounded small"
                >
                  Post Window
                </Link>
              </div>
            ) : (
              <div className="col-lg-2 col-4 mt-lg-3 mt-4 fw-semibold text-end pe-lg-5">
                <p className="text-uppercase">Buyer</p>
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
                {(countryChange === 1 || sort !== "") && (
                  <button
                    onClick={() => filterOrders()}
                    className="small bi-check-all border rounded buyers-bg text-white px-2 cursor"
                  ></button>
                )}
              </div>
            </div>
            <p className="font-poppins bi-flag-fill mt-4"> Country</p>
            <Select
              options={countries}
              value={selectedCountry}
              onChange={(selectedOption) => {
                setSelectedCountry(selectedOption);
                setCountryChange(1);
              }}
              className={`mb-3 fs-6 fw-semibold border rounded border-warning`}
            />

            <p className="font-poppins bi-arrow"> Sort</p>
            <div className="fw-semibold">
              <div className="lh-lg">
                <input
                  type="radio"
                  value="ascending"
                  name="sort"
                  className="form-control-check cursor"
                  onClick={() => handleSorting("ascend")}
                />
                <label
                  htmlFor="ascending"
                  className="ms-2 form-check-label cursor small text-uppercase"
                >
                  Ascending
                </label>
              </div>

              <div className="lh-lg">
                <input
                  type="radio"
                  value="descending"
                  name="sort"
                  className="form-control-check cursor"
                  onClick={() => handleSorting("descend")}
                />
                <label
                  htmlFor="descending"
                  className="ms-2 form-check-label cursor small text-uppercase"
                >
                  Descending
                </label>
              </div>
            </div>
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

          {/* Window */}
          <div className="col-lg-10 col-md-10 col-12 px-lg-5 px-1 mb-4 mt-2">
            {window === "" && (
              <div className="text-center mt-5">
                <p className="fw-semibold fs-5">
                  There is no available Windows! Create your Traveler Account
                  and Post Windows!
                </p>
              </div>
            )}
            {window ? (
              window.results.length > 0 && (
                <WindowFeed window={window}></WindowFeed>
              )
            ) : (
              <div className="text-center mt-5">
                <p className="fw-semibold fs-5">
                  There is no available Windows! Create your Traveler Account
                  and Post Windows!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>

      {/* Small Device Filter */}
      {filterClicked && (
        <div className="animate__animated animate__fadeInUp small-filter px-4 pt-4 shadow border rounded">
          <div className="row">
            <div className="col-7">
              <p className="fw-semibold fs-5">Filter Out By</p>
            </div>
            <div className="offset-1 col-1 text-end">
              {(countryChange === 1 || sort !== "") && (
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

          <p className="font-poppins bi-arrow"> Sort</p>
          <div className="fw-semibold">
            <div className="lh-lg">
              <input
                type="radio"
                value="ascending"
                name="sort"
                className="form-control-check cursor"
                onClick={() => handleSorting("ascend")}
              />
              <label
                htmlFor="ascending"
                className="ms-2 form-check-label cursor small text-uppercase"
              >
                Ascending
              </label>
            </div>

            <div className="lh-lg">
              <input
                type="radio"
                value="descending"
                name="sort"
                className="form-control-check cursor"
                onClick={() => handleSorting("descend")}
              />
              <label
                htmlFor="descending"
                className="ms-2 form-check-label cursor small text-uppercase"
              >
                Descending
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Window;
