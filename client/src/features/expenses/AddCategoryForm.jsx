import { useState } from "react";
import { Collapse } from "react-bootstrap";
import PageHeader from "../../components/page-content/PageHeader";
import PageContent from "../../components/page-content/PageContent";

function AddCategory() {
  const [formData, setFormData] = useState([]);
  const [openCategory, setOpenCategory] = useState(false);

  function handleSubmit() {}
  const addCategoryBtn = (
    <>
      <a
        href="#"
        class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        onClick={() => setOpenCategory(!openCategory)}
      >
        <i class="fa-solid fa-paperclip text-white-50"></i> Add Category
      </a>
    </>
  );
  return (
    <>
      <PageContent>
        <PageHeader title="" actions={addCategoryBtn}></PageHeader>
        <Collapse in={openCategory}>
          <div className="category-form">
            <h2>Add a Category</h2>
            <form onClick={handleSubmit}>
              <label>Category Name</label>
              <input type="text" />
              <button type="submit">Submit</button>
            </form>
          </div>
        </Collapse>
      </PageContent>
    </>
  );
}

export default AddCategory;
