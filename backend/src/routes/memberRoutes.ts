import express from "express";
import MemberControlller from "../controllers/memberControlller";
import AuthController from "../controllers/authController";

const MemberRoutes = express.Router();

MemberRoutes.post("/", AuthController.verifyToken, MemberControlller.create);

MemberRoutes.get("/", AuthController.verifyToken, MemberControlller.getAll);
MemberRoutes.delete(
  "/:id",
  AuthController.verifyToken,
  MemberControlller.deleteById
);

MemberRoutes.post("/login", MemberControlller.login);

export default MemberRoutes;
