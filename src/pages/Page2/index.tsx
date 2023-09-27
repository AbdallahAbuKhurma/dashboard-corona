import VerticalBarChart from "../../components/VerticalBarChart";

function Main() {
  return (
    <>
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
