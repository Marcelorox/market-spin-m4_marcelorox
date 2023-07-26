import express from "express";
import {
  createProduct,
  readProducts,
  readProductsById,
  patchProductById,
} from "./logics";
import { verifyProductAlreadyExists, verifyProductId } from "./middlewares";

const app = express();

app.use(express.json());

app.post("/products", verifyProductAlreadyExists, createProduct);

app.get("/products", readProducts);

app.get("/products/:id", verifyProductId, readProductsById);

app.patch("/products/:id", verifyProductId, patchProductById);

app.listen(3000, () => {
  console.log("Server is runnig in port 3000");
});
