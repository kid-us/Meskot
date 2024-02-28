import React from "react";
import axios from "axios";
import { request } from "../../constant/request";

const Demo = () => {
  //   const data = {};
  axios
    .get(`${request.baseUrl}/api/window`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

  return <div>Demo</div>;
};

export default Demo;
