import { useState } from "react";
import { useUpdateLiabilityMutation } from "../api/liabilitySlice";

export default function EditLiabilityModal({ liability, setOpenEdit }) {
  const [formData, setFormData] = useState({
    id: liability._id,
    value: liability.value,
    name: liability.name,
    interest: liability.interest,
  });

  const [updateLiability] = useUpdateLiabilityMutation();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(formData);
      await updateLiability(formData);
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
    zIndex: "9999",
  };

  return (
    <div
      style={EditModalStyling}
      className=" bg-white border border-dark rounded-2 mx-5 my-5"
    >
      <form onSubmit={handleSubmit} className="py-3 px-5">
        <div className="container ">
          <div className="row flex justify-between">
            <label className="text-dark border border-white py-1 rounded col-4">
              Name
            </label>
            <div className="col-8">
              <input
                className="form-control col text-dark"
                placeholder={liability.name}
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row flex justify-between">
            <label className="text-dark border border-white py-1 rounded col-4">
              Value ($)
            </label>
            <div className="col-8">
              <input
                className="form-control col text-dark"
                placeholder=""
                name="value"
                type="text"
                value={formData.value}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row flex justify-between">
            <label className="text-dark border border-white py-1 rounded col-4">
              Interest Rate
            </label>
            <div className="col-8">
              <input
                className="form-control col text-dark"
                placeholder=""
                name="interest"
                type="text"
                value={formData.interest}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row flex justify-between">
            <button
              className="btn btn-success text-white btn-sm mx-1 col-auto"
              type="submit"
            >
              Submit
            </button>
            <button
              onClick={() => setOpenEdit(false)}
              className="btn btn-danger text-white btn-sm mx-1 col-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
