import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import ResultTable from "@/components/Table";

const inter = Inter({ subsets: ["latin"] });

export const filterOptions = [
  "Athletes",
  "Countries",
  "Coaches",
  "Companies",
  "Events",
];

export const keyToHeaders = new Map([
  ["Athletes", ["Name", "Country", "Event", "Coach"]],
  [
    "Countries",
    ["Country", "Rank", "Gold Medals", "Silver Medals", "Bronze Medals"],
  ],
  ["Coaches", ["Name", "Country", "Event", "Number of Players"]],
  ["Companies", ["Name", "Forbes Rank", "Sponsoring"]],
  ["Events", ["Event", "Classification", "Countries Competing"]],
]);

export default function Home() {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(filterOptions[0]);
  const [headers, setHeaders] = useState<string[]>([
    "Name",
    "Country",
    "Event",
    "Coach",
  ]);

  console.log(selectedOption, headers);

  return (
    <div className="mt-[60px]">
      <SearchBar
        data={data}
        setData={setData}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        setHeaders={setHeaders}
      />
      <div className="flex flex-row justify-center mt-[30px] w-full pb-[50px]">
        {data ? (
          <ResultTable data={data} headers={headers} />
        ) : (
          "No Data Loaded"
        )}
      </div>
    </div>
  );
}
