import { Request, Response } from "express";
import { market } from "./database";
import { Product } from "./interfaces";
import { randomUUID } from "node:crypto";

const createProduct = (request: Request, response: Response): Response => {
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

const readProduct = (request: Request, response: Response): Response => {
  return response.status(200).json(market);
};

export { createProduct, readProduct };
