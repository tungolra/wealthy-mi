function SummaryCard({ variant, title, value }) {
  var value = Number(value).toLocaleString("en-us");

  return (
    <div className="col-xl-3 col-md-6 col-mb-4">
      <div className={`card border-left-${variant} shadow h-100 py-2`}>
        <div className="card-body">
          <div className="row nho-gutters align-items-center">
            <div className="col mr-2">
              <div
                className={`text-xs font-weight-bold text-${variant} text-uppercase mb-1`}
              >
                {title}
              </div>

              <div className="h5 mb-0 font-weight-bold text-gray-800">
                $ {value}
              </div>
              <div class="col auto">
                <i className="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
