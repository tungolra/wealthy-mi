import { useCreateExpenseMutation } from "../api/expenseSlice";
import { useState } from "react";
import PageContent from "../../components/page-content/PageContent";
import PageHeader from "../../components/page-content/PageHeader";
import { Collapse } from "react-bootstrap";

function ExpenseForm() {
  const initialState = {
    vendor: "",
    category: "",
    posted: "",
    value: "",
  };
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [createExpense] = useCreateExpenseMutation();

  const expenseBtn = (
    <a
      href="#"
      class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
      onClick={() => setOpen(!open)}
    >
      <i class="fa-solid fa-paperclip text-white-50"></i> Log Expenses
    </a>
  );

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createExpense(formData);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <PageContent>
      <PageHeader title="" actions={expenseBtn} />
      <Collapse in={open}>
        <div className="expense-form">
          <form onSubmit={handleSubmit}>
            <label>Vendor</label>
            <input
              name="vendor"
              type="text"
              value={formData.vendor}
              onChange={handleChange}
            />
            <label>Category</label>
            <input
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
            />
            <label>Transaction Date</label>
            <input
              name="posted"
              type="date"
              value={formData.posted}
              onChange={handleChange}
            />
            <label>Amount</label>
            <input
              name="value"
              type="number"
              min="0"
              step="0.01"
              value={formData.value}
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </Collapse>
    </PageContent>
  );
}

export default ExpenseForm;
