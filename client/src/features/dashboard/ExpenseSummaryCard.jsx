import { useGetExpensesQuery } from "../api/expenseSlice";
import { useGetCategoriesQuery } from "../api/categorySlice";

function ExpenseSummaryCard({ sumExp }) {
  function ExpenseLine({ variant, value }) {
    return (
      <>
        <div className="d-flex">
          <div className="me-auto">
            {variant}
          </div>
          <div className="">
            {Number(value).toLocaleString("en-us", {
              style: "currency",
              currency: "USD",
            })}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="col-lg-6">
      <div className="card shadow mx-1 my-3 my-lg-0 ">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Expenses Summary
          </h6>
        </div>
        <div className="card-body container">
          <div className="d-flex mb-1 text-dark">
            <div className="me-auto ">
              <u>Category</u>
            </div>
            <div className="">
              <u>Total Spending</u>
            </div>
          </div>
          {sumExp.slice().map((exp, index) => {
            return <ExpenseLine variant={exp[0]} value={exp[1]} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default ExpenseSummaryCard;
