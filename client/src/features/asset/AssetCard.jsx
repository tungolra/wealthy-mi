import { useEffect } from "react";
import {
  useCreateAssetMutation,
  useDeleteAssetMutation,
  useGetAssetsQuery,
} from "../api/assetSlice";
import { useState } from "react";
import EditAssetModal from "./EditAsset";

function AssetCard(props) {
  const initialState = {
    name: "",
    value: 0,
    interest: 0,
  };

  const { balanceCount } = props;
  const userId = localStorage.getItem("user");
  const [formData, setFormData] = useState(initialState);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedAsset, setSelectAsset] = useState(null);
  const [deleteAsset] = useDeleteAssetMutation();
  const [createAsset] = useCreateAssetMutation();
  const { data: assets, isLoading, isSuccess, isError, error, refetch } =
    useGetAssetsQuery(userId);
  var totalAssets = 0;
  var diffCount = 0;

  useEffect(() => {
    if (assets) {
      setSelectAsset(assets[0]);
    }
  }, []);

  if (assets) {
    totalAssets = assets.reduce((acc, curr) => acc + curr.value, 0);
    diffCount = balanceCount - assets.length;
  }
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
      <div className="card shadow mx-1 my-3 my-lg-0 h-100">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Assets</h6>
        </div>
        <div className="card-body container">
          <div className="row">
            <div className="col-4 h5 text-dark">Title</div>
            <div className="col-4 h5 text-dark d-flex justify-content-end">
              <div className="me-5">
                Value
              </div>
            </div>
            <div className="col-4 h5 text-dark">Options</div>
          </div>
          {assets
            ? assets.map((asset, index) => (
              <div key={index}>
                <div className="row my-2">
                  <div className="col-4">
                    {asset.name}
                  </div>
                  <div className="col-4 d-flex justify-content-end">
                    <div className="me-5">
                      {asset.value.toLocaleString("en-us", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </div>
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
                      onClick={() => {
                        setSelectAsset(assets[index]);
                        setOpenEdit(!openEdit);
                      }}
                    >
                      Edit
                    </div>
                  </div>
                </div>

                {openEdit
                  ? (
                    <EditAssetModal
                      asset={selectedAsset}
                      setOpenEdit={setOpenEdit}
                    />
                  )
                  : null}
              </div>
            ))
            : <></>}
          {diffCount > 0
            ? Array.from({ length: diffCount }).map((_) => {
              return (
                <div className="row my-2">
                  <div className="btn">&nbsp;</div>
                </div>
              );
            })
            : <></>}
          <div className="row text-dark border-bottom border-dark pt-2 mb-2">
            <div className="col-4">
              Total Assets
            </div>
            <div className="col-4 d-flex justify-content-end">
              <div className="me-5">
                {totalAssets.toLocaleString("en-us", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
            </div>
            <div className="col-4"></div>
          </div>

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
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AssetCard;
