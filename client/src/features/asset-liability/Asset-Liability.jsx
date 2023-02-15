import AssetCard from "../asset/AssetCard";
import LiabilityCard from "../liability/LiabilityCard";
import AssetChart from "../asset/AssetChart";
import LiabilityChart from "../liability/LiabilityChart";
import Page from "../../components/page/Page";
import PageContents from "../../components/page-content/PageContent";
import { useGetAssetsQuery } from "../api/assetSlice";
import { useGetLiabilitiesQuery } from "../api/liabilitySlice";

function AssetLiabilityView() {
  const userId = localStorage.getItem("user");
  const { data: assets, isLoading: dataLoading } = useGetAssetsQuery(userId);

  const { data: liabilities, isLoading: liabilityLoading } =
    useGetLiabilitiesQuery(userId);

  var balanceCount = 0;
  if (assets && liabilities) {
    balanceCount = Math.max(assets.length, liabilities.length);
  }

  return (
    <Page>
      <div className="row">
        <div className="col col-lg-6">
          <AssetCard balanceCount={balanceCount} />
        </div>
        <div className="col col-lg-6">
          <LiabilityCard balanceCount={balanceCount} />
        </div>
      </div>
      <div className="row mt-2">
        <AssetChart />
        <LiabilityChart />
      </div>
    </Page>
  );
}

export default AssetLiabilityView;
