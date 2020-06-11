import React, { useState, useEffect } from "react";
import sortItems from "../events/sortItems";

const AddressContext = React.createContext();

const AddressContextProvier = (props) => {
  const root = "http://localhost:8080";

  // state: 동적으로 할당되는 주소 DB
  let [province, setProvince] = useState([]);
  let [county, setCounty] = useState([]);
  let [complex, setComplex] = useState({});
  let [deals, setDeals] = useState([]);
  let [areasArray, setAreasArray] = useState(null);
  let [thatArea, setThatArea] = useState(null);
  let [dealsOfThatArea, setDealsOfThatArea] = useState(null);

  // state: 사용자가 선택한 주소 객체
  let [chosenAddress, setChosenAddress] = useState({
    inputProvince: null,
    inputCounty: null,
    inputComplex: null,
    inputWholeAddress: "",
  });

  // state: 사용자가 선택한 주소 영역의 한글값
  let [provinceString, setProvinceString] = useState("");
  let [countyString, setCountyString] = useState("");
  let [complexString, setComplexString] = useState("");

  // state: 사용자가 선택할 단지의 초성별 그룹화 및 선택된 단지그룹
  let [complexGroupKey, setComplexGroupKey] = useState([]);
  let [selectedGroupKey, setSelectedGroupKey] = useState("");
  let [chosenComplexGroup, setChosenComplexGroup] = useState([]);

  // state: 검색하려는 매물의 주소 노출부분
  let [resultState, setResultState] = useState("address-result hide");

  // 사용자의 선택반영
  const handleChange = (e) => {
    // e.preventDefault();
    const { name, value } = e.target;
    setChosenAddress((prevState) => {
      switch (name) {
        case "inputProvince":
          return {
            [name]: value,
            inputCounty: null,
            inputComplex: null,
            inputWholeAddress: "",
          };
        case "inputCounty":
          return {
            ...prevState,
            [name]: value,
            inputComplex: null,
            inputWholeAddress: "",
          };
        case "inputComplex":
          return {
            ...prevState,
            [name]: value,
            inputWholeAddress: "",
          };
        case "inputWholeAddress":
          return {
            ...prevState,
            [name]: value,
          };
        default:
          return {
            inputProvince: null,
            inputCounty: null,
            inputComplex: null,
            inputWholeAddress: "",
          };
      }
    });
  };

  // 사용자가 선택한 초성으로 시작하는 아파트 단지 목록
  const showThisGroupedComplex = (e) => {
    let { value } = e.target;
    setChosenAddress((prev) => ({
      ...prev,
      inputComplex: null,
    }));
    setSelectedGroupKey(value);
  };

  // state: 시도 목록
  useEffect(() => {
    fetch(`${root}/provinces`)
      .then((response) => response.json())
      .then((response) => {
        const sorted = sortItems(response.result);
        setProvince(sorted);
      });
  }, []);

  // state: 시도 텍스트
  useEffect(() => {
    let target = province.find(
      ({ key }) => `${key}` === chosenAddress.inputProvince
    );
    setProvinceString(() => (target ? target.title : null));
  }, [province, chosenAddress.inputProvince]);

  // state: 구군 목록
  useEffect(() => {
    chosenAddress.inputProvince &&
      fetch(`${root}/cities/${chosenAddress.inputProvince}`) // /cities/{province.key} 해당 시도 내 구군의 목록
        .then((response) => response.json())
        .then((response) => {
          const sorted = sortItems(response.result);
          setCounty(sorted);
        });
  }, [chosenAddress.inputProvince]);

  // state: 구군 텍스트
  useEffect(() => {
    let target = county.find(
      ({ key }) => `${key}` === chosenAddress.inputCounty
    );
    setCountyString(() => (target ? target.title : null));
  }, [county, chosenAddress.inputCounty]);

  // state: 아파트단지 목록
  useEffect(() => {
    chosenAddress.inputCounty &&
      fetch(`${root}/complexes/${chosenAddress.inputCounty}`)
        .then((response) => response.json())
        .then((response) => {
          // state: 한글 자음배열
          const hangulOrder = [
            "ㄱ",
            "ㄲ",
            "ㄴ",
            "ㄷ",
            "ㄸ",
            "ㄹ",
            "ㅁ",
            "ㅂ",
            "ㅃ",
            "ㅅ",
            "ㅆ",
            "ㅇ",
            "ㅈ",
            "ㅉ",
            "ㅊ",
            "ㅋ",
            "ㅌ",
            "ㅍ",
            "ㅎ",
          ];
          let sorted = sortItems(response.result);

          let reduced = sorted.reduce((acc, item) => {
            // 한글 유니코드 값 = 0xAC00 + (((초성×21)+중성)×28+종성)
            let thatLetter = item.title.charCodeAt(0) - 0xac00;
            let lastChar = thatLetter % 28;
            let middleChar = ((thatLetter - lastChar) / 28) % 21;
            let firstChar = ((thatLetter - lastChar) / 28 - middleChar) / 21;

            if (item.title.charCodeAt(0) < 0xac00) {
              if (!acc["기타"]) {
                acc["기타"] = [];
              }
              acc["기타"].push(item);
            } else {
              if (!acc[hangulOrder[firstChar]]) {
                acc[hangulOrder[firstChar]] = [];
              }
              acc[hangulOrder[firstChar]].push(item);
            }
            return acc;
          }, {});

          setComplex(reduced);
        });
  }, [chosenAddress.inputCounty]);

  // state: 선택한 구군내 단지들의 초성배열
  useEffect(() => {
    let temp = [];
    for (let char in complex) {
      if (!temp[char]) {
        temp.push(char);
      }
    }
    setComplexGroupKey(temp);
  }, [chosenAddress.inputCounty, complex]);

  // state: 사용자가 선택한 초성의 단지
  useEffect(() => {
    let temp = [];
    for (const prop in complex) {
      if (prop === selectedGroupKey) temp = [...complex[prop]];
    }

    setChosenComplexGroup(temp);
  }, [complex, selectedGroupKey]);

  // state: 아파트단지 텍스트
  useEffect(() => {
    let target = chosenComplexGroup.find(
      ({ key }) => `${key}` === chosenAddress.inputComplex
    );

    setComplexString(target ? target.title : null);
  }, [chosenAddress.inputComplex, chosenComplexGroup]);

  // state: 사용자가 선택한 아파트단지의 거래내역 // /deals/{cities.key} 해당 구군의 거래 목록
  useEffect(() => {
    chosenAddress.inputComplex &&
      fetch(`${root}/deals/${chosenAddress.inputComplex}`)
        .then((response) => response.json())
        .then((response) => {
          setDeals(response);
        });
  }, [chosenAddress.inputComplex]);

  // state: 결과 주소가 노출되는 부분의 클래스 콘트롤
  useEffect(() => {
    if (chosenAddress.inputProvince) setResultState("address-result");
  }, [chosenAddress.inputProvince]);

  // state: 해당 아파트가 보유한 면적 배열
  useEffect(() => {
    const temp = deals.reduce((accu, curr) => {
      const area = parseFloat(curr.AreaExclusive);
      if (accu.indexOf(area) === -1) accu.push(area);
      return accu.sort((a, b) => a - b);
    }, []);

    setAreasArray(temp);
  }, [deals]);

  // state: 면적별 거래건 정렬
  useEffect(() => {
    const temp = deals.filter(
      (deal) => parseFloat(deal.AreaExclusive) === thatArea
    );

    setDealsOfThatArea(temp);
  }, [deals, thatArea]);

  return (
    <AddressContext.Provider
      value={{
        province,
        setProvince,
        provinceString,
        setProvinceString,
        county,
        setCounty,
        countyString,
        setCountyString,
        complex,
        setComplex,
        complexString,
        setComplexString,
        chosenAddress,
        setChosenAddress,
        handleChange,
        complexGroupKey,
        selectedGroupKey,
        showThisGroupedComplex,
        chosenComplexGroup,
        deals,
        resultState,
        setResultState,
        areasArray,
        thatArea,
        setThatArea,
        dealsOfThatArea,
      }}
    >
      {props.children}
    </AddressContext.Provider>
  );
};

export { AddressContextProvier, AddressContext };
