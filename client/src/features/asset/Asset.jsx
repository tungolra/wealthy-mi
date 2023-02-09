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
      {assets
        ? assets.map((asset, index) => (
          <div key={index}>
            <div>
              <div>{asset.name}: {asset.value}</div>
              <div
                onClick={() => handleDelete(asset._id)}
                className="btn btn-dark btn-sm"
              >
                Delete
              </div>
              <div
                className="btn btn-warning btn-sm"
                onClick={() => setOpenEdit(!openEdit)}
              >
                Edit
              </div>
            </div>
            {openEdit
              ? <EditAssetModal asset={asset} setOpenEdit={setOpenEdit} />
              : null}
          </div>
        ))
        : <></>}
      <form onSubmit={handleSubmit}>
        <div className="container">
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
              value={Number(formData.value)}
              onChange={handleChange}
            >
            </input>
            <button
              className="btn btn-success text-white btn-sm mx-1 col-auto"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Asset;
