import express from "express";
import CustomerController from "../controllers/customerController";

const CustomerRoutes = express.Router();

CustomerRoutes.post("/:id", CustomerController.create);
CustomerRoutes.get("/", CustomerController.getAll);
CustomerRoutes.delete("/:id", CustomerController.deleteById);

export default CustomerRoutes;
