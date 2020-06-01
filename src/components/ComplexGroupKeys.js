import React, { useContext } from "react";
import { AddressContext } from "../context/addressContext";

const ComplexGroupKeys = () => {
  const {
    complexGroupKey,
    showThisGroupedComplex,
    selectedGroupKey,
    chosenAddress,
  } = useContext(AddressContext);
  const { inputComplex } = chosenAddress;

  return (
    <div className="realty-korean-order">
      {complexGroupKey &&
        complexGroupKey.map((firstChar, idx) => (
          <button
            key={`${idx}-${firstChar}`}
            type="button"
            className={
              inputComplex && selectedGroupKey === firstChar
                ? "btn--align-ascending active"
                : "btn--align-ascending"
            }
            onClick={showThisGroupedComplex}
            value={firstChar}
          >
            {firstChar}
          </button>
        ))}
    </div>
  );
};

export default ComplexGroupKeys;
