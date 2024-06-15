import express from "express";
import AdminControlller from "../controllers/adminControlller";

const AdminRoutes = express.Router();

AdminRoutes.post("/", AdminControlller.create);
AdminRoutes.post("/login", AdminControlller.login);

export default AdminRoutes;
