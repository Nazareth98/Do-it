import React, { useContext, useEffect } from "react";
import ScreenTitle from "../../components/shared/screenTitle";
import TicketList from "../../components/ticketList";
import TicketData from "../../components/ticketData";
import { ticketContext } from "../../contexts/ticketContext";
import { authContext } from "../../contexts/authContext";

const ScreenTicket = () => {
  const { updateData } = useContext(ticketContext);
  const { user } = useContext(authContext);

  useEffect(() => {
    function lodaData() {
      updateData();
    }

    lodaData();
  }, []);

  return (
    <div
      className={`fade-left w-full  pl-12 pt-8 pr-8 pb-8 flex flex-col gap-8 h-[814px] overflow-y-auto theme-${user.type}`}
    >
      <ScreenTitle>
        Esses são seus <span className="text-primary">tickets</span>
      </ScreenTitle>
      <div className="w-full flex gap-8">
        <TicketList />
        <TicketData />
      </div>
    </div>
  );
};

export default ScreenTicket;
