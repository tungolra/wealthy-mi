function BalanceSheetCard({ assets, liabilities, foreCastLength }) {
  function calcReturns(item) {
    if (!item.interest) {
      var rate = 7;
    } else {
      var rate = item.interest;
    }
    return item.value * rate / 100 * foreCastLength / 12;
  }

  function BalanceSheetLine(item) {
    let val = calcReturns(item);
    let sign = val < 0 ? "- " : "+ ";
    val = sign +
      val.toLocaleString("en-us", { style: "currency", currency: "USD" });
    return (
      <div className="d-flex">
        <div className="me-auto">{item.name}</div>
        <div className="">
          {val}
        </div>
      </div>
    );
  }

  return (
    <div className="col-lg-4">
      <div className="card shadow mx-1 my-3 my-lg-0 ">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            BalanceSheet
          </h6>
        </div>
        <div className="card-body container">
          <div className="text-success">
            {assets.map((asset) => BalanceSheetLine(asset))}
          </div>
          <div className="text-danger">
            {liabilities.map((liab) => BalanceSheetLine(liab))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalanceSheetCard;
