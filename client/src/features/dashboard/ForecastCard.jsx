import { getFutureValue } from "../../utils/growthFuncs";
import { Line } from "react-chartjs-2";
import { ArcElement, Chart } from "chart.js";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

function ForecastCard(
  {
    foreCastLength,
    assets,
    liabilities,
    netIncome,
    setForeCastLength,
    rateAdjust = 0,
  },
) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  );

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
    },
  };

  //networth Funct
  function calcNetWorth(monthNum) {
    // total asset Growth
    var assetGrowth = assets.reduce(
      (acc, asset) =>
        acc + getFutureValue(asset.value, monthNum, asset.interest),
      0,
    );
    // total liability growth
    var liabilityGrowth = liabilities.reduce(
      (acc, liab) => acc + getFutureValue(liab.value, monthNum, liab.interest),
      0,
    );

    return netIncome + assetGrowth - liabilityGrowth;
  }

  const chartLabels = [...Array(foreCastLength + 1).keys()];
  const dataset = chartLabels.map((label, index) => calcNetWorth(index));
  const data = {
    labels: chartLabels,
    datasets: [{
      data: dataset,
      borderColor: "#4e73d4",
      backgroundColor: "#4e73df",
    }],
  };

  return (
    <div className="col-lg-8">
      <div className="card shadow mx-1 my-lg-0 my-3 h-100">
        <div className="card-header py-3 d-flex">
          <h6 className="m-0 font-weight-bold text-primary me-auto">
            My Financial Forecast
          </h6>
          <div
            onClick={() => setForeCastLength(3)}
            className={"btn text-white mx-1" +
              (foreCastLength === 3 ? " btn-dark" : " btn-info")}
          >
            3 Month
          </div>
          <div
            className={"btn text-white mx-1" +
              (foreCastLength === 6 ? " btn-dark" : " btn-info")}
            onClick={() => setForeCastLength(6)}
          >
            6 Month
          </div>
          <div
            className={"btn text-white mx-1" +
              (foreCastLength === 12 ? " btn-dark" : " btn-info")}
            onClick={() => setForeCastLength(12)}
          >
            12 Month
          </div>
        </div>
        <div className="card-body">
          <Line options={chartOptions} data={data} />
        </div>
      </div>
    </div>
  );
}

export default ForecastCard;
