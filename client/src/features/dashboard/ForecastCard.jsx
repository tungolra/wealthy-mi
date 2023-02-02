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
  { foreCastLength, assets, liabilities, netIncome, rateAdjust = 0 },
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

  function calcBalanceSheet(item, iterNum) {
    return item.value * (1 + (item.interest - rateAdjust) / 12) ** (iterNum);
  }
  //networth Funct
  function calcNetWorth(iterNum) {
    // total asset Growth
    // total liability growth
    var assetGrowth = assets.reduce(
      (acc, asset) => acc + calcBalanceSheet(asset, iterNum),
      0,
    );
    var liabilityGrowth = liabilities.reduce(
      (acc, liab) => acc + calcBalanceSheet(liab, iterNum),
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
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            My Financial Forecast
          </h6>
        </div>
        <div className="card-body">
          <Line options={chartOptions} data={data} />
        </div>
      </div>
    </div>
  );
}

export default ForecastCard;
