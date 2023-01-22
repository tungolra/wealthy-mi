import { useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import PageHeader from "../../components/page-content/PageHeader";
import PageContent from "../../components/page-content/PageContent";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetCategoriesQuery,
} from "../api/categorySlice";
function EditCategory({ setOpenEdit, categoryName }) {
  const [changeCategoryName, setChangeCategoryName] = useState([]);

  const [editCategory] = useEditCategoryMutation();

  async function updateCategory(e) {
    e.preventDefault();
    try {
      editCategory({ name: changeCategoryName, former: categoryName });
      setOpenEdit(false);
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
        <i className="fa-solid fa-paperclip text-white-50"></i> Add Category
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
                          className={`col bg-${buttonColor} border-${buttonColor} bg-gradient border rounded text-white mx-2 my-2 py-2 d-flex justify-content-center`}
                        >
                          {category}
                        </div>
                      );
                    })
                    : <></>
                  : <></>}
              </div>
            </div>
          </form>
        </Collapse>
        <div>
          <h3>Your Categories</h3>
          <ul>
            {categories?.map((category) => (
              <li>
                {category} -
                <button onClick={() => handleDeleteCategory(category)}>
                  delete
                </button>
                <button
                  onClick={() => {
                    setEditCategory(category);
                    setOpenEdit(!openEdit);
                  }}
                >
                  edit
                </button>
              </li>
            ))}
          </ul>
          {openEdit
            ? (
              <EditCategory
                categoryName={editCategory}
                setOpenEdit={setOpenEdit}
              />
            )
            : null}
        </div>
      </PageContent>
    </>
  );
}

export default AddCategory;
