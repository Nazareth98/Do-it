import React, { useContext, useState, useEffect } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";

import { authContext } from "../../../contexts/authContext";
import { ticketContext } from "../../../contexts/ticketContext";
import IconTask from "../../../assets/svg/iconTask";
import CustomTextarea from "../../shared/customTextarea";
import CustomSelect from "../../shared/customSelect";
import { customerContext } from "../../../contexts/customerContext";
import CustomButton from "../../shared/customButton";
import IconAdd from "../../../assets/svg/iconAdd";
import IconClip from "../../../assets/svg/iconClip";

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Cor do overlay
  },
  content: {
    width: "400px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    alignItems: "center",
    padding: "40px",
    backgroundColor: "#1D1F1D",
    border: "2px solid #313330",
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    borderRadius: ".5rem",
  },
};

const ModalCreate = ({ isOpen, setIsOpen }) => {
  const { user } = useContext(authContext);
  const { customerData } = useContext(customerContext);
  const { createTicket } = useContext(ticketContext);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      const formData = new FormData();
      formData.append("description", data.description);
      formData.append("customerId", data.customerId);
      selectedFiles.forEach((file) => {
        formData.append("attachments", file);
      });
      const result = await createTicket(formData);
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

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    setValue("attachments", [...selectedFiles, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      setValue("attachments", newFiles);
      return newFiles;
    });
  };

  useEffect(() => {
    // Limpar arquivos ao desmontar o componente
    return () => {
      selectedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
      setSelectedFiles([]);
    };
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
    >
      <div
        className={`w-full flex items-center gap-2 justify-between theme-${user.type}`}
      >
        <div className="flex items-center gap-2">
          <IconTask width="40px" fill="fill-primary" />
          <h3 className="font-heading font-semibold text-gray-50 text-2xl">
            Adicione um Ticket
          </h3>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`w-full flex flex-col gap-4 theme-${user.type}`}
      >
        <div>
          <CustomTextarea
            placeholder="Descreva sua solicitação"
            register={register("description", { required: true })}
            label="Descrição"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>
        <div className={`w-full flex flex-col theme-${user.type}`}>
          <CustomSelect
            label="Selecione um cliente"
            options={customerData}
            register={register}
            name="customerId"
          />
          {errors.customerId && (
            <span className="text-red-500 text-sm">
              {errors.customerId.message}
            </span>
          )}
        </div>

        <div>
          <input
            id="attachments"
            type="file"
            multiple
            {...register("attachments")}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label
            htmlFor="attachments"
            className="custom-file-upload rounded-lg flex items-center gap-2 bg-gray-800 text-gray-300 border-2 border-gray-700 hover:border-primary"
          >
            <IconClip fill="fill-gray-700" />
            Adicionar anexo
          </label>
          {errors.attachments && (
            <p className="text-red-500 text-sm">{errors.attachments.message}</p>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-center bg-gray-800 text-gray-300 border-2 border-gray-700 rounded-lg p-2 cursor-pointer"
              onClick={() => removeFile(index)}
            >
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="h-20 w-20 object-cover"
              />
            </div>
          ))}
        </div>

        <CustomButton type="submit">
          <IconAdd fill="fill-dark" />
          adicionar
        </CustomButton>
      </form>
    </Modal>
  );
};

export default ModalCreate;
