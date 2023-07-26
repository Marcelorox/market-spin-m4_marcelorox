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
    return res.status(409).json({ message: "Product already registered." });
  }

  return next();
};

const verifyProductId = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const productExists = market.find(
    (product) => product.id === Number(req.params.id)
  );

  if (!productExists) {
    return res.status(404).json({ message: "Product not found." });
  }

  return next();
};
const verifyProductName = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const productExists = market.find(
    (product) => product.name === req.body.name
  );

  if (productExists) {
    return res.status(409).json({ message: "Product already registered." });
  }

  return next();
};

export { verifyProductAlreadyExists, verifyProductId, verifyProductName };
