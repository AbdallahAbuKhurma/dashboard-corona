import Chart from "../../base-components/Chart";
import { ChartData, ChartOptions } from "chart.js/auto";
import { getColor } from "../../utils/colors";
import { useMemo, useState, useEffect } from "react";
import { getAllStatesData } from "../../services/covidServices";

interface MainProps extends React.ComponentPropsWithoutRef<"canvas"> {
  width: number;
  height: number;
}

function Main(props: MainProps) {
  const [allStatesData, setAllStatesData] = useState<any>([]);

  useEffect(() => {
    getAllStatesData().then((res) => {
      setAllStatesData(res);
    });
  }, []);

  const dataFor2020 = useMemo(() => {
    const data = allStatesData.filter((item: any) => {
      const date = item.date.toString().substring(0, 4);
      return date === "2020";
    });
    // sum up all the values for each month of 2020 and remove duplicate months
    const dataByMonth = data.reduce((acc: any, item: any) => {
      const month = item.date.toString().substring(5, 7);
      if (!acc[month]) {
        acc[month] = {
          date: item.date,
          totalTestResultsIncrease: item.totalTestResultsIncrease,
          positiveIncrease: item.positiveIncrease,
          negativeIncrease: item.negativeIncrease,
          deathIncrease: item.deathIncrease,
        };
      } else {
        acc[month].totalTestResultsIncrease += item.totalTestResultsIncrease;
        acc[month].positiveIncrease += item.positiveIncrease;
        acc[month].negativeIncrease += item.negativeIncrease;
        acc[month].deathIncrease += item.deathIncrease;
      }
      return acc;
    }, {});
    return dataByMonth;
  }, [allStatesData]);

  const totalTest = Object.values(dataFor2020).map((item: any) => {
    return item.totalTestResultsIncrease;
  });

  const positiveCases = Object.values(dataFor2020).map((item: any) => {
    return item.positiveIncrease;
  });

  const negativeCases = Object.values(dataFor2020).map((item: any) => {
    return item.negativeIncrease;
  });

  const deaths = Object.values(dataFor2020).map((item: any) => {
    return item.deathIncrease;
  });

  const data: ChartData = useMemo(() => {
    return {
      labels: [
        "Jan 2020",
        "Feb 2020",
        "Mar 2020",
        "Apr 2020",
        "May 2020",
        "Jun 2020",
        "Jul 2020",
        "Aug 2020",
        "Sep 2020",
        "Oct 2020",
        "Nov 2020",
        "Dec 2020",
      ],
      datasets: [
        {
          label: "Total Tests",
          barPercentage: 0.5,
          barThickness: 12,
          maxBarThickness: 10,
          minBarLength: 2,
          data: totalTest.slice(0, 12),
          backgroundColor: getColor("primary"),
        },
        {
          label: "Positive Cases",
          barPercentage: 0.5,
          barThickness: 12,
          maxBarThickness: 10,
          minBarLength: 50,
          data: positiveCases.slice(0, 12),
          backgroundColor: getColor("warning"),
        },
        {
          label: "Negative Cases",
          barPercentage: 0.5,
          barThickness: 12,
          maxBarThickness: 10,
          minBarLength: 70,
          data: negativeCases.slice(0, 12),
          backgroundColor: getColor("success"),
        },
        {
          label: "Deaths",
          barPercentage: 0.5,
          barThickness: 12,
          maxBarThickness: 10,
          minBarLength: 40,
          data: deaths.slice(0, 12),
          backgroundColor: getColor("danger"),
        },
      ],
    };
  }, [totalTest, positiveCases, negativeCases, deaths]);

  const options: ChartOptions = useMemo(() => {
    return {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: getColor("slate.500", 0.8),
          },
        },
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 12,
            },
            color: getColor("slate.500", 0.8),
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            font: {
              size: 12,
            },
            color: getColor("slate.500", 0.8),
            callback: function (value) {
              return value;
            },
          },
          grid: {
            color: getColor("slate.300"),
            borderDash: [2, 2],
            drawBorder: false,
          },
        },
      },
    };
  }, []);

  return (
    <Chart
      type="bar"
      width={props.width}
      height={props.height}
      data={data}
      options={options}
      className={props.className}
    />
  );
}

Main.defaultProps = {
  width: "auto",
  height: "auto",
  className: "",
};

export default Main;
