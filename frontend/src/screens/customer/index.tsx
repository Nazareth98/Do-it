import React, { useContext, useEffect } from "react";
import { authContext } from "../../contexts/authContext";
import ScreenTitle from "../../components/shared/screenTitle";
import CustomerForm from "../../components/customerForm";
import CustomerList from "../../components/customerList";
import { customerContext } from "../../contexts/customerContext";

const ScreenCustomer = () => {
  const { updateData } = useContext(customerContext);
  const { user } = useContext(authContext);

  useEffect(() => {
    function lodaData() {
      updateData();
    }

    lodaData();
  }, []);

  return (
    <div
      className={`fade-left w-full pl-12 pt-8 pr-8 pb-8 flex flex-col gap-8 h-[814px] overflow-y-auto theme-${user.type}`}
    >
      <ScreenTitle>
        Gerencie seus <span className="text-primary">Clientes</span>
      </ScreenTitle>
      <div className="w-full flex gap-8">
        <CustomerForm />
        <CustomerList />
      </div>
    </div>
  );
};

export default ScreenCustomer;
