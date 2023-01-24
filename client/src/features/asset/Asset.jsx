import { useCreateAssetMutation, useGetAssetsQuery } from "../api/assetSlice";
import { useState } from "react";

function Asset() {
  const initialState = {
    name: "",
    value: 0,
  };

  const userId = localStorage.getItem("user");
  const [createAsset] = useCreateAssetMutation();
  const [formData, setFormData] = useState(initialState);

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

  return (
    <>
      {assets.map((asset) => <div>{asset.name}: {asset.value}</div>)}
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
