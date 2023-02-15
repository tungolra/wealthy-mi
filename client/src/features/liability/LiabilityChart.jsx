import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { useGetLiabilitiesQuery } from "../api/liabilitySlice";

function AssetPieChart() {
  Chart.register(ArcElement, Tooltip, Legend);
  const labels = [];
  const dataset = [];
  const userId = localStorage.getItem("user");
  const { data: liabilities, isLoading, isSuccess, isError, error, refetch } =
    useGetLiabilitiesQuery(userId);

  var sumLiabilities = 0;

  if (liabilities) {
    sumLiabilities = liabilities.reduce((acc, curr) => acc + curr.value, 0);
    liabilities.forEach((liability) => {
      labels.push(liability.name);
      dataset.push(liability.value / sumLiabilities * 100);
    });
  }

  const colorMap = [
    "#4e73df",
    "#e83e8c",
    "#fd7e14",
    "#6f42c1",
    "#f6c23e",
    "#1cc88a",
    "#e74a3b",
    "#6610f2",
    "#20c9a6",
    "#36b9cc",
  ];

  const data = {
    updateMode: "resize",
    labels: labels,
    datasets: [{
      label: "Asset Breakdown",
      data: dataset,
      borderWidth: 4,
      backgroundColor: colorMap,
    }],
  };

  return (
    <div className="col-lg-6">
      <div className="card shadow mx-1 my-3 my-lg-0 h-100">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Assets Breakdown
          </h6>
        </div>
        <div className="card-body container">
          <Doughnut data={data} />
        </div>
      </div>
    </div>
  );
}

export default AssetPieChart;
