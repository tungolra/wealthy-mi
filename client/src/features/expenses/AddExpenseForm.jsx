import { useCreateExpenseMutation } from "../api/expenseSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import PageContent from "../../components/page-content/PageContent";
import { Collapse } from "react-bootstrap";
import { useGetCategoriesQuery } from "../api/categorySlice";

function ExpenseForm() {
  const initialState = {
    vendor: "",
    category: "",
    posted: "",
    value: "",
  };
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const userId = localStorage.getItem("user");
  const [createExpense] = useCreateExpenseMutation();

  const {
    data: categories,
    isLoading, // optional conditional rendering if data is loading
    isSuccess, // use for conditional rendering if data retrieved successfully
    isError, //use for conditional rendering when error occurs
    error, // use to render error
  } = useGetCategoriesQuery(userId);

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

  const expenseBtn = (
    <a
      href="#"
      className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
      onClick={() => setOpen(!open)}
    >
      <i className="fa-solid fa-paperclip text-white-50"></i>&nbsp; Log Expense
    </a>
  );

  return (
    <PageContent>
      <div className="d-sm-flex align-items-center justify-content-between mb-1">
        <h1 className="h3 mb-0 text-gray-800">
          {open ? "Log an Expense" : ""}
        </h1>
        <div className="">{expenseBtn}</div>
      </div>
      <Collapse in={open}>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="container ">
            <div className="row">
              <input
                className="form-control col"
                placeholder="vendor"
                name="vendor"
                type="text"
                value={formData.vendor}
                onChange={handleChange}
              />
              <select
                id="categories"
                className="form-control col"
                placeholder="category"
                name="category"
                onChange={handleChange}
              >
                {!isLoading
                  ? categories
                    ? categories.map((category) => {
                      return (
                        <option
                          key={"selectCat-" + category}
                          className="bg-primary text-white border-1 rounded "
                          value={category}
                        >
                          {category}
                        </option>
                      );
                    })
                    : <></>
                  : <></>}
              </select>

              <input
                className="form-control col"
                form="form-control"
                name="posted"
                type="date"
                value={formData.posted}
                onChange={handleChange}
              />
              <input
                className="form-control col"
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
      </Collapse>
    </PageContent>
  );
}

export default ExpenseForm;
