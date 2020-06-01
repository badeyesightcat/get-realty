import React, { useContext, useEffect } from "react";
import { AddressContext } from "../context/addressContext";
import { Link } from "react-router-dom";
import SubTitle from "./SubTitle";
import ComplexGroupKeys from "./ComplexGroupKeys";
import RadioItem from "./RadioItem";

function CountyStep(props) {
  const {
    chosenAddress,
    chosenComplexGroup,
    setResultState,
    setChosenAddress,
  } = useContext(AddressContext);
  const { inputComplex } = chosenAddress;

  useEffect(() => {
    const targetComplex = chosenComplexGroup.find(
      ({ key }) => `${key}` === inputComplex
    );

    inputComplex &&
      setChosenAddress(({ ...prev }) => {
        const { province, gu, road, title } = targetComplex;

        return {
          ...prev,
          inputWholeAddress: `${province} ${gu} ${road} ${title}`,
        };
      });
  }, [inputComplex, chosenComplexGroup, setChosenAddress]);

  return (
    <div className="realty-input__step">
      <SubTitle title="초성을 선택한 후 아파트 단지를" />

      <ComplexGroupKeys />

      <div className="input-group">
        {chosenComplexGroup.map((item) => (
          <RadioItem
            key={item.key}
            item={item}
            name="inputComplex"
            data={inputComplex}
          />
        ))}
      </div>

      <Link to="/DealsTable">
        <button
          type="button"
          className="btn--go-next"
          onClick={() => setResultState("address-result with-map")}
        >
          해당 아파트 단지의 거래내역 보기
        </button>
      </Link>
    </div>
  );
}

export default CountyStep;
