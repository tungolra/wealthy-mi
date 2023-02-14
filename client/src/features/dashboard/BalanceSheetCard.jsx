function BalanceSheetCard({ assets, liabilities, foreCastLength }) {
  function calcReturns(item) {
    if (!item.interest) {
      var rate = 7;
    } else {
      var rate = item.interest;
    }
    return item.value * rate / 100 * foreCastLength / 12;
  }

  function BalanceSheetLine(item, index) {
    let val = calcReturns(item);
    let sign = val < 0 ? "- " : "+ ";
    val = sign +
      val.toLocaleString("en-us", { style: "currency", currency: "USD" });
    return (
      <div key={index} className="d-flex">
        <div className="me-auto">{item.name}</div>
        <div className="">
          {val}
        </div>
      </div>
    );
  }

  const net = assets.map((asset) => calcReturns(asset)).reduce(
    (acc, next) => acc + next,
    0,
  ) + liabilities.map((liab) =>
    calcReturns(liab)
  ).reduce((acc, next) => acc + next, 0);

  return (
    <div className="col-lg-4 ">
      <div className="card shadow mx-1 my-3 my-lg-0 h-100 ">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            BalanceSheet
          </h6>
        </div>
        <div className="card-body container">
          <div className="text-success">
            {assets.map((asset, index) => BalanceSheetLine(asset, index))}
          </div>
          <div className="text-danger">
            {liabilities.map((liab, index) => BalanceSheetLine(liab, index))}
          </div>
          <br />
          <div className="text-dark d-flex border-bottom border-dark">
            <div className="me-auto">Net</div>
            <div className="">
              {net.toLocaleString("en-us", {
                style: "currency",
                currency: "USD",
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalanceSheetCard;
