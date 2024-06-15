import React, { useContext } from "react";
import Header from "../../components/header";
import Navigation from "../../components/navigation";
import CustomButton from "../../components/shared/customButton";
import IconAdd from "../../assets/svg/iconAdd";

const ScreenPanel = () => {
  return (
    <div
      className={`w-full h-full bg-gray-950 flex items-center justify-center relative`}
    >
      <div className="bg-gray-900 w-[1000px] h-[880px] rounded-lg border-2 border-gray-800">
        <Header />
        <Navigation />
      </div>
    </div>
  );
};

export default ScreenPanel;
