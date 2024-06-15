import React, { useContext, useEffect, useState } from "react";
import IconHome from "../../assets/svg/iconHome";
import IconGroups from "../../assets/svg/iconGroups";
import IconTask from "../../assets/svg/iconTask";
import IconDelete from "../../assets/svg/iconDelete";
import IconLogout from "../../assets/svg/iconLogout";
import { authContext } from "../../contexts/authContext";
import ScreenHome from "../../screens/home";
import ScreenTicket from "../../screens/tickets";
import ScreenMember from "../../screens/members";
import ScreenCustomer from "../../screens/customer";
import CustomButton from "../shared/customButton";
import IconAdd from "../../assets/svg/iconAdd";
import TicketCreate from "../ticketCreate";
import { customerContext } from "../../contexts/customerContext";

const Navigation = () => {
  const { signOut, user } = useContext(authContext);
  const { updateData } = useContext(customerContext);

  const [selectedSection, setSelectedSection] = useState({
    id: 2,
  });

  let navOptions = [
    // {
    //   id: 1,
    //   name: "Home",
    //   icon: (
    //     <IconHome
    //       width="24px"
    //       fill={selectedSection.id === 1 ? "fill-primary" : "fill-gray-400"}
    //     />
    //   ),
    //   content: <ScreenHome />,
    // },

    {
      id: 2,
      name: "Tickets",
      icon: (
        <IconTask
          width="24px"
          fill={selectedSection.id === 2 ? "fill-primary" : "fill-gray-400"}
        />
      ),
      content: <ScreenTicket />,
    },

    {
      id: 3,
      name: "Membros",
      icon: (
        <IconGroups
          width="24px"
          fill={selectedSection.id === 3 ? "fill-primary" : "fill-gray-400"}
        />
      ),
      content: <ScreenMember />,
    },
    {
      id: 3,
      name: "Clientes",
      icon: (
        <IconGroups
          width="24px"
          fill={selectedSection.id === 3 ? "fill-primary" : "fill-gray-400"}
        />
      ),
      content: <ScreenCustomer />,
    },
  ];

  const handleSelectSection = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(currentTarget.id);
    const selected = navOptions.filter((option) => option.id === id);
    setSelectedSection(selected[0]);
  };

  if (user.type === "member") {
    navOptions = navOptions.filter((option) => option.name !== "Membros");
  }

  if (user.type === "admin") {
    navOptions = navOptions.filter((option) => option.name !== "Clientes");
  }

  useEffect(() => {
    async function loadData() {
      await updateData();
    }

    loadData();
  }, []);

  return (
    <div className="flex">
      <div
        className={`w-[250px] h-[816px] bg-gray-950 flex flex-col justify-between rounded-bl-lg  py-6 theme-${user.type}`}
      >
        <ul className="w-full flex flex-col gap-1">
          {navOptions.map((item) => (
            <li
              id={item.id.toString()}
              key={item.id}
              className={`py-3 px-4 flex items-center gap-2 font-semibold rounded cursor-pointer transition hover:translate-x-2 ${
                selectedSection.id === item.id
                  ? "text-white border-l-4 border-primary translate-x-8 hover:translate-x-8"
                  : "text-gray-400"
              }`}
              onClick={handleSelectSection}
            >
              <div>{item.icon}</div>
              {item.name}
            </li>
          ))}
        </ul>

        <div
          onClick={signOut}
          className="w-full py-3 px-4 flex items-center gap-2 font-semibold rounded cursor-pointer transition hover:translate-x-2 hover:border-l-8 border-red-800 "
        >
          <div>
            <IconLogout width="24px" fill="fill-red-800" />
          </div>
          <span className="text-gray-400 ">Sair</span>
        </div>
      </div>
      <div className="w-full relative">
        {selectedSection.content || <ScreenTicket />}

        {user.type === "member" && <TicketCreate />}
      </div>
    </div>
  );
};

export default Navigation;
