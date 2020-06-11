import React, { useContext } from "react";
import { AddressContext } from "../context/addressContext";

const SelectDate = () => {
  const { areasArray, setThatArea } = useContext(AddressContext);

  return (
    <div className="realty-area-size">
      <h3 className="realty-area-size-title">
        거래내역을 보려는 매물의 크기를 선택하세요.
      </h3>
      <div>
        {areasArray.map((area, index) => (
          <button
            key={`${parseInt(area)}-${index}`}
            className="btn--area-size"
            onClick={() => setThatArea(area)}
          >
            {area} ㎡
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectDate;
