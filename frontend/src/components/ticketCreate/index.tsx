import React, { useContext, useState } from "react";
import CustomButton from "../shared/customButton";
import IconAdd from "../../assets/svg/iconAdd";
import { authContext } from "../../contexts/authContext";
import { ticketContext } from "../../contexts/ticketContext";
import ModalCreate from "./modal";

const TicketCreate = () => {
  const { user } = useContext(authContext);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleCreateTicket() {
    setModalIsOpen(true);
  }

  return (
    <div className={`absolute right-8 bottom-8  theme-${user.type}`}>
      <ModalCreate isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
      <CustomButton onClick={handleCreateTicket}>
        <IconAdd fill="fill-dark" />
        ticket
      </CustomButton>
    </div>
  );
};

export default TicketCreate;
