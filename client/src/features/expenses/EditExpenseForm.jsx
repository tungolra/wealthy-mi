import { useState } from "react";
import { useUpdateExpenseMutation } from "../api/expenseSlice";

export default function EditExpenseForm({ expense, setOpenEdit }) {
  const [formData, setFormData] = useState({
    id: expense._id,
    vendor: expense.vendor,
    category: expense.category,
    posted: expense.posted,
    value: expense.value,
  });
  
  const [updateExpense] = useUpdateExpenseMutation();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateExpense(formData);
      setOpenEdit(false);
    } catch (error) {
      console.log(error);
    }
  }

  const EditModalStyling = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div
      style={EditModalStyling}
      className=" bg-dark border border-dark rounded-2"
    >
      <form onSubmit={handleSubmit} className="py-3 px-5">
        <div className="container ">
          <div className="row">
            <input
              className="form-control col text-dark"
              name="vendor"
              type="text"
              value={formData.vendor}
              onChange={handleChange}
            />
            <input
              className="form-control col text-dark"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
            />
            <input
              className="form-control col text-dark"
              form="form-control"
              type="date"
              name="posted"
              value={formData.posted.slice(0, 10)}
              onChange={handleChange}
            />
            <input
              className="form-control col text-dark"
              placeholder="amount"
              name="value"
              type="text"
              min="0"
              step="0.01"
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
    </div>
  );
}
