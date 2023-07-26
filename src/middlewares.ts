import { NextFunction, Request, Response } from "express";
import { market } from "./database";
import { Product } from "./interfaces";

const verifyProductAlreadyExists = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const newProduct: Product = req.body;

  const productExists = market.some(
    (product) => product.name === newProduct.name
  );

  if (productExists) {
    return res.status(409).json({ error: "Product already registered." });
  }

  return next();
};

const verifyProductId = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const productExists = market.find((product) => product.id === req.params.id);

  if (!productExists) {
    return res.status(404).json({ error: "Product not found." });
  }

  return next();
};

export { verifyProductAlreadyExists, verifyProductId };
