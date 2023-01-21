import { useState } from "react";
import {
  useDeleteExpenseMutation,
  useGetExpensesQuery,
} from "../api/expenseSlice";
import EditExpenseForm from "./EditExpenseForm";
import DataTable, { createTheme } from "react-data-table-component";
import "./ExpenseTable.css";

function ExpenseList({ userId }) {
  const [openEdit, setOpenEdit] = useState(false);
  const {
    data: expenses,
    isLoading, // optional conditional rendering if data is loading
    isSuccess, // use for conditional rendering if data retrieved successfully
    isError, //use for conditional rendering when error occurs
    error, // use to render error
  } = useGetExpensesQuery(userId);

  const [deleteExpense] = useDeleteExpenseMutation();

  function handleDelete(id) {
    deleteExpense(id);
  }

  const columns = [
    {
      name: "Merchant",
      selector: (row) => row.vendor,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      "name": "Date",
      selector: (row) => row.posted.slice(0, 10),
      sortable: true,
    },
    {
      "name": "",
      name: "Amount",
      selector: (row) => `$${row.value}`,
      sortable: true,
    },
    {
      name: "Options",
      cell: (row) => {
        return (
          <div className="container justify-content-center">
            <button
              className="row-col btn btn-danger text-white btn-sm my-1"
              onClick={() => handleDelete(row._id)}
            >
              Remove
            </button>
            <button
              className="row-col btn btn-warning btn-sm my-1"
              onClick={() => setOpenEdit(!openEdit)}
            >
              &nbsp;&nbsp;&nbsp;Edit&nbsp;&nbsp;&nbsp;&nbsp;
            </button>
            {openEdit
              ? (
                <EditExpenseForm
                  expense={row}
                  setOpenEdit={setOpenEdit}
                  openEdit={openEdit}
                />
              )
              : null}
          </div>
        );
      },
    },
  ];

  const customTableStyles = {
    headCells: {
      style: {
        color: "var(--bs-white)",
        fontSize: "1rem",
        background: "var(--bs-dark)",
        // border: "1rem var(--bs-primary) solid",
        borderRadius: "0.5rem",
      },
    },
  };

  const expenseTableTheme = {
    text: {},
  };
  createTheme("expenseTable", expenseTableTheme);

  return (
    <div className="expenses-container">
      <DataTable
        columns={columns}
        data={expenses}
        customStyles={customTableStyles}
      />
      {
        /* <table>
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Category</th>
            <th>Transaction Date</th>
            <th>Amount</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {expenses?.map((expense, idx) => (
            <tr key={idx}>
              <th>{expense?.vendor}</th>
              <th>{expense?.category}</th>
              <th>{expense?.posted.slice(0, 10)}</th>
              <th>${expense?.value}</th>
              <th>
                <button onClick={() => handleDelete(expense._id)}>
                  Delete
                </button>
              </th>
              <th>
                <button onClick={() => setOpenEdit(!openEdit)}>Edit</button>
              </th>

              {openEdit ? <EditExpenseForm expense={expense} /> : null}
            </tr>
          ))}
        </tbody>
      </table> */
      }
    </div>
  );
}

export default ExpenseList;
