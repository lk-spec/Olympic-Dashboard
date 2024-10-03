import { useEffect, useState } from "react";

export function useOlympicData() {
  const [countryList, setCountryList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/countries`);
      const newData = await response.json();
      setCountryList(newData);
      console.log(newData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { countryList };
}
