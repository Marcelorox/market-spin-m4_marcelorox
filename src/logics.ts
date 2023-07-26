import { Request, Response } from "express";
import { market } from "./database";
import { Product } from "./interfaces";
import { randomUUID } from "node:crypto";

let id = 1;

const createProduct = (request: Request, response: Response) => {
  const newClient: Omit<Product, "id" | "expirationDate"> = request.body;

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 365);

  const newProduct: Product = {
    id: id,
    expirationDate: expirationDate,
    ...newClient,
  };
  id++;
  market.push(newProduct);

  return response.status(201).json(newProduct);
};

const readProducts = (request: Request, response: Response) => {
  const totalPrice = market.reduce(
    (total, product) => total + product.price,
    0
  );

  return response.status(200).json({ total: totalPrice, products: market });
};

const readProductsById = (request: Request, response: Response) => {
  const productFind = market.find(
    (product) => product.id === Number(request.params.id)
  );

  return response.status(200).json(productFind);
};

const patchProductById = (request: Request, response: Response) => {
  const productId = request.params.id;
  const updatedProductData = request.body;

  const productFind = market.findIndex(
    (product) => product.id === Number(productId)
  );

  if (productFind === -1) {
    return response.status(404).json({ message: "Produto não encontrado." });
  }

  market[productFind] = {
    ...market[productFind],
    ...updatedProductData,
  };
  const productPatch = market.find(
    (product) => product.id === Number(productId)
  );

  return response.status(200).json(productPatch);
};

const deleteProductById = (request: Request, response: Response) => {
  const productId = request.params.id;

  const productFind = market.findIndex(
    (product) => product.id === Number(productId)
  );

  if (productFind === -1) {
    return response.status(404).json({ message: "Produto não encontrado." });
  }

  market.splice(productFind, 1);

  return response.status(204).json({ message: "deleted with successfull" });
};

export {
  createProduct,
  readProducts,
  readProductsById,
  patchProductById,
  deleteProductById,
};
