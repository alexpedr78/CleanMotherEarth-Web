import { useState, useEffect } from "react";

function SortByStartingDate({ dataActivity, setDataActivity, select }) {
  const [valueSorting, setValueSorting] = useState(null);

  const handleSelect = (e) => {
    setValueSorting(e.target.value);
  };

  const sortDataByDate = () => {
    if (!dataActivity || dataActivity.length === 0 || select === null) {
      return;
    }

    let newData = dataActivity.slice();
    if ((valueSorting === "close" || select === "event") && select !== null) {
      newData.sort((a, b) => new Date(b.timeStart) - new Date(a.timeStart));
    }

    if ((valueSorting === "far" || select === "event") && select !== null) {
      newData.sort((a, b) => new Date(a.timeStart) - new Date(b.timeStart));
    }

    setDataActivity(newData);
  };

  useEffect(() => {
    sortDataByDate();
  }, [valueSorting]);

  return (
    <div>
      <select
        className="mt-4 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onChange={handleSelect}
        value={valueSorting}
      >
        <option disabled value="">
          Select An Option
        </option>
        <option value="close">Sort By the closest Date</option>
        <option value="far">Sort By the farthest Date</option>
      </select>
    </div>
  );
}

export default SortByStartingDate;
