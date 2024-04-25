import React, { useState, useEffect } from "react";

function SortByDate({ dataActivity, setDataActivity }) {
  const [valueSorting, setValueSorting] = useState("");

  const handleSelect = (e) => {
    setValueSorting(e.target.value);
  };

  const sortDataByDate = () => {
    if (valueSorting === "new" && dataActivity) {
      const newData = dataActivity
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setDataActivity(newData);
    } else if (valueSorting === "old" && dataActivity) {
      const newData = dataActivity
        .slice()
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
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
        <option value="">Select An Option</option>
        <option value="old">Sort By the Oldest</option>
        <option value="new">Sort By the Newest</option>
      </select>
      <ul>
        {dataActivity &&
          dataActivity.map((activity, index) => (
            <li key={index}>{activity.date}</li>
          ))}
      </ul>
    </div>
  );
}

export default SortByDate;
