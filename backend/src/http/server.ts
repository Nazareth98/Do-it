import express from "express";
import Routes from "../routes/routes";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3999;

app.use(express.json());
app.use(cors());

app.use("/api", Routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
