import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface EditModalProps {
  currentCompany: string;
  currentSponsor: string;
  currentId: number;
  setShowEditModal: Dispatch<SetStateAction<boolean>>;
}

const EditModal: FC<EditModalProps> = ({
  currentCompany,
  currentSponsor,
  currentId,
  setShowEditModal,
}) => {
  const [inputValue, setInputValue] = useState(currentCompany);
  const [selectedOption, setSelectedOption] = useState("");

  const [countryList, setCountryList] = useState([]);
  const fetchCountryList = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/countries`);
      const newData = await response.json();
      setCountryList(newData);
      setSelectedOption(currentSponsor);
      console.log(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    fetchCountryList();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelectedOption(newOption);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      const putData = {
        Name: inputValue,
        Id: currentId,
        Sponsors: selectedOption,
      };

      const response = await fetch(`http://127.0.0.1:5000/updateCompany`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
          // Add other headers if needed
        },
        body: JSON.stringify(putData), // Convert the data to JSON format
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="z-10 flex justify-center bg-black">
      <div className="w-[400px] h-[400px] fixed bg-white border-black border-[2px] rounded-[8px] mt-[70px] flex flex-col items-center">
        <div className="text-[30px] font-semibold font-inter mt-[20px] text-center">
          Update Information
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-[20px]">Company Name:</div>
          <input
            className="w-full h-[40px] border-black border-[1px] mt-[10px]"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            required
          />
          <div className="mt-[20px]">Sponsoring:</div>
          <select
            className="w-full border-black border-[1px] h-[40px]"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            {countryList &&
              countryList.map((text: string, key: number) => (
                <option key={key} value={text}>
                  {text}
                </option>
              ))}
          </select>
          <div className="flex flex-row gap-[20px]">
            <button
              className="w-[150px] mt-[80px] hover:bg-blue-400 hover:text-white rounded-[10px] h-[50px] text-black border-[3px] border-blue-400 text-[18px]"
              type="submit"
            >
              Confirm
            </button>
            <button
              className="w-[150px] mt-[80px] hover:bg-blue-400 hover:text-white rounded-[10px] h-[50px] text-black border-[3px] border-blue-400 text-[18px]"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
