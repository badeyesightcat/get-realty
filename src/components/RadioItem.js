import React, { useContext } from "react";
import { AddressContext } from "../context/addressContext";

function RadioItem(props) {
  const { handleChange } = useContext(AddressContext);
  const { item, data, name } = props;

  return (
    <div className="radio-wrap">
      <input
        type="radio"
        name={name}
        id={`p-${item.key}`}
        checked={parseInt(data) === item.key}
        onChange={handleChange}
        value={item.key}
      />
      <label htmlFor={`p-${item.key}`}>{item.title}</label>
    </div>
  );
}

export default RadioItem;
