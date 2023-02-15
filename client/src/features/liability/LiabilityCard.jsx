import { useEffect } from "react";
import {
  useCreateLiabilityMutation,
  useDeleteLiabilityMutation,
  useGetLiabilitiesQuery,
} from "../api/liabilitySlice";
import { useState } from "react";
import EditLiabilityModal from "./EditLiability";

function LiabilityCard(props) {
  const initialState = {
    name: "",
    value: 0,
    interest: 0,
  };

  const { balanceCount } = props;
  const userId = localStorage.getItem("user");
  const [formData, setFormData] = useState(initialState);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedLiability, setSelectLiability] = useState(null);
  const [deleteLiability] = useDeleteLiabilityMutation();
  const [createLiability] = useCreateLiabilityMutation();
  const { data: liabilities, isLoading, isSuccess, isError, error, refetch } =
    useGetLiabilitiesQuery(userId);
  var totalLiabilities;
  var diffCount = 0;

  useEffect(() => {
    if (liabilities) {
      setSelectLiability(liabilities[0]);
    }
  }, []);

  if (liabilities) {
    totalLiabilities = liabilities.reduce(
      (acc, curr) => acc + curr.value,
      0,
    );
    diffCount = balanceCount - liabilities.length;
  } else {
    totalLiabilities = 1000;
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await createLiability(formData);
    } catch (error) {
      console.log(error);
    }
  }

  function handleDelete(id) {
    deleteLiability(id);
  }

  return (
    <>
      <div className="card shadow mx-1 my-3 my-lg-0 h-100">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Liabilities</h6>
        </div>
        <div className="card-body container">
          <div className="row">
            <div className="col-4 h5 text-dark">Title</div>
            <div className="col-4 h5 text-dark d-flex justify-content-end">
              <div className="me-5">
                Value
              </div>
            </div>
            <div className="col-4 h5 text-dark">Options</div>
          </div>
          {liabilities
            ? liabilities.map((liability, index) => (
              <div key={index}>
                <div className="row my-2">
                  <div className="col-4">
                    {liability.name}
                  </div>
                  <div className="col-4 d-flex justify-content-end">
                    <div className="me-5">
                      {liability.value.toLocaleString("en-us", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </div>
                  </div>
                  <div className="col-4">
                    <div
                      onClick={() => handleDelete(liability._id)}
                      className="btn btn-dark btn-sm mx-1"
                    >
                      Delete
                    </div>
                    <div
                      className="btn btn-warning btn-sm mx-1"
                      onClick={() => {
                        setSelectLiability(liabilities[index]);
                        setOpenEdit(!openEdit);
                      }}
                    >
                      Edit
                    </div>
                  </div>
                </div>

                {openEdit
                  ? (
                    <EditLiabilityModal
                      liability={selectedLiability}
                      setOpenEdit={setOpenEdit}
                    />
                  )
                  : null}
              </div>
            ))
            : <></>}

          {diffCount > 0
            ? Array.from({ length: diffCount }).map((_, index) => {
              return (
                <div
                  key={index}
                  classaname="row my-2"
                >
                  <div className="btn">&nbsp;</div>
                </div>
              );
            })
            : <></>}
          <div className="row text-dark border-bottom border-dark pt-2 mb-2">
            <div className="col-4">
              Total Assets
            </div>
            <div className="col-4 d-flex justify-content-end">
              <div className="me-5">
                {totalLiabilities.toLocaleString("en-us", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
            </div>
            <div className="col-4"></div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row h5 text-dark">Record a New Liability</div>
            <div className=" container">
              <div className="row">
                <input
                  className="form-control col"
                  placeholder="Liability Title"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                >
                </input>
                <input
                  className="form-control col"
                  placeholder="Value"
                  type="text"
                  name="value"
                  value={formData.value.toLocaleString("en-us", {
                    style: "currency",
                    currency: "USD",
                  })}
                  onChange={handleChange}
                >
                </input>
                <input
                  className="form-control text-dark col"
                  placeholder="annual returns"
                  type="text"
                  name="interest"
                  value={`${formData.interest} %`}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-success text-white btn-sm mx-1 col-auto"
                  type="submit"
                >
                  Add Record
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LiabilityCard;
