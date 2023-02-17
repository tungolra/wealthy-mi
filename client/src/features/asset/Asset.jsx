import {
  useCreateAssetMutation,
  useDeleteAssetMutation,
  useGetAssetsQuery,
} from "../api/assetSlice";
import { useState } from "react";
import EditAssetModal from "./EditAsset";

function Asset() {
  const initialState = {
    name: "",
    value: 0,
    interest: 0,
  };

  const userId = localStorage.getItem("user");
  const [formData, setFormData] = useState(initialState);
  const [openEdit, setOpenEdit] = useState(false);
  const [deleteAsset] = useDeleteAssetMutation();
  const [createAsset] = useCreateAssetMutation();
  const { data: assets, isLoading, isSuccess, isError, error, refetch } =
    useGetAssetsQuery(userId);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await createAsset(formData);
    } catch (error) {
      console.log(error);
    }
  }

  function handleDelete(id) {
    deleteAsset(id);
  }

  return (
    <>
      <div>
        <div className="row">
          <div className="col-4 h5 text-dark">Title</div>
          <div className="col-4 h5 text-dark">Value</div>
          <div className="col-4 h5 text-dark">Options</div>
        </div>
        {assets
          ? assets.map((asset, index) => (
            <div key={index}>
              <div className="row">
                <div className="col-4">
                  {asset.name}
                </div>
                <div className="col-4">
                  {asset.value.toLocaleString("en-us", {
                    style: "currency",
                    currency: "USD",
                  })}
                </div>
                <div className="col-4">
                  <div
                    onClick={() => handleDelete(asset._id)}
                    className="btn btn-dark btn-sm mx-1"
                  >
                    Delete
                  </div>
                  <div
                    className="btn btn-warning btn-sm mx-1"
                    onClick={() => setOpenEdit(!openEdit)}
                  >
                    Edit
                  </div>
                </div>
              </div>

              {openEdit
                ? <EditAssetModal asset={asset} setOpenEdit={setOpenEdit} />
                : null}
            </div>
          ))
          : <></>}
        <form onSubmit={handleSubmit}>
          <div className="row h5 text-dark">Add a New Asset</div>
          <div className="row">
            <input
              className="form-control col"
              placeholder="Asset Title"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            >
            </input>
            <input
              className="form-control col"
              placeholder="Value"
              type="text"
              name="value"
              value={formData.value.toLocaleString("en-us", {
                style: "currency",
                currency: "USD",
              })}
              onChange={handleChange}
            >
            </input>
            <input
              className="form-control col text-dark"
              placeholder="annual returns"
              type="text"
              name="interest"
              value={`${formData.interest} %`}
              onChange={handleChange}
            />
            <button
              className="btn btn-success text-white btn-sm mx-1 col-auto "
              type="submit"
            >
              Add an Asset
            </button>
            <div className="col-0 col-lg-6">&nbsp;</div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Asset;
