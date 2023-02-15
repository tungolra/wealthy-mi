import { useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import PageContent from "../../components/page-content/PageContent";
import { useGetExpensesQuery } from "../api/expenseSlice";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetCategoriesQuery,
} from "../api/categorySlice";

function EditCategory({ setOpenEdit, categoryName }) {
  const [changeCategoryName, setChangeCategoryName] = useState([]);
  const userId = localStorage.getItem("user");
  const [editCategory] = useEditCategoryMutation();

  const { refetch } = useGetExpensesQuery(userId);

  async function updateCategory(e) {
    e.preventDefault();
    try {
      editCategory({ name: changeCategoryName, former: categoryName });
      setOpenEdit(false);
      refetch();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={updateCategory}>
        <input
          placeholder={categoryName}
          type="text"
          name="name"
          value={changeCategoryName}
          onChange={(e) => setChangeCategoryName(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

function AddCategory() {
  const userId = localStorage.getItem("user");
  const {
    data: categories,
    isLoading, // optional conditional rendering if data is loading
    isSuccess, // use for conditional rendering if data retrieved successfully
    isError, //use for conditional rendering when error occurs
    error, // use to render error
  } = useGetCategoriesQuery(userId);
  const [newCategory, setNewCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [editCategory, setEditCategory] = useState();
  const [openEdit, setOpenEdit] = useState(false);

  // console.log(editableCategories)

  const [deleteCategory] = useDeleteCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();

  async function handleDeleteCategory(category) {
    try {
      await deleteCategory({ category: category });
    } catch (error) {
      console.log(error);
    }
  }

  async function addCategory(e) {
    e.preventDefault();
    try {
      await createCategory({ name: newCategory });
    } catch (error) {
      console.log(error);
    }
  }

  const addCategoryBtn = (
    <>
      <a
        href="#"
        className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        onClick={() => setOpen(!open)}
      >
        <i className="fa-solid fa-paperclip text-white-50"></i> Edit Categories
      </a>
    </>
  );

  const categoryColors = [
    "primary",
    "warning",
    "danger",
    "info",
    "dark",
    "success",
  ];

  return (
    <>
      <PageContent>
        <div className="d-sm-flex align-items-center justify-content-between mb-1">
          <h1 className="h3 mb-0 text-gray-800">
            {open ? "Add an Expense Category" : ""}
          </h1>
          <div className="">{addCategoryBtn}</div>
        </div>
        <Collapse in={open}>
          <form onSubmit={addCategory}>
            <div className=" form-group container mb-4">
              <div className="row">
                <input
                  type="text"
                  name="name"
                  value={newCategory}
                  className="form-control col"
                  placeholder="Category Name"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-success text-white btn-sm mx-1 col-auto"
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="container mb-4">
              <div className="row">
                {!isLoading
                  ? categories
                    ? categories?.map((category, index) => {
                      var buttonColor =
                        categoryColors[index % categoryColors.length];
                      return (
                        <div
                          key={index}
                          className={`col bg-${buttonColor} border-${buttonColor} bg-gradient border rounded text-white mx-2 my-2 py-2 d-flex justify-content-center align-items-center w-auto`}
                        >
                          <div className="me-auto pe-1">
                            {category}
                          </div>
                          <div
                            className="btn text-white border-white rounded mx-1"
                            onClick={() => {
                              setEditCategory(category);
                              setOpenEdit(!openEdit);
                            }}
                          >
                            Edit
                          </div>
                          <div
                            className="btn text-white border-white rounded mx-1 "
                            onClick={() => handleDeleteCategory(category)}
                          >
                            Delete
                          </div>
                        </div>
                      );
                    })
                    : <></>
                  : <></>}
              </div>
            </div>
          </form>
        </Collapse>
        {openEdit
          ? (
            <EditCategory
              categoryName={editCategory}
              setOpenEdit={setOpenEdit}
            />
          )
          : null}
      </PageContent>
    </>
  );
}

export default AddCategory;
