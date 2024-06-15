import React, { useEffect, useState } from "react";
import moment from "moment";

const ScreenTitle = ({ children }) => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      moment.locale("pt-br");

      const currentDate = moment().format("LLL");
      setDate(currentDate);
    };

    updateDate();
    setInterval(() => {
      updateDate();
    }, 60000);
  }, []);

  return (
    <div className="w-full flex items-center justify-between">
      <h2 className="font-heading font-semibold text-gray-200 text-xl">
        {children}
      </h2>
      <span className="text-sm text-gray-600 font-semibold">{date}</span>
    </div>
  );
};

export default ScreenTitle;
