import React, { useContext } from "react";
import resetAddress from "../events/resetAddress";
import { AddressContext } from "../context/addressContext";

const AddressResult = () => {
  const {
    provinceString,
    countyString,
    complexString,
    resultState,
  } = useContext(AddressContext);

  return (
    <div className={resultState}>
      <strong className="realty-address-info">찾으시려는 매물은</strong>
      <div className="realty-address-string">
        {provinceString ? <span>{provinceString}</span> : ""}
        {countyString ? <span>{countyString}</span> : ""}
        {complexString ? <span>{complexString}</span> : ""}
      </div>
      <button
        type="button"
        className="btn--search-new-one"
        onClick={() => resetAddress()}
      >
        새주소검색
      </button>
    </div>
  );
};

export default AddressResult;
