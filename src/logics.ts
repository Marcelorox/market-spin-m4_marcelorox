import { Request, Response } from "express";
import { market } from "./database";
import { Product } from "./interfaces";
import { randomUUID } from "node:crypto";

const createProduct = (request: Request, response: Response) => {
  const newClient: Omit<Product, "id" | "expirationDate"> = request.body;

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 365);

  const newProduct: Product = {
    id: randomUUID(),
    expirationDate: expirationDate,
    ...newClient,
  };

  market.push(newProduct);

  return response.status(201).json(newProduct);
};

const readProducts = (request: Request, response: Response) => {
  return response.status(200).json(market);
};

const readProductsById = (request: Request, response: Response) => {
  const productFind = market.find(
    (product) => product.id === request.params.id
  );

  return response.status(200).json(productFind);
};

const patchProductById = (request: Request, response: Response) => {
  const productId = request.params.id;
  const updatedProductData = request.body;

  const productFind = market.findIndex(
    (product) => product.id === request.params.id
  );

  if (productFind === -1) {
    return response.status(404).json({ message: "Produto não encontrado." });
  }

  market[productFind] = {
    ...market[productFind],
    ...updatedProductData,
  };

  return response.status(200).json(productFind);
};

export { createProduct, readProducts, readProductsById, patchProductById };
