import React, { useContext, useEffect, useState, useRef } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import moment from "moment";
Modal.setAppElement("#root");

import IconTask from "../../../assets/svg/iconTask";
import { ticketContext } from "../../../contexts/ticketContext";
import CustomButton from "../../shared/customButton";
import IconPause from "../../../assets/svg/iconPause";
import IconCancel from "../../../assets/svg/iconCancel";
import IconPerson from "../../../assets/svg/iconPerson";
import CustomInput from "../../shared/customInput";
import IconAdd from "../../../assets/svg/iconAdd";
import IconWarning from "../../../assets/svg/iconWarning";
import { authContext } from "../../../contexts/authContext";
import IconClip from "../../../assets/svg/iconClip";
import { getFileName, getFileNameWithoutSuffix } from "../../../utils/generals";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Cor do overlay
  },
  content: {
    width: "800px",
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

const DetailsModal = ({ ticketData, isOpen, setIsOpen }) => {
  if (!ticketData) return null;
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});

  const { user } = useContext(authContext);
  const { getTicketById, createNote, updateTicketStatus, downloadFile } =
    useContext(ticketContext);

  const [ticketDetails, setTicketDetails] = useState();

  // Criação da referência para o container com overflow
  const notesContainerRef = useRef(null);

  function closeModal() {
    setIsOpen(false);
  }

  async function handleUpdateStatus(status: string) {
    try {
      const id = ticketData.id;
      const result = await updateTicketStatus(id, status);
      alert(result.message);
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleCreateNote(data) {
    try {
      const formData = new FormData();
      formData.append("content", data.content);
      selectedFiles.forEach((file) => {
        formData.append("attachments", file);
      });
      const ticketId = ticketData.id;
      const result = await createNote(formData, ticketId);
      setTicketDetails(result);
      reset();
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    async function loadData() {
      const id = ticketData.id;
      const data = await getTicketById(id);
      setTicketDetails(data);
    }

    if (ticketData) {
      loadData();
    }
  }, [ticketData]);

  // useEffect para rolar até o final quando os notes forem atualizados
  useEffect(() => {
    if (notesContainerRef.current) {
      notesContainerRef.current.scrollTop =
        notesContainerRef.current.scrollHeight;
    }
  }, [ticketDetails?.notes]);

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

  async function handleDownload({ currentTarget }) {
    const fileName = currentTarget.id;

    const response = await downloadFile(fileName);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div
        className={`w-full flex items-center gap-2 justify-between theme-${user.type}`}
      >
        <div className="flex items-center gap-2">
          <IconTask width="40px" fill="fill-primary" />
          <h3 className="font-heading font-semibold text-gray-50 text-2xl">
            {ticketDetails?.memberName}
          </h3>
        </div>
        <span className="text-primary font-semibold">
          {ticketDetails?.customerName}
        </span>
      </div>

      <div className={`w-full h-[150px] flex theme-${user.type}`}>
        {user.type === "member" ? (
          <>
            <div className="flex flex-col gap-2 w-4/6">
              <h3 className="text-lg text-gray-200 font-heading font-semibold">
                Descrição
              </h3>
              <p className="text-gray-400">{ticketDetails?.description}</p>
            </div>
            <div className=" flex flex-col gap-2 w-2/6">
              <h3 className="text-lg text-gray-200 font-heading font-semibold">
                Anexos
              </h3>
              <div className=" rounded-lg h-full overflow-y-auto flex flex-col items-start gap-4">
                {ticketDetails?.attachments.map((item) => (
                  <div
                    id={getFileName(item.path)}
                    onClick={handleDownload}
                    className="flex p-1 rounded-lg bg-gray-800 cursor-pointer text-gray-500 border border-gray-700 transition-all hover:text-gray-400 hover:bg-gray-700"
                  >
                    <IconClip width="15px" fill="fill-gray-500" />
                    <span className="text-xs">
                      {getFileNameWithoutSuffix(item.path)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2 w-3/6">
              <h3 className="text-lg text-gray-200 font-heading font-semibold">
                Descrição
              </h3>
              <p className="text-gray-400">{ticketDetails?.description}</p>
            </div>
            <div className=" flex flex-col gap-2 w-2/6">
              <h3 className="text-lg text-gray-200 font-heading font-semibold">
                Anexos
              </h3>
              <div className="rounded-lg h-full overflow-y-auto p-2 flex flex-col gap-2">
                {ticketDetails?.attachments.map((item) => (
                  <div
                    id={getFileName(item.path)}
                    onClick={handleDownload}
                    className="flex p-1 rounded-lg bg-gray-800 cursor-pointer text-gray-500 border border-gray-700 transition-all hover:text-gray-400 hover:bg-gray-700"
                  >
                    <IconClip width="15px" fill="fill-gray-500" />
                    <span className="text-xs">
                      {getFileNameWithoutSuffix(item.path)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/6 flex flex-col items-end gap-3">
              {ticketDetails?.status === "CANCELADO" ? null : (
                <CustomButton
                  onClick={() => handleUpdateStatus("CANCELADO")}
                  theme="danger"
                >
                  <IconCancel width="25px" fill="fill-red-950" />
                </CustomButton>
              )}

              {ticketDetails?.status === "EM PAUSE" ? null : (
                <CustomButton
                  onClick={() => handleUpdateStatus("EM PAUSE")}
                  theme="alternate"
                >
                  <IconPause width="25px" fill="fill-blue-950" />
                </CustomButton>
              )}

              {ticketDetails?.status === "PENDENTE" ? null : (
                <CustomButton
                  onClick={() => handleUpdateStatus("PENDENTE")}
                  theme="attention"
                >
                  <IconWarning width="25px" fill="fill-yellow-950" />
                </CustomButton>
              )}

              {ticketDetails?.status === "FINALIZADO" ? null : (
                <CustomButton onClick={() => handleUpdateStatus("FINALIZADO")}>
                  <IconTask width="25px" fill="fill-dark" />
                </CustomButton>
              )}
            </div>
          </>
        )}
      </div>

      <div
        ref={notesContainerRef}
        className={`w-full h-[300px] overflow-y-auto flex flex-col gap-4 bg-gray-950 border-2 border-gray-800 rounded-lg p-2 theme-${user.type}`}
      >
        {ticketDetails?.notes.map((note, index) => (
          <div
            key={index}
            className="text-gray-700 flex flex-col gap-2 p-4 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <IconPerson
                  width="20px"
                  fill={
                    note.userType === "admin" ? "fill-gray-700" : "fill-primary"
                  }
                />
                <p className="text-sm">
                  <span className="font-bold text-gray-500">
                    {note.authorName}
                  </span>{" "}
                  adicionou
                </p>
              </div>
              <span className="text-sm text-gray-700 font-semibold">
                {moment(note.createdAt).format("LLL")}
              </span>
            </div>
            <div className="w-full">
              <p className="pl-2 text-gray-200 ">{note.content}</p>
            </div>
            <div className="w-full flex items-center gap-2">
              {note.attachments.map((item) => (
                <div
                  id={getFileName(item.path)}
                  onClick={handleDownload}
                  className="flex p-1 rounded-lg bg-gray-800 cursor-pointer text-gray-500 border border-gray-700 transition-all hover:text-gray-400 hover:bg-gray-700"
                >
                  <IconClip width="15px" fill="fill-gray-500" />
                  <span className="text-xs">
                    {getFileNameWithoutSuffix(item.path)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={`w-full h-12 theme-${user.type}`}>
        <form
          onSubmit={handleSubmit(handleCreateNote)}
          className="flex items-start gap-4"
        >
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
              <IconClip width="25px" fill="fill-gray-700" />
              anexo
            </label>
            {errors.attachments && (
              <p className="text-red-500 text-sm">
                {errors.attachments.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <CustomInput
              register={register("content", { required: true })}
              placeholder="Escreva um comentário.."
            />
            {errors.content && (
              <span className="text-red-500 text-sm">
                {errors.content.message}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <CustomButton>
              <IconAdd type="submit" fill="fill-dark" />
              Comentar
            </CustomButton>
          </div>
        </form>
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedFiles &&
            selectedFiles.map((file, index) => (
              <div
                key={index}
                onClick={() => removeFile(index)}
                className="flex items-center justify-center bg-gray-800 text-gray-300 border-2 border-gray-700 rounded-lg p-2 cursor-pointer"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="h-20 w-20 object-cover"
                />
              </div>
            ))}
        </div>
      </div>
    </Modal>
  );
};

export default DetailsModal;
