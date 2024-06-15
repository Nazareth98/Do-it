import React, { useContext } from "react";
import { customerContext } from "../../contexts/customerContext";
import IconList from "../../assets/svg/iconList";
import IconPerson from "../../assets/svg/iconPerson";
import IconTask from "../../assets/svg/iconTask";
import IconDelete from "../../assets/svg/iconDelete";

const CustomerList = () => {
  const { customerData, deleteCustomer } = useContext(customerContext);

  async function handleDelete({ currentTarget }) {
    try {
      const id = currentTarget.id;
      const result = await deleteCustomer(id);
      if (result.status !== 200) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-gray-300 font-heading font-semibold flex items-center gap-2">
        <IconList width="20px" fill="fill-primary" />
        Seus clientes
      </h3>
      <div className="flex flex-col gap-2">
        {customerData?.map((member) => (
          <div className=" border-2 border-gray-800 p-4 rounded-lg grid grid-cols-12 gap-6">
            <div className="col-span-2 flex items-center justify-center">
              <div className="bg-dark p-2 rounded-full border-2 border-medium">
                <IconPerson fill="fill-medium" width="20px" />
              </div>
            </div>
            <div className="flex items-center gap-1 col-span-8">
              <h4 className="text-lg font-heading font-semibold text-gray-300">
                {member.name}
              </h4>
            </div>
            <div className="flex items-center justify-center col-span-2">
              <IconDelete
                id={member.id}
                onClick={handleDelete}
                width="25px"
                fill="fill-red-700 hover:fill-red-600 cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerList;
