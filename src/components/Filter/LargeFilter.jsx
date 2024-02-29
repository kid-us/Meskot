import React, { useState } from "react";
import Filter from "../Filter";

const LargeFilter = () => {
  return (
    <>
      <p className="font-poppins mt-3 bi-arrows-angle-contract"> Size</p>
      <Filter type={"size"} option={"Very-Small"}></Filter>
      <Filter type={"size"} option={"Small"}></Filter>
      <Filter type={"size"} option={"Medium"}></Filter>
      <Filter type={"size"} option={"Large"}></Filter>
      <Filter type={"size"} option={"Very-Big"}></Filter>
      <p className="font-poppins mt-3 bi-diagram-3-fill"> Object Type</p>
      <Filter type={"object"} option={"Shoes"}></Filter>
      <Filter type={"object"} option={"Phone"}></Filter>
      <Filter type={"object"} option={"Clothes"}></Filter>
      <Filter type={"object"} option={"Cigarette"}></Filter>
      <Filter type={"object"} option={"Laptop"}></Filter>
      <Filter type={"object"} option={"Drink"}></Filter>
      <Filter type={"object"} option={"Perfume"}></Filter>
      <Filter type={"object"} option={"Camera"}></Filter>
      <Filter type={"object"} option={"Wheelchair"}></Filter>
      <Filter type={"object"} option={"Watch"}></Filter>
      <Filter type={"object"} option={"Beard-Hair"}></Filter>
      <Filter type={"object"} option={"Medicines"}></Filter>
      <Filter type={"object"} option={"Other"}></Filter>
    </>
  );
};

export default LargeFilter;
