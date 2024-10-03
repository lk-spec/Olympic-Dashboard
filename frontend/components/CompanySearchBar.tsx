import React, { Dispatch, FC, SetStateAction, useState } from "react";
import SearchIcon from "./icons/SearchIcon";

interface CompanySearchBarProps {
  data: any;
  setData: Dispatch<SetStateAction<any>>;
}

const CompanySearchBar: FC<CompanySearchBarProps> = ({ data, setData }) => {
  const [searchValue, setSearchValue] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/companiesWithId/${searchValue}`
      );
      const newData = await response.json();
      setData(newData);
      console.log(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-[800px] mt-[50px] flex flex-row border-black border-[1px]">
        <div className="bg-blue-400 w-[150px] text-white text-[20px] border-black border-[1px] flex items-center justify-center">
          Company:
        </div>
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
          <div className="mt-[4px]">
            <SearchIcon />
          </div>
        </button>
      </div>
    </form>
  );
};

export default CompanySearchBar;
