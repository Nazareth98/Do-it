import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { ticketContext } from "../../contexts/ticketContext";
import IconList from "../../assets/svg/iconList";
import IconTask from "../../assets/svg/iconTask";
import { TicketType } from "../../types/ticketType";
import { limitString } from "../../utils/generals";
import DetailsModal from "./detailsModal";
import { authContext } from "../../contexts/authContext";

const selectOptions = [
  {
    name: "EM PAUSE",
    value: "EM PAUSE",
  },
  {
    name: "CANCELADO",
    value: "CANCELADO",
  },
  {
    name: "PENDENTE",
    value: "PENDENTE",
  },
  {
    name: "FINALIZADO",
    value: "FINALIZADO",
  },
];

const TicketList = () => {
  const { ticketData, deleteTicket } = useContext(ticketContext);
  const { user } = useContext(authContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const [selectTicket, setSelectTicket] = useState<TicketType>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [filteredTickets, setFilteredTickets] = useState(ticketData);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");

  useEffect(() => {
    let filtered = ticketData;

    if (selectedStatus) {
      filtered = filtered.filter((ticket) => ticket.status === selectedStatus);
    }

    if (selectedCustomer) {
      filtered = filtered.filter(
        (ticket) => ticket.customerName === selectedCustomer
      );
    }

    setFilteredTickets(filtered);
  }, [selectedStatus, selectedCustomer, ticketData]);

  async function handleDelete({ currentTarget }) {
    try {
      const id = currentTarget.id;
      const result = await deleteTicket(id);
      if (result.status !== 200) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  function handleSelect({ currentTarget }) {
    const id = Number(currentTarget.id);
    const selectTicket = ticketData.filter((ticket) => ticket.id === id);
    setSelectTicket(selectTicket[0]);
    setModalIsOpen(true);
  }

  // Extract unique customer names for the second select
  const customerOptions = Array.from(
    new Set(ticketData?.map((ticket) => ticket.customerName))
  );

  return (
    <div className="flex flex-col gap-6 w-full">
      <DetailsModal
        ticketData={selectTicket}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
      />
      <div className="w-full flex items-start justify-between">
        <h3 className="text-gray-300 font-heading font-semibold flex items-center gap-2">
          <IconList width="20px" fill="fill-primary" />
          Lista de tickets
        </h3>
      </div>

      <div className="flex gap-4">
        <div className="max-w-sm">
          <select
            className="bg-gray-800 border-2 border-gray-700 text-gray-300 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Selecione um Status</option>
            {selectOptions?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="max-w-sm">
          <select
            className="bg-gray-800 border-2 border-gray-700 text-gray-300 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            onChange={(e) => setSelectedCustomer(e.target.value)}
          >
            <option value="">Selecione um Cliente</option>
            {customerOptions.map((customerName, index) => (
              <option key={index} value={customerName}>
                {customerName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {filteredTickets?.map((ticket) => (
          <div
            key={ticket.id}
            id={ticket.id}
            onClick={handleSelect}
            className="bg-gray-950 border-2 border-gray-800 p-6 rounded-lg grid grid-cols-12 gap-6 cursor-pointer hover:bg-dark hover:border-medium"
          >
            <div className="col-span-2 flex items-center justify-center">
              <div
                className={`p-2 rounded-lg border-2 ${
                  ticket.status === "PENDENTE"
                    ? "border-yellow-500 "
                    : ticket.status === "FINALIZADO"
                    ? "border-green-500"
                    : ticket.status === "EM PAUSE"
                    ? "border-blue-600"
                    : ticket.status === "CANCELADO"
                    ? "border-red-800"
                    : "border-green-500"
                }`}
              >
                <IconTask
                  fill={
                    ticket.status === "PENDENTE"
                      ? "fill-yellow-500"
                      : ticket.status === "FINALIZADO"
                      ? "fill-green-500"
                      : ticket.status === "EM PAUSE"
                      ? "fill-blue-600"
                      : ticket.status === "CANCELADO"
                      ? "fill-red-800"
                      : "fill-green-500"
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 col-span-7">
              <h4 className="text-lg font-heading font-semibold text-gray-300">
                {ticket.customerName}
              </h4>
              <div className="flex items-center gap-2">
                <p className="text-gray-600 ">
                  {limitString(ticket.description, 30)}
                </p>
              </div>
            </div>
            <div className="flex items-end justify-center col-span-3">
              <span
                className={`text-sm ${
                  ticket.status === "PENDENTE"
                    ? "text-yellow-500"
                    : ticket.status === "FINALIZADO"
                    ? "text-green-500"
                    : ticket.status === "EM PAUSE"
                    ? "text-blue-600"
                    : ticket.status === "CANCELADO"
                    ? "text-red-800"
                    : "text-green-500"
                }`}
              >
                {ticket.status.toLocaleLowerCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketList;
