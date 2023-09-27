import axios from "axios";

export const getAllStates = async () => {
  const { data } = await axios.get(
    "https://api.covidtracking.com/v1/states/daily.json"
  );
  return data;
};

export const getAllStatesData = async () => {
  const { data } = await axios.get(
    "https://api.covidtracking.com/v1/us/daily.json"
  );
  return data;
};

export const getStatesData = async (state: string) => {
  const { data } = await axios.get(
    `https://api.covidtracking.com/v1/states/${state}/daily.json`
  );
  return data;
};
