import React from "react";
import ReactCountryFlag from "react-country-flag";

const ViewWindow = ({ country, close, open, arrival, traveler }) => {
  //   Change the date to human date
  function getFormattedDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);

    const date = new Date(year, month - 1, day);

    // Get the month name
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthName = monthNames[date.getMonth()];

    // Get the day name
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayName = dayNames[date.getDay()];

    return `${dayName}-${monthName}-${year}`;
  }
  return (
    <>
      <div className="row justify-content-center fw-semibold">
        <div className="col-lg-4 col-12 text-center mt-4">
          <ReactCountryFlag
            countryCode={country}
            svg
            style={{
              width: "10em",
              height: "auto",
              border: "1px solid #000",
              borderRadius: "5px",
            }}
            title="ET"
          />
          <p className="fs-1 mt-4">{country}</p>
        </div>
        <div className="col-lg-3 col-12 mt-3 ms-4">
          <p className="text-uppercase fs-5 mt-4">Traveler </p>
          <p className="fs-2 font-poppins">{traveler}</p>
          <p>
            <span className="text-uppercase font-poppins">Arrival Date:</span>
            <span className="ms-2 ">{getFormattedDate(arrival)}</span>
          </p>
          <p>
            <span className="text-uppercase font-poppins">Open Date:</span>
            <span className="ms-2">{getFormattedDate(open)}</span>
          </p>
          <p>
            <span className="text-uppercase font-poppins">Close Date:</span>
            <span className="ms-2">{getFormattedDate(close)}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default ViewWindow;
