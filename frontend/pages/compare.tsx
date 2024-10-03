import Graph from "@/components/Graph";
import InsightBox from "@/components/InsightBox";
import { useEffect, useState } from "react";

const Compare = () => {
  const [countryList, setCountryList] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [countryAthleteData, setCountryAthleteData] = useState([]);

  const [totalPlayers, setTotalPlayers] = useState(0);
  const [totalCoaches, setTotalCoaches] = useState(0);

  const fetchCountryList = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/countries`);
      const newData = await response.json();
      setCountryList(newData);
      setSelectedOption("United States of America");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountryList();
  }, []);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/countries/${selectedOption}`
        );
        const newData = await response.json();
        setCountryData(newData);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAltheteCounts = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/getPlayerCount/${selectedOption}`
        );
        const newData = await response.json();
        setCountryAthleteData(newData);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchTotalPlayers = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/getTotalPlayers/${selectedOption}`
        );
        const newData = await response.json();
        setTotalPlayers(newData["total"]);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchTotalCoaches = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/getTotalCoaches/${selectedOption}`
        );
        const newData = await response.json();
        setTotalCoaches(newData["total"]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountryData();
    fetchAltheteCounts();
    fetchTotalPlayers();
    fetchTotalCoaches();
  }, [selectedOption]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelectedOption(newOption);
  };

  console.log(countryAthleteData);
  return (
    <div className="mt-[100px] pb-[100px]">
      <form>
        <select
          className="w-[500px] border-black text-[30px] rounded-[5px]"
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
      </form>
      <div className="mt-[50px] flex flex-row gap-[30px]">
        <InsightBox
          title="Overall Rank"
          data={countryData[0] && countryData[0][1]}
          def="N/A"
        />
        <InsightBox
          title="Gold Medals"
          data={countryData[0] && countryData[0][2]}
          def="0"
        />
        <InsightBox
          title="Silver Medals"
          data={countryData[0] && countryData[0][3]}
          def="0"
        />
        <InsightBox
          title="Bronze Medals"
          data={countryData[0] && countryData[0][4]}
          def="0"
        />
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div className="mt-[50px]">
            <InsightBox title="Total Players" data={totalPlayers} def="0" />
          </div>
          <div className="mt-[50px]">
            <InsightBox title="Total Coaches" data={totalCoaches} def="0" />
          </div>
        </div>
        {countryAthleteData && <Graph data={countryAthleteData} />}
      </div>
    </div>
  );
};
export default Compare;
