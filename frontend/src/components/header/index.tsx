import React, { useContext } from "react";
import IconPerson from "../../assets/svg/iconPerson";
import { authContext } from "../../contexts/authContext";

const Header = () => {
  const { user } = useContext(authContext);

  return (
    <div
      className={`w-full h-[60px] py-4 px-8 bg-gray-800 flex items-center justify-between rounded-t-lg shadow theme-${user.type}`}
    >
      <div>
        <h1 className="font-heading text-white font-bold text-3xl">
          Do it<span className="text-primary">.</span>
        </h1>
      </div>
      <div>
        <p className="text-primary font-heading font-medium text-sm">
          {user?.type}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-gray-400 font-semibold">{user?.username}</span>
        <IconPerson width="25px" fill="fill-gray-400" />
      </div>
    </div>
  );
};

export default Header;
