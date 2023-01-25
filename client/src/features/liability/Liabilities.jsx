import {
  useCreateLiabilityMutation,
  useDeleteLiabilityMutation,
  useGetLiabilitiesQuery,
} from "../api/liabilitySlice";
import { useState } from "react";
import EditLiability from "./EditLiability";

function Income() {
  const initialState = {
    name: "",
    value: 0,
  };

  const userId = localStorage.getItem("user");
  const [formData, setFormData] = useState(initialState);
  const [openEdit, setOpenEdit] = useState(false);
  const [createLiability] = useCreateLiabilityMutation();
  const [deleteLiability] = useDeleteLiabilityMutation();

  const { data: liabilities, isLoading, isSuccess, isError, error, refetch } =
    useGetLiabilitiesQuery(userId);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleDelete(id) {
    deleteLiability(id);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const resp = await createLiability(formData);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(liabilities);
  return (
    <>
      {isSuccess
        ? liabilities.map((liab) => {
          return (
            <>
              <div>
                <div>{liab.name}: {liab.value}</div>
                <div
                  onClick={() => handleDelete(liab._id)}
                  className="btn btn-dark btn-sm"
                >
                  Delete
                </div>
                <div
                  onClick={() => setOpenEdit(!openEdit)}
                  className="btn btn-warning btn-sm"
                >
                  Edit
                </div>
              </div>
              {openEdit
                ? <EditLiability liability={liab} setOpenEdit={setOpenEdit} />
                : null}
            </>
          );
        })
        : <></>}
      <p>This is liability</p>
      <form onSubmit={handleSubmit}>
        <div className="container">
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
              value={Number(formData.value)}
              onChange={handleChange}
            >
            </input>
            <button
              className="btn btn-success text-white btn-sm mx-1 col-auto"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Income;
