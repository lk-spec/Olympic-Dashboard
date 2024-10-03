import CompletionModal from "@/components/CompletionModal";
import React, { useEffect, useState } from "react";

const Register = () => {
  const [countryData, setCountryData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [forbesRank, setForbesRank] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/countries`);
      const newData = await response.json();
      setCountryData(newData);
      setSelectedOption(newData[0]);
      console.log(newData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForbesRank(Number(event.target.value));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const postData = {
        Name: companyName,
        "Forbe's Rank": forbesRank,
        Sponsors: selectedOption,
      };

      const response = await fetch(`http://127.0.0.1:5000/registerCompany`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
          // Add other headers if needed
        },
        body: JSON.stringify(postData), // Convert the data to JSON format
      });

      if (response.status == 200) {
        setShowSuccess(true);
      } else {
        setShowFailure(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[500px] bg-white h-[500px] mt-[150px] flex flex-col items-center rounded-[15px] border-[5px] border-blue-400">
      {showSuccess && (
        <CompletionModal
          text="Successfully Registered your Company"
          exitFunction={setShowSuccess}
        />
      )}
      {showFailure && (
        <CompletionModal
          text="ERROR: Forbes Rank is already in use"
          exitFunction={setShowFailure}
        />
      )}
      <div className="text-[30px] mt-[30px]">Register a Company</div>
      <form onSubmit={handleSubmit}>
        <div className="mt-[40px] flex flex-col gap-[30px]">
          <div>
            <div>Company Name:</div>
            <input
              className="w-full h-[40px] border-black border-[1px]"
              type="text"
              placeholder="Ex: John Doe"
              value={companyName}
              onChange={handleSearchChange}
            />
          </div>
          <div>
            <div>Sponsoring:</div>
            <select
              className="w-full border-black border-[1px] h-[40px]"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              {countryData.map((text: string, key: number) => (
                <option key={key} value={text}>
                  {text}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div>Forbes Rank:</div>
            <input
              className="w-full h-[40px] border-black border-[1px]"
              type="number"
              placeholder="Ex: 1142"
              min="0"
              value={forbesRank}
              onChange={handleNumberChange}
              required
            />
          </div>
          <button
            className="w-full bg-blue-400 h-[40px] text-white"
            disabled={showSuccess || showFailure}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
