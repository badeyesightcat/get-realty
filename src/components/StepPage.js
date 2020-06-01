import React from "react";
import { Switch, Route } from "react-router-dom";
import ProvinceStep from "./ProvinceStep";
import CountyStep from "./CountyStep";
import ComplexStep from "./ComplexStep";
import DealsTable from "./DealsTable";
import MapBox from "./MapBox";

function StepPage(props) {
  return (
    <div className="realty-input">
      <Switch>
        <Route exact path="/">
          <ProvinceStep />
        </Route>
        <Route path="/countyStep">
          <CountyStep />
        </Route>
        <Route path="/complexStep">
          <ComplexStep />
        </Route>
        <Route path="/dealsTable">
          <DealsTable />
          <MapBox />
        </Route>
      </Switch>
    </div>
  );
}

export default StepPage;
