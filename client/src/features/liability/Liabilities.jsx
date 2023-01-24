import {
  useCreateLiabilityMutation,
  useGetLiabilitiesQuery,
} from "../api/liabilitySlice";
import { useState } from "react";

function Income() {
  const initialState = {};

  const userId = localStorage.getItem("user");
  const [createLiability] = useCreateLiabilityMutation();
  const [formData, setFormData] = useState(initialState);

  const { data: liability, isLoading, isSuccess, isError, error, refetch } =
    useGetLiabilitiesQuery(userId);

  function handleChange(e) {
    setFormData({
      // ...formdata,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createLiability(formData);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(liability);
  return (
    <>
      {liability}
      <p>This is liability</p>
      <form onSubmit={handleSubmit}>
        <input></input>
      </form>
    </>
  );
}

export default Income;
