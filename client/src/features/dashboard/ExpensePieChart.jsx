import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart } from "chart.js";

function ExpensePieChartCard({ sumExp }) {
  Chart.register(ArcElement);
  const labels = [];
  const dataset = [];
  var totalCost = 0;
  sumExp.forEach((exp) => {
    labels.push(exp[0]);
    dataset.push(exp[1]);
    totalCost += exp[1];
  });

  sumExp.forEach((exp) => exp.push(Math.floor(100 * exp[1] / totalCost)));

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
    labels: {},
    datasets: [{
      label: "Expense Breakdown",
      data: dataset,
      borderWidth: 4,
      backgroundColor: colorMap,
    }],
  };

  return (
    <div className="col-lg-6">
      <div className="card shadow mx-1 my-3 my-lg-0 ">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Expenses Summary
          </h6>
        </div>
        <div className="card-body container">
          <div className="row">
            <div className="col-md-6">
              <Doughnut data={data} />
            </div>
            <div className="col-md-6 ">
              {sumExp.slice(0, 10).map((exp, index) => {
                return (
                  <>
                    <div className="d-flex">
                      <div
                        className="me-auto"
                        style={{ color: `${colorMap[index]}` }}
                      >
                        {exp[0].slice()}
                      </div>
                      <div className="" style={{ color: `${colorMap[index]}` }}>
                        {exp[2]}%
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpensePieChartCard;
