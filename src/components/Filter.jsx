import React, { useEffect, useState } from "react";
import size from "../libs/SizeAtom";
import object from "../libs/ObjectAtom";
import { useAtom } from "jotai";

const Filter = ({ option, type, id }) => {
  const [sizeFilter, setSizeFilter] = useAtom(size);
  const [objectFilter, setObjectFilter] = useAtom(object);

  const handleFilter = (filterValue, type) => {
    const filter = filterValue.toLowerCase();

    if (type === "size") {
      const index = sizeFilter.indexOf(filter);
      if (index !== -1) {
        const updatedFilters = [
          ...sizeFilter.slice(0, index),
          ...sizeFilter.slice(index + 1),
        ];
        setSizeFilter(updatedFilters);
      } else {
        setSizeFilter([...sizeFilter, filter]);
      }
    } else if (type === "object") {
      const index = objectFilter.indexOf(filter);
      if (index !== -1) {
        const updatedFilters = [
          ...objectFilter.slice(0, index),
          ...objectFilter.slice(index + 1),
        ];
        setObjectFilter(updatedFilters);
      } else {
        setObjectFilter([...objectFilter, filter]);
      }
    }
  };

  return (
    <>
      <div className="fw-semibold">
        <div className="lh-lg">
          <input
            type="checkbox"
            name={type}
            value={option}
            className="form-control-check cursor"
            id={option}
            onClick={() => handleFilter(option, type)}
          />
          <label
            htmlFor={option}
            className="ms-2 form-check-label cursor small text-uppercase"
          >
            {option}
          </label>
        </div>
      </div>
    </>
  );
};

export default Filter;
