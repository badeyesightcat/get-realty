import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AddressContext } from "../context/addressContext";

import SubTitle from "./SubTitle";
import RadioItem from "./RadioItem";
import ButtonShowNextStep from "./ShowNextStep";

function ProvinceStep(props) {
  const { province, chosenAddress } = useContext(AddressContext);
  const { inputProvince } = chosenAddress;

  return (
    <div className="realty-input__step">
      <SubTitle title="시·도를" />

      <div className="input-group">
        {province.map((item) => (
          <RadioItem
            key={item.key}
            item={item}
            name="inputProvince"
            data={inputProvince}
          />
        ))}
      </div>

      <Link to="/countyStep">
        <ButtonShowNextStep />
      </Link>
    </div>
  );
}

export default ProvinceStep;
