import express from "express";
import { createProduct } from "./logics";

const app = express();

app.use(express.json());

app.post("/products", createProduct);

app.listen(3000, () => {
  console.log("Server is runnig in port 3000");
});
