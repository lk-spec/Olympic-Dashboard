import { filterOptions, keyToHeaders } from "@/pages";
import SearchIcon from "./icons/SearchIcon";
import React, { Dispatch, FC, SetStateAction, useState } from "react";

const keyToRoute = new Map([
  ["Athletes", "athletes"],
  ["Countries", "countries"],
  ["Coaches", "coaches"],
  ["Companies", "companies"],
  ["Events", "events"],
]);

interface SearchBarProps {
  data: any;
  setData: Dispatch<SetStateAction<any>>;
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
  setHeaders: Dispatch<SetStateAction<string[]>>;
}

const SearchBar: FC<SearchBarProps> = ({
  data,
  setData,
  selectedOption,
  setSelectedOption,
  setHeaders,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelectedOption(newOption);
    const selectedHeaders = keyToHeaders.get(newOption);

    if (newOption != selectedOption) {
      setData([]);
    }

    if (selectedHeaders != undefined) {
      setHeaders(selectedHeaders);
    } else {
      console.log("empty selection");
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      console.log("fetching");
      const subRoute = keyToRoute.get(selectedOption);
      const response = await fetch(
        `http://127.0.0.1:5000/${subRoute}/${searchValue}`
      );
      const newData = await response.json();
      setData(newData);
      console.log(newData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-[800px] mt-[50px] flex flex-row border-black border-[1px]">
        <select
          className="bg-blue-400 w-[150px] text-white text-[20px] border-black border-[1px]"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          {filterOptions.map((text: string, key: number) => (
            <option key={key} value={text}>
              {text}
            </option>
          ))}
        </select>
        <input
          className="w-full h-[40px] border-black border-[1px]"
          type="text"
          placeholder="Search For"
          value={searchValue}
          onChange={handleSearchChange}
        />
        <button
          className="bg-blue-400 w-[50px] flex flex-row justify-center border-black border-[1px]"
          type="submit"
        >
          <div className="mt-[6px]">
            <SearchIcon />
          </div>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
