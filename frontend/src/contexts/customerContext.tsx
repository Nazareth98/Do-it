import { createContext, useState } from "react";

import { deleteData, getData, postData } from "../services/API";
import { CustomerType } from "../types/customerType";

interface CustomerContext {
  customerData?: CustomerType[];
  updateData: () => void;
  createCustomer: (body: any, id: number) => Promise<any> | void;
  deleteCustomer: (id: number) => Promise<any> | void;
}

const initialState: CustomerContext = {
  customerData: undefined,
  updateData: () => {},
  createCustomer: () => {},
  deleteCustomer: () => {},
};

const customerContext = createContext<CustomerContext>(initialState);

const CustomerContextProvider = ({ children }: any) => {
  const [customerData, setCustomerData] = useState<CustomerType[]>();

  async function deleteCustomer(id: number) {
    try {
      const endpoint = `/customer/${id}`;
      const result = await deleteData(endpoint);
      if (result.response) {
        return result.response.data;
      } else {
        if (result.status && result.status === 400) {
          return result;
        }
        setCustomerData(result.result);
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getCustomers() {
    try {
      const endpoint = "/customer";
      const { result } = await getData(endpoint);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateData() {
    try {
      const data = await getCustomers();
      setCustomerData(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function createCustomer(body, id: number) {
    try {
      const endpoint = `/customer/${id}`;
      const result = await postData(endpoint, body);
      if (result.response) {
        return result.response.data;
      } else {
        setCustomerData(result.result);
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <customerContext.Provider
      value={{ updateData, customerData, createCustomer, deleteCustomer }}
    >
      {children}
    </customerContext.Provider>
  );
};

export { customerContext, CustomerContextProvider };
