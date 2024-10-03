import CompanySearchBar from "@/components/CompanySearchBar";
import CompanyTable from "@/components/CompanyTable";
import { useState } from "react";

const Manage = () => {
  const [data, setData] = useState([]);
  const headers = ["Name", "Forbes Rank", "Sponsoring", "Company Id"];
  return (
    <div className="mt-[60px]">
      <CompanySearchBar data={data} setData={setData} />

      <div className="flex flex-row justify-center mt-[30px] w-full pb-[50px]">
        {data ? (
          <CompanyTable data={data} headers={headers} />
        ) : (
          "No Data Loaded"
        )}
      </div>
    </div>
  );
};

export default Manage;
