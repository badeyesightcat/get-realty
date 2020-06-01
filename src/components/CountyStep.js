import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AddressContext } from "../context/addressContext";

import SubTitle from "./SubTitle";
import RadioItem from "./RadioItem";
import ButtonShowNextStep from "./ShowNextStep";

function CountyStep(props) {
  const { county, chosenAddress } = useContext(AddressContext);
  const { inputCounty } = chosenAddress;

  return (
    <div className="realty-input__step">
      <SubTitle title="구·군을" />

      <div className="input-group">
        {county.map((item) => (
          <RadioItem
            key={item.key}
            item={item}
            name="inputCounty"
            data={inputCounty}
          />
        ))}
      </div>

      <Link to="/complexStep">
        <ButtonShowNextStep />
      </Link>
    </div>
  );
}

export default CountyStep;
