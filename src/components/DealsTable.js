import React, { useContext } from "react";
import { AddressContext } from "../context/addressContext";

const DealsTable = () => {
  const { deals } = useContext(AddressContext);

  return (
    <div className="realty__data-area">
      <table className="realty-data-table">
        <thead>
          <tr>
            <th className="table-th" scope="col">
              번호
            </th>
            <th className="table-th" scope="col">
              공급면적 (제곱미터)
            </th>
            <th className="table-th" scope="col">
              층수 (층)
            </th>
            <th className="table-th" scope="col">
              거래가격 (만원)
            </th>
            <th className="table-th" scope="col">
              날짜
            </th>
            <th className="table-th" scope="col">
              준공연도
            </th>
          </tr>
        </thead>
        <tbody>
          {!deals
            ? "거래내역이 없습니다."
            : deals.map((item, idx) => (
                <tr key={item.Idx}>
                  <td className="table-td">{idx + 1}</td>
                  <td className="table-td">{item.AreaExclusive}</td>
                  <td className="table-td">{item.Floor}</td>
                  <td className="table-td">{item.Price}</td>
                  <td className="table-td">{`${item.Year}년 ${item.Month}월 ${item.Date}일`}</td>
                  <td className="table-td">{`${item.YearBuilt}년`}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default DealsTable;
