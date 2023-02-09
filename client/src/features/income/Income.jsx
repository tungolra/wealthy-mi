import {
  useCreateIncomeMutation,
  useDeleteIncomeMutation,
  useGetIncomeQuery,
} from "../api/incomeSlice";
import { useState } from "react";
import EditIncomeModal from "./EditIncome";

function Income() {
  const initialState = {
    period: 14,
    value: 0,
    name: "",
  };

  const userId = localStorage.getItem("user");
  const [createIncome] = useCreateIncomeMutation();
  const [formData, setFormData] = useState(initialState);
  const [deleteIncome] = useDeleteIncomeMutation();
  const [openEdit, setOpenEdit] = useState(false);
  const { data: incomes, isLoading, isSuccess, isError, error, refetch } =
    useGetIncomeQuery(userId);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createIncome(formData);
    } catch (error) {
      console.log(error);
    }
  }

  function handleDelete(id) {
    deleteIncome(id);
  }
  return (
    <>
      {incomes
        ? incomes.map((income, index) => (
          <div key={index}>
            <div>{income.name} {income.period} {income.value}</div>
            <div
              className="btn btn-dark"
              onClick={() => handleDelete(income._id)}
            >
              Delete
            </div>
            <div
              className="btn btn-warning"
              onClick={() => setOpenEdit(!openEdit)}
            >
              Edit
            </div>
            {openEdit
              ? (
                <EditIncomeModal
                  income={income}
                  setOpenEdit={setOpenEdit}
                  openEdit={openEdit}
                />
              )
              : null}
          </div>
        ))
        : <></>}
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="row">
            <input
              className="form-control col"
              placeholder="Income Source"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              className="form-control col"
              placeholder=""
              name="value"
              type="text"
              value={formData.value}
              onChange={handleChange}
            />
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
