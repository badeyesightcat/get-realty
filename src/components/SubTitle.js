import React from "react";

const SubTitle = (props) => {
  const { title } = props;

  return (
    <h2 className="realty-input__title">해당하는 {`${title}`} 선택하세요.</h2>
  );
};

export default SubTitle;
