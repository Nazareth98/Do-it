import express from "express";
import TicketControlller from "../controllers/ticketControlller";
import upload from "../configs/multer";

const TicketRoutes = express.Router();

TicketRoutes.get("/", TicketControlller.getAll);
TicketRoutes.get("/:id", TicketControlller.getById);
TicketRoutes.get("/download/:filename", TicketControlller.getFile);
TicketRoutes.post("/", upload.array("attachments"), TicketControlller.create);
TicketRoutes.post(
  "/note/:id",
  upload.array("attachments"),
  TicketControlller.addNote
);

TicketRoutes.put("/:id", TicketControlller.updateStatus);

// TicketRoutes.delete("/:id", TicketControlller.deleteById);

export default TicketRoutes;
