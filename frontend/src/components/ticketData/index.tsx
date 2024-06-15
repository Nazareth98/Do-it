import React, { useContext, useEffect, useState } from "react";
import IconAdd from "../../assets/svg/iconAdd";
import IconMonitoring from "../../assets/svg/iconMonitoring";
import IconTask from "../../assets/svg/iconTask";
import IconWarning from "../../assets/svg/iconWarning";
import IconPause from "../../assets/svg/iconPause";
import IconDelete from "../../assets/svg/iconDelete";
import { ticketContext } from "../../contexts/ticketContext";

interface DataType {
  finished: number;
  pending: number;
  onPause: number;
  canceled: number;
}

const TicketData = () => {
  const [currentData, setCurrentData] = useState<DataType>({
    finished: 0,
    pending: 0,
    onPause: 0,
    canceled: 0,
  });
  const { ticketData } = useContext(ticketContext);

  useEffect(() => {
    function loadData() {
      const data = {
        finished: 0,
        pending: 0,
        onPause: 0,
        canceled: 0,
      };

      ticketData.forEach((ticket) => {
        switch (ticket.status) {
          case "FINALIZADO":
            data.finished += 1;
            break;
          case "PENDENTE":
            data.pending += 1;
            break;
          case "EM PAUSE":
            data.onPause += 1;
            break;
          case "CANCELADO":
            data.canceled += 1;
            break;
          default:
            break;
        }
      });

      setCurrentData(data);
    }

    if (ticketData) {
      loadData();
    }
  }, [ticketData]);

  return (
    <div className="w-[300px] flex flex-col gap-6">
      <h3 className="text-gray-300 font-heading font-semibold flex items-center gap-2">
        <IconMonitoring width="20px" fill="fill-primary" />
        Estatísticas
      </h3>

      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <span className="text-gray-500 font-semibold">Concluídos</span>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-heading text-gray-200 font-semibold">
              {currentData.finished}
            </span>
            <IconTask width="20px" fill="fill-green-900" />
          </div>
        </div>

        <div className="flex items-end justify-between">
          <span className="text-gray-500 font-semibold">Pendentes</span>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-heading text-gray-200 font-semibold">
              {currentData.pending}
            </span>
            <IconWarning width="20px" fill="fill-yellow-900" />
          </div>
        </div>

        <div className="flex items-end justify-between">
          <span className="text-gray-500 font-semibold">Em pausa</span>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-heading text-gray-200 font-semibold">
              {currentData.onPause}
            </span>
            <IconPause width="20px" fill="fill-blue-900" />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <span className="text-gray-500 font-semibold">Cancelados</span>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-heading text-gray-200 font-semibold">
              {currentData.canceled}
            </span>
            <IconDelete width="20px" fill="fill-red-900" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketData;
