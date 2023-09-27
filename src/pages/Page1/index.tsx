import { useState, useEffect } from "react";
import clsx from "clsx";
import { Tab } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import {
  getAllStatesData,
  getAllStates,
  getStatesData,
} from "../../services/covidServices";
import TomSelect from "../../base-components/TomSelect";
import Button from "../../base-components/Button";
import { Pagination } from "@mui/material";

function Main() {
  const [allStatesData, setAllStatesData] = useState<any>([]);
  const [states, setStates] = useState<any>([]);
  const [select, setSelect] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const dataPerPage = allStatesData.slice((page - 1) * limit, page * limit);

  console.log("dataPerPage", dataPerPage);

  const handlePageChange = (event: any, value: any) => {
    setPage(value);
  };

  useEffect(() => {
    getAllStates().then((res) => {
      const states = res.map((item: any) => item.state);
      const uniqueStates = [...new Set(states)];
      setStates(uniqueStates);
    });
    getAllStatesData().then((res) => {
      setAllStatesData(res);
      setTotalPage(Math.ceil(res.length / limit));
    });
  }, []);

  useEffect(() => {
    if (select) {
      getStatesData(select.toLowerCase()).then((res) => {
        setAllStatesData(res);
        setTotalPage(Math.ceil(res.length / limit));
      });
    }
  }, [select]);

  const handleSortColumn = (columnName: string, order: string) => {
    const sortedData = [...allStatesData];
    if (order === "asc") {
      sortedData.sort((a: any, b: any) =>
        a[columnName] > b[columnName] ? 1 : -1
      );
    } else {
      sortedData.sort((a: any, b: any) =>
        a[columnName] < b[columnName] ? 1 : -1
      );
    }
    setAllStatesData(sortedData);
  };

  const sortTsx = (columnName: string) => {
    return (
      <>
        <span
          className="cursor-pointer pl-2"
          onClick={() => handleSortColumn(columnName, "asc")}
        >
          &#9650;
        </span>
        <span
          className="cursor-pointer"
          onClick={() => handleSortColumn(columnName, "desc")}
        >
          &#9660;
        </span>
      </>
    );
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-5 mt-5 intro-y">
        <Tab.Group className="col-span-12">
          <Tab.Panels>
            <Tab.Panel>
              <div className="mt-5 intro-y box">
                <div className="grid grid-cols-12 gap-4 m-2">
                  <div className="mt-2 col-span-4">
                    <TomSelect
                      value={select}
                      onChange={setSelect}
                      options={{
                        placeholder: "Select State ...",
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
                    onClick={() => {
                      setSelect("");
                      getAllStatesData().then((res) => {
                        setAllStatesData(res);
                      });
                    }}
                    variant="primary"
                    className="m-2 col-span-2"
                  >
                    All States
                  </Button>
                </div>
                <div className="overflow-x-auto sm:overflow-x-visible">
                  <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
                    <Table className="border-spacing-y-[10px] border-separate -mt-2">
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th className="border-b-0 whitespace-nowrap">
                            Date
                            {sortTsx("date")}
                          </Table.Th>
                          <Table.Th className="border-b-0 whitespace-nowrap">
                            State
                          </Table.Th>
                          <Table.Th className=" border-b-0 whitespace-nowrap">
                            Total Test Results
                            {sortTsx("totalTestResults")}
                          </Table.Th>
                          <Table.Th className="border-b-0 whitespace-nowrap">
                            Positive
                            {sortTsx("positive")}
                          </Table.Th>
                          <Table.Th className="border-b-0 whitespace-nowrap">
                            Negative
                            {sortTsx("negative")}
                          </Table.Th>
                          <Table.Th className="border-b-0 whitespace-nowrap">
                            Current Hospitalizations
                            {sortTsx("hospitalizedCurrently")}
                          </Table.Th>
                          <Table.Th className="border-b-0 whitespace-nowrap">
                            In ICU
                            {sortTsx("inIcuCurrently")}
                          </Table.Th>
                          <Table.Th className="border-b-0 whitespace-nowrap">
                            On Ventilator
                            {sortTsx("onVentilatorCurrently")}
                          </Table.Th>
                          <Table.Th className="border-b-0 whitespace-nowrap">
                            Death
                            {sortTsx("death")}
                          </Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {dataPerPage?.map((item: any, idx: number) => (
                          <Table.Tr
                            key={idx}
                            className={clsx([
                              "transition duration-200 ease-in-out transform cursor-pointer border-b ",
                              "hover:scale-[1.02] hover:shadow-md hover:border-0 hover:rounded",
                            ])}
                          >
                            <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                              {item.date.toString().slice(0, 4) +
                                "-" +
                                item.date.toString().slice(4, 6) +
                                "-" +
                                item.date.toString().slice(6, 8)}
                            </Table.Td>
                            <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                              {item.state || `All ${item.states} States`}
                            </Table.Td>
                            <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                              {item.totalTestResults
                                ? item.totalTestResults
                                : 0}
                            </Table.Td>
                            <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                              {item.positive ? item.positive : 0}
                            </Table.Td>
                            <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                              {item.negative ? item.negative : 0}
                            </Table.Td>
                            <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                              {item.hospitalizedCurrently
                                ? item.hospitalizedCurrently
                                : 0}
                            </Table.Td>
                            <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                              {item.inIcuCurrently ? item.inIcuCurrently : 0}
                            </Table.Td>
                            <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                              {item.onVentilatorCurrently
                                ? item.onVentilatorCurrently
                                : 0}
                            </Table.Td>
                            <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                              {item.death ? item.death : 0}
                            </Table.Td>
                          </Table.Tr>
                        ))}
                      </Table.Tbody>
                    </Table>
                    <Table.Td>
                      <div className="justify-center flex items-center mt-2">
                        <Pagination
                          count={totalPage}
                          page={page}
                          color="primary"
                          variant="outlined"
                          shape="rounded"
                          siblingCount={0}
                          boundaryCount={2}
                          onChange={handlePageChange}
                        />
                      </div>
                    </Table.Td>
                  </div>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
}

export default Main;
