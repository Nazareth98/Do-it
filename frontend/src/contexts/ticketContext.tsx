import { createContext, useState } from "react";

import {
  deleteData,
  getData,
  getFile,
  postData,
  postFormData,
  putData,
} from "../services/API";
import { TicketType } from "../types/ticketType";
import axios from "axios";

interface TicketContext {
  ticketData?: TicketType[];
  updateData: () => void;
  createTicket: (body: any) => Promise<any> | void;
  deleteTicket: (id: number) => Promise<any> | void;
  getTicketById: (id: number) => Promise<any> | void;
  updateTicketStatus: (id: number, status: string) => Promise<any> | void;
  createNote: (content: any, ticketId: number) => Promise<any> | void;
  downloadFile: (fileName: string) => Promise<any> | void;
}

const initialState: TicketContext = {
  ticketData: undefined,
  updateData: () => {},
  createTicket: () => {},
  deleteTicket: () => {},
  getTicketById: () => {},
  createNote: () => {},
  updateTicketStatus: () => {},
  downloadFile: () => {},
};

const ticketContext = createContext<TicketContext>(initialState);

const TicketContextProvider = ({ children }: any) => {
  const [ticketData, setTicketData] = useState<TicketType[]>();

  async function deleteTicket(id: number) {
    try {
      const endpoint = `/ticket/${id}`;
      const result = await deleteData(endpoint);
      if (result.response) {
        return result.response.data;
      } else {
        setTicketData(result.result);
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  function getFileName(path: string): string {
    // Use split para dividir a string no caractere '\'
    const parts = path.split("\\");
    // Retorna o último elemento do array, que é o nome do arquivo
    return parts[parts.length - 1];
  }

  async function downloadFile(filename) {
    try {
      const formattedFileName = getFileName(filename);

      const response = await getFile(
        `/ticket/download/${formattedFileName}`,
        filename
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); // Set the file name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  }

  async function getTickets() {
    try {
      const endpoint = "/ticket";
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateData() {
    try {
      const data = await getTickets();
      setTicketData(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getTicketById(id: number) {
    try {
      const endpoint = `/ticket/${id}`;
      const result = await getData(endpoint);
      if (result.response) {
        return result.response.data;
      } else {
        return result.result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function createTicket(formData) {
    try {
      const endpoint = "/ticket";
      const result = await postFormData(endpoint, formData);
      if (result.response) {
        return result.response.data;
      } else {
        setTicketData(result.result);
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function createNote(formData, ticketId: number) {
    try {
      const endpoint = `/ticket/note/${ticketId}`;
      const result = await postFormData(endpoint, formData);
      if (result.response) {
        return result.response.data;
      } else {
        const updatedTicket = await getTicketById(ticketId);
        return updatedTicket;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateTicketStatus(ticketId: number, status: string) {
    try {
      const endpoint = `/ticket/${ticketId}`;
      const result = await putData(endpoint, { status });
      if (result.response) {
        return result.response.data;
      } else {
        await updateData();
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ticketContext.Provider
      value={{
        updateData,
        ticketData,
        createTicket,
        deleteTicket,
        getTicketById,
        createNote,
        updateTicketStatus,
        downloadFile,
      }}
    >
      {children}
    </ticketContext.Provider>
  );
};

export { ticketContext, TicketContextProvider };
