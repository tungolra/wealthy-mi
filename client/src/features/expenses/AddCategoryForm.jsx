import { useState } from "react";

function AddCategory() {
  const [formData, setFormData] = useState([]);

  function handleSubmit() {}

  return (
    <div className="category-form">
      <h2>Add a Category</h2>
      <form onClick={handleSubmit}>
        <label>Category Name</label>
        <input type="text" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddCategory;
