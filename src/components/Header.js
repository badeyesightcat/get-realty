import React, { useContext, useState, useEffect } from "react";
import { AddressContext } from "../context/addressContext";
import resetAddress from "../events/resetAddress";

function Header() {
  const { chosenAddress, province } = useContext(AddressContext);
  const { inputProvince } = chosenAddress;

  let [logo, setLogo] = useState("realty-brand");
  useEffect(() => {
    if (province && inputProvince) {
      setLogo("realty-brand with-result");
    }
  }, [province, inputProvince]);

  return (
    <h1 onClick={() => resetAddress()} className={logo}>
      주택실거래가변동
    </h1>
  );
}

export default Header;
