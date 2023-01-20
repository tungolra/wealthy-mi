import { useState } from "react";
import { Collapse } from "react-bootstrap";
import PageHeader from "../../components/page-content/PageHeader";
import PageContent from "../../components/page-content/PageContent";

function AddCategory() {
  const [formData, setFormData] = useState([]);
  const [open, setOpen] = useState(false);

  function handleSubmit() {}
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
  return (
    <>
      <PageContent>
        <div className="d-sm-flex align-items-center justify-content-between mb-1">
          <h1 className="h3 mb-0 text-gray-800">
            {open ? "Add an Expense Category" : ""}
          </h1>
          <div className="">
            {addCategoryBtn}
          </div>
        </div>
        <Collapse in={open}>
          <form onClick={handleSubmit}>
            <div className=" form-group container mb-4">
              <div className="row">
                <input
                  type="text"
                  className="form-control col"
                  placeholder="Category Name"
                />
                <button
                  type="submit"
                  className="btn btn-dark btn-sm mx-1 col-auto"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </Collapse>
      </PageContent>
    </>
  );
}

export default AddCategory;
