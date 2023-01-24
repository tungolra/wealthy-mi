import { useCreateAssetMutation, useGetAssetsQuery } from "../api/assetSlice";
import { useState } from "react";

function Asset() {
  const initialState = {};

  const userId = localStorage.getItem("user");
  const [createAsset] = useCreateAssetMutation();
  const [formData, setFormData] = useState(initialState);

  const { data: income, isLoading, isSuccess, isError, error, refetch } =
    useGetAssetsQuery(userId);

  function handleChange(e) {
    setFormData({
      // ...formdata,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createAsset(formData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {income}
      <p>This is assets</p>
      <form onSubmit={handleSubmit}>
        <input></input>
      </form>
    </>
  );
}

export default Asset;
