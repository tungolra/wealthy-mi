import { useGetExpensesQuery } from "../api/expenseSlice";
import { useGetCategoriesQuery } from "../api/categorySlice";
import { useGetAssetsQuery } from "../api/assetSlice";
import { useGetLiabilitiesQuery } from "../api/liabilitySlice";
import { useGetIncomeQuery } from "../api/incomeSlice";

import PageContent from "../../components/page-content/PageContent";
import Page from "../../components/page/Page";
import ExpenseSummaryCard from "./ExpenseSummaryCard";
import BalanceSheet from "./BalanceSheetCard";
import ForecastCard from "./ForecastCard";
import SummaryCard from "./SummaryCards";
import ExpensePieChart from "./ExpensePieChart";
import { useState } from "react";

function Dashboard() {
  const [foreCastLength, setForeCastLength] = useState(3);
  const userId = localStorage.getItem("user");
  const {
    data: expenses,
    isSuccess: successExpenses,
  } = useGetExpensesQuery(userId);
  const { data: incomes, isSuccess: sucessIncome } = useGetIncomeQuery(userId);
  const { data: categories, isSuccess: sucessCategories } =
    useGetCategoriesQuery(userId);
  const { data: liabilities, isSuccess: successLiab } = useGetLiabilitiesQuery(
    userId,
  );
  const { data: assets, isSuccess: successAssets } = useGetAssetsQuery(userId);
  const retrievedAllData = sucessIncome && successAssets && sucessCategories &&
    successExpenses && successLiab;
  // Expense Data
  const sumExpByCat = {};

  if (successExpenses && sucessCategories) {
    expenses.forEach((exp) => {
      if (sumExpByCat[exp.category]) {
        sumExpByCat[exp.category] += exp.value;
      } else {
        sumExpByCat[exp.category] = exp.value;
      }
    });
  }

  const sumExpSorted = Object.entries(sumExpByCat).sort((a, b) => {
    if (a[1] > b[1]) return -1;
    else return 1;
  });

  let totalExp, totalIncome, netIncome, totalAssets, totalLiab, totalGrowth = 0;

  // Asset Growth over forecast period
  if (successAssets) {
    assets.forEach((asset) => {
      if (!asset.interest) {
        var rate = 7;
      } else {
        var rate = asset.interest;
      }
      var growth = asset.value * rate / 100 * foreCastLength / 12;
    });
  }

  // Liability Growth over forecast period
  if (successLiab) {
    liabilities.forEach((liab) => {
      if (!liab.interest) {
        var rate = 7;
      } else {
        var rate = liab.interest;
      }
      var growth = liab.value * rate / 100 * foreCastLength / 12;
    });
  }

  // Total of Separate Data points for summary card
  if (retrievedAllData) {
    totalExp = sumExpSorted.reduce((acc, curr) => acc + curr[1], 0);
    totalIncome = incomes.reduce((acc, curr) => acc + curr.value, 0);
    totalAssets = assets.reduce((acc, curr) => acc + curr.value, 0);
    totalLiab = liabilities.reduce((acc, curr) => acc + curr.value, 0);
    netIncome = totalIncome - totalExp;
    totalGrowth = () => {
      var assetGrowth = totalAssets * (0.07 * foreCastLength / 12);
      var liabGrowth = totalLiab * (0.09 * foreCastLength / 12);
      var totalExpFC = totalExp * foreCastLength;
      var totalIncomeFC = totalIncome * foreCastLength;
      return assetGrowth + totalIncomeFC - liabGrowth - totalExpFC;
    };
  }

  return (
    <>
      <Page>
        <PageContent>
          <div className="row my-3">
            <SummaryCard
              title="Income"
              value={sucessIncome ? totalIncome : 0}
              variant="primary"
            />
            <SummaryCard
              title="Total Assets"
              value={successAssets ? totalAssets : 0}
              variant="success"
            />
            <SummaryCard
              title="Total Liabilities"
              value={successLiab ? totalLiab : 0}
              variant="warning"
            />
            <SummaryCard
              title="Monthly Growth"
              value={retrievedAllData ? totalGrowth() : 0}
              variant="danger"
            />
          </div>
        </PageContent>
        <PageContent>
          <div className="row my-3">
            {retrievedAllData
              ? (
                <>
                  <ForecastCard
                    assets={assets}
                    liabilities={liabilities}
                    netIncome={netIncome}
                    foreCastLength={foreCastLength}
                  />
                  <BalanceSheet
                    assets={assets}
                    liabilities={liabilities}
                    foreCastLength={foreCastLength}
                  />
                </>
              )
              : <></>}
          </div>
        </PageContent>
        <PageContent>
          <div className="row my-3">
            <ExpenseSummaryCard sumExp={sumExpSorted} />
            <ExpensePieChart sumExp={sumExpSorted} />
          </div>
        </PageContent>
      </Page>
    </>
  );
}

export default Dashboard;
