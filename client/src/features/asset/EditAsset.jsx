import { useState } from "react";
import { useUpdateAssetMutation } from "../api/assetSlice";

export default function EditAssetModal({ asset, setOpenEdit }) {
  const [formData, setFormData] = useState({
    id: asset._id,
    value: asset.value,
    name: asset.name,
    interest: asset.interest,
  });

  const [updateAsset] = useUpdateAssetMutation();

  function handleChange(e) {
    const newData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newData);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(formData);
      await updateAsset(formData);
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
      className=" bg-white border border-dark rounded-2 mx-5 my-5 shadow"
    >
      <form onSubmit={handleSubmit} className="py-3 px-5">
        <div className="container ">
          <div className="row flex justify-between">
            <label className="text-dark border border-white py-1 rounded col-4">
              Name
            </label>
            <div className="col-8">
              <input
                className="form-control text-dark"
                placeholder={asset.name}
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
              Annual Growth (%)
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
      </form>
    </div>
  );
}
