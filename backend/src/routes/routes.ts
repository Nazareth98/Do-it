import express from "express";
import AdminRoutes from "./adminRoutes";
import MemberRoutes from "./memberRoutes";
import AuthController from "../controllers/authController";
import TicketRoutes from "./ticketRoutes";
import CustomerRoutes from "./customerRoutes";

const Routes = express.Router();

Routes.use("/admin", AdminRoutes);
Routes.use("/member", MemberRoutes);
Routes.use("/customer", AuthController.verifyToken, CustomerRoutes);
Routes.use("/ticket", AuthController.verifyToken, TicketRoutes);

export default Routes;
