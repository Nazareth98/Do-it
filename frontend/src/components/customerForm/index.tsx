import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import IconAdd from "../../assets/svg/iconAdd";
import CustomInput from "../shared/customInput";
import CustomButton from "../shared/customButton";
import { customerContext } from "../../contexts/customerContext";
import { authContext } from "../../contexts/authContext";

const customerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
});

type CustomerSchema = z.infer<typeof customerSchema>;

const CustomerForm = () => {
  const { createCustomer } = useContext(customerContext);
  const { user } = useContext(authContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerSchema>({
    resolver: zodResolver(customerSchema),
  });

  async function handleAdd(data: CustomerSchema) {
    try {
      const id = user.id;
      const result = await createCustomer(data, id);
      if (result.status !== 201) {
        alert(result.message);
      } else {
        alert(result.message);
      }
      reset();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="w-[300px] flex flex-col gap-6">
      <h3 className="text-gray-300 font-heading font-semibold flex items-center gap-2">
        <IconAdd width="20px" fill="fill-primary" />
        Adicione um cliente
      </h3>

      <form onSubmit={handleSubmit(handleAdd)} className="flex flex-col gap-2">
        <div>
          <CustomInput
            placeholder="Cliente.."
            register={register("name", { required: true })}
            label="Nome"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>
        <div className="mt-6 flex justify-center">
          <CustomButton type="submit">
            <IconAdd fill="fill-dark" />
            adicionar
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
