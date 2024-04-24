import { useState, useEffect } from "react";

function SortByStartingDate({ dataActivity, setDataActivity }) {
  const [valueSorting, setValueSorting] = useState(null);

  const handleSelect = (e) => {
    setValueSorting(e.target.value);
  };

  const sortDataByDate = () => {
    if (valueSorting === "close") {
      const newData = dataActivity
        .slice()
        .sort(
          (a, b) =>
            new Date(b.eventId.timeStart) - new Date(a.eventId.timeStart)
        );
      setDataActivity(newData);
    } else if (valueSorting === "far") {
      const newData = dataActivity
        .slice()
        .sort(
          (a, b) =>
            new Date(a.eventId.timeStart) - new Date(b.eventId.timeStart)
        );
      setDataActivity(newData);
    } else {
      return dataActivity;
    }
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
      <ul>
        {dataActivity.map((activity, index) => (
          <li key={index}>{activity.date}</li>
        ))}
      </ul>
    </div>
  );
}

export default SortByStartingDate;
