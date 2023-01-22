import { useState } from "react";
import {
  useDeleteExpenseMutation,
  useGetExpensesQuery,
} from "../api/expenseSlice";
import EditExpenseForm from "./EditExpenseForm";
import DataTable from "react-data-table-component";
import CsvDownloadButton from "react-json-to-csv";

function ExpenseList({ userId }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [selectExpense, setSelectExpense] = useState(null);

  const {
    data: expenses,
    isLoading, // optional conditional rendering if data is loading
    isSuccess, // use for conditional rendering if data retrieved successfully
    isError, //use for conditional rendering when error occurs
    error, // use to render error
    refetch,
  } = useGetExpensesQuery(userId);

  const [deleteExpense] = useDeleteExpenseMutation();

  function handleDelete(id) {
    deleteExpense(id);
  }
  function convertToCSV() {
    const JSONToCSV = [];
    expenses?.forEach((e) => {
      const { vendor, category, value, posted } = e;
      let formatObj = {
        Merchant: vendor,
        Category: category,
        Date: posted.slice(0, 10),
        Amount: value,
      };
      JSONToCSV.push(formatObj);
    });
    return JSONToCSV;
  }
  function formatCurrency(val) {
    const CDN = { style: "currency", currency: "CAD" };
    const numberFormat = new Intl.NumberFormat("en-CA", CDN);
    return numberFormat.format(val);
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
      name: "Date",
      selector: (row) => row.posted?.slice(0, 10),
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => `${formatCurrency(row.value)}`,
      sortable: true,
    },
    {
      name: "",
      cell: (row) => {
        return <button onClick={() => handleDelete(row._id)}>Remove</button>;
      },
    },
    {
      name: "",
      cell: (row) => {
        return (
          <>
            <button
              onClick={() => {
                setOpenEdit(!openEdit);
                setSelectExpense(row);
              }}
            >
              Edit
            </button>
            {openEdit ? (
              <EditExpenseForm
                expense={selectExpense}
                setOpenEdit={setOpenEdit}
                openEdit={openEdit}
              />
            ) : null}
          </>
        );
      },
    },
  ];

  return (
    <div className="expenses-container">
      <h2>Expenses</h2>
      <CsvDownloadButton data={convertToCSV()} />
      <button onClick={refetch}> Refresh </button>
      <DataTable columns={columns} data={expenses} />
    </div>
  );
}

export default ExpenseList;
