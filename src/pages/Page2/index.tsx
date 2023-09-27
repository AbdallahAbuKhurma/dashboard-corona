import { useState, useEffect } from "react";
import VerticalBarChart from "../../components/VerticalBarChart";
import Button from "../../base-components/Button";
import TomSelect from "../../base-components/TomSelect";
import { getAllStates, getStatesData } from "../../services/covidServices";

function Main() {
  const [selectFirst, setSelectFirst] = useState("");
  const [selectSecond, setSelectSecond] = useState("");
  const [states, setStates] = useState<any>([]);
  const [stateData, setStateData] = useState<any>([]);
  const [stateData2, setStateData2] = useState<any>([]);

  useEffect(() => {
    getAllStates().then((res) => {
      const states = res.map((item: any) => item.state);
      const uniqueStates = [...new Set(states)];
      setStates(uniqueStates);
    });
  }, []);

  useEffect(() => {
    if (selectFirst) {
      getStatesData(selectFirst.toLowerCase()).then((res) => {
        setStateData(res);
      });
    }
  }, [selectFirst]);

  useEffect(() => {
    if (selectSecond) {
      getStatesData(selectSecond.toLowerCase()).then((res) => {
        setStateData2(res);
      });
    }
  }, [selectSecond]);

  // sum of all positive cases in a state
  const sumPositiveCases = (data: any) => {
    return data.reduce((acc: any, item: any) => acc + item.positive, 0);
  };

  // sum of all negative cases in a state
  const sumNegativeCases = (data: any) => {
    return data.reduce((acc: any, item: any) => acc + item.negative, 0);
  };

  // sum of all deaths in a state
  const sumDeaths = (data: any) => {
    return data.reduce((acc: any, item: any) => acc + item.death, 0);
  };

  // sum of all total test in a state
  const sumTotalTest = (data: any) => {
    return data.reduce((acc: any, item: any) => acc + item.totalTestResults, 0);
  };

  // sum of all current hospitalizations in a state
  const sumHospitalizations = (data: any) => {
    return data.reduce(
      (acc: any, item: any) => acc + item.hospitalizedCurrently,
      0
    );
  };

  // sum of all in icu in a state
  const sumInIcu = (data: any) => {
    return data.reduce((acc: any, item: any) => acc + item.inIcuCurrently, 0);
  };

  // sum of all on ventilator in a state
  const sumOnVentilator = (data: any) => {
    return data.reduce(
      (acc: any, item: any) => acc + item.onVentilatorCurrently,
      0
    );
  };

  return (
    <>
      <div className="flex flex-col mt-5 intro-y box lg:flex-row">
        <div className="flex-1 px-5 py-16 intro-y">
          <div className="flex items-center intro-y">
            <h2 className="mr-auto text-lg font-medium">
              Compare Data by Selecting States
            </h2>
          </div>
          <div className="px-10 mx-auto mt-20 text-center text-slate-500">
            <TomSelect
              value={selectFirst}
              onChange={setSelectFirst}
              options={{
                placeholder: "Select First State ...",
              }}
              className="w-full"
            >
              {states?.map((item: any) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </TomSelect>
          </div>
          <div className="px-10 mx-auto mt-2 text-center text-slate-500">
            <TomSelect
              value={selectSecond}
              onChange={setSelectSecond}
              options={{
                placeholder: "Select Second State ...",
              }}
              className="w-full"
            >
              {states?.map((item: any) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </TomSelect>
          </div>
          <Button
            variant="primary"
            rounded
            type="button"
            className="block px-4 py-3 mx-auto mt-8"
          >
            Compare
          </Button>
        </div>
        <div className="flex-1 p-5 py-16 border-t border-b intro-y lg:border-b-0 lg:border-t-0 lg:border-l lg:border-r border-slate-200/60 dark:border-darkmode-400">
          <div className="mt-10 text-xl font-medium text-center">
            {selectFirst}
          </div>
          <div className="mt-5 text-center text-slate-600 dark:text-slate-500">
            {sumTotalTest(stateData)} Total Tests{" "}
            <span className="mx-1">•</span>
          </div>
          <div className="mt-5 text-center text-slate-600 dark:text-slate-500">
            {sumPositiveCases(stateData)} Positive Cases{" "}
            <span className="mx-1">•</span>
          </div>
          <div className="mt-5 text-center text-slate-600 dark:text-slate-500">
            {sumNegativeCases(stateData)} Nigative Cases{" "}
            <span className="mx-1">•</span>
          </div>
          <div className="mt-5 text-center text-slate-600 dark:text-slate-500">
            {sumHospitalizations(stateData)} Current Hospitalizations{" "}
            <span className="mx-1">•</span>
          </div>
          <div className="mt-5 text-center text-slate-600 dark:text-slate-500">
            {sumInIcu(stateData)} In ICU <span className="mx-1">•</span>
          </div>
          <div className="mt-5 text-center text-slate-600 dark:text-slate-500">
            {sumOnVentilator(stateData)} On Ventilator{" "}
            <span className="mx-1">•</span>
          </div>
          <div className="mt-5 text-center text-slate-600 dark:text-slate-500">
            {sumDeaths(stateData)} Deaths <span className="mx-1">•</span>
          </div>
          <div className="px-10 mx-auto mt-2 text-center text-slate-500">
            Data is based on the latest available data from the CDC.
          </div>
        </div>
        <div className="flex-1 p-5 py-16 border-t border-b intro-y lg:border-b-0 lg:border-t-0 lg:border-l lg:border-r border-slate-200/60 dark:border-darkmode-400">
          <div className="mt-10 text-xl font-medium text-center">
            {selectSecond}
          </div>
          <div className="mt-5 text-center text-slate-600 dark:text-slate-500">
            {sumTotalTest(stateData2)} Total Tests{" "}
            <span className="mx-1">•</span>
          </div>
          <div className="mt-5 text-center text-slate-600 dark:text-slate-500">
            {sumPositiveCases(stateData2)} Positive Cases{" "}
            <span className="mx-1">•</span>
          </div>
          <div className="mt-5 text-center text-slate-600 dark:text-slate-500">
            {sumNegativeCases(stateData2)} Nigative Cases{" "}
            <span className="mx-1">•</span>
          </div>
          <div className="mt-5 text-center text-slate-600 dark:text-slate-500">
            {sumHospitalizations(stateData2)} Current Hospitalizations{" "}
            <span className="mx-1">•</span>
          </div>
          <div className="mt-5 text-center text-slate-600 dark:text-slate-500">
            {sumInIcu(stateData2)} In ICU <span className="mx-1">•</span>
          </div>
          <div className="mt-5 text-center text-slate-600 dark:text-slate-500">
            {sumOnVentilator(stateData2)} On Ventilator{" "}
            <span className="mx-1">•</span>
          </div>
          <div className="mt-5 text-center text-slate-600 dark:text-slate-500">
            {sumDeaths(stateData2)} Deaths <span className="mx-1">•</span>
          </div>
          <div className="px-10 mx-auto mt-2 text-center text-slate-500">
            Data is based on the latest available data from the CDC.
          </div>
        </div>
        <div className="flex-1 p-5 py-16 border-t border-b intro-y lg:border-b-0 lg:border-t-0 lg:border-l lg:border-r border-slate-200/60 dark:border-darkmode-400">
          {selectFirst && selectFirst && (
            <div className="mt-10 text-xl font-medium text-center">
              Difference
            </div>
          )}
          <div className="mt-5 text-center text-slate-600 dark:text-slate-500">
            {sumTotalTest(stateData2) - sumTotalTest(stateData)} Total Tests{" "}
            <span className="mx-1">•</span>
          </div>
          <div className="mt-5 text-center text-slate-600 dark:text-slate-500">
            {sumPositiveCases(stateData2) - sumPositiveCases(stateData)}{" "}
            Positive Cases <span className="mx-1">•</span>
          </div>
          <div className="mt-5 text-center text-slate-600 dark:text-slate-500">
            {sumNegativeCases(stateData2) - sumNegativeCases(stateData)}{" "}
            Nigative Cases <span className="mx-1">•</span>
          </div>
          <div className="mt-5 text-center text-slate-600 dark:text-slate-500">
            {sumHospitalizations(stateData2) - sumHospitalizations(stateData)}{" "}
            Current Hospitalizations <span className="mx-1">•</span>
          </div>
          <div className="mt-5 text-center text-slate-600 dark:text-slate-500">
            {sumInIcu(stateData2) - sumInIcu(stateData)} In ICU{" "}
            <span className="mx-1">•</span>
          </div>
          <div className="mt-5 text-center text-slate-600 dark:text-slate-500">
            {sumOnVentilator(stateData2) - sumOnVentilator(stateData)} On
            Ventilator <span className="mx-1">•</span>
          </div>
          <div className="mt-5 text-center text-slate-600 dark:text-slate-500">
            {sumDeaths(stateData2) - sumDeaths(stateData)} Deaths{" "}
            <span className="mx-1">•</span>
          </div>
          <div className="px-10 mx-auto mt-2 text-center text-slate-500">
            Data is based on the latest available data from the CDC.
          </div>
        </div>
      </div>
      <div className="p-5 mt-5 intro-y box">
        <div className="flex items-center intro-y">
          <h2 className="mr-auto text-lg font-medium">2020 Statistics</h2>
        </div>
        <VerticalBarChart height={450} />
      </div>
    </>
  );
}

export default Main;
