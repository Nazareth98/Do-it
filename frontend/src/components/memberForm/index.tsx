import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import IconAdd from "../../assets/svg/iconAdd";
import CustomInput from "../shared/customInput";
import CustomButton from "../shared/customButton";
import { useContext, useState } from "react";
import IconVisibilityOff from "../../assets/svg/iconVisibilityOff";
import IconVisibilityOn from "../../assets/svg/iconVisibilityOn";
import { memberContext } from "../../contexts/memberContext";

const memberSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
  confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  username: z.string().min(1, "Nome de usuário é obrigatório"),
});

type MemberSchema = z.infer<typeof memberSchema>;

const MemberForm = () => {
  const { createMember } = useContext(memberContext);
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberSchema>({
    resolver: zodResolver(memberSchema),
  });

  const handleChangeVisibility = () => {
    setIsVisible(!isVisible);
  };

  async function handleAdd(data: MemberSchema) {
    try {
      const result = await createMember(data);
      if (result.status !== 201) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="w-[300px] flex flex-col gap-6">
      <h3 className="text-gray-300 font-heading font-semibold flex items-center gap-2">
        <IconAdd width="20px" fill="fill-primary" />
        Adicione um membro
      </h3>
      <form onSubmit={handleSubmit(handleAdd)} className="flex flex-col gap-2">
        <div>
          <CustomInput
            register={register("name", { required: true })}
            label="Nome"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>
        <div>
          <CustomInput
            label="Senha"
            type={isVisible ? "text" : "password"}
            register={register("password", { required: true })}
            icon={
              isVisible ? (
                <IconVisibilityOn
                  width="25px"
                  fill="cursor-pointer transition fill-gray-600 hover:fill-gray-500"
                  onClick={handleChangeVisibility}
                />
              ) : (
                <IconVisibilityOff
                  width="25px"
                  fill="cursor-pointer transition fill-gray-600 hover:fill-gray-500"
                  onClick={handleChangeVisibility}
                />
              )
            }
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        <div>
          <CustomInput
            label="Confirmar Senha"
            type={isVisible ? "text" : "password"}
            register={register("confirmPassword", { required: true })}
            icon={
              isVisible ? (
                <IconVisibilityOn
                  width="25px"
                  fill="cursor-pointer transition fill-gray-600 hover:fill-gray-500"
                  onClick={handleChangeVisibility}
                />
              ) : (
                <IconVisibilityOff
                  width="25px"
                  fill="cursor-pointer transition fill-gray-600 hover:fill-gray-500"
                  onClick={handleChangeVisibility}
                />
              )
            }
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <div>
          <CustomInput
            label="Nome de usuário"
            register={register("username", { required: true })}
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
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

export default MemberForm;
