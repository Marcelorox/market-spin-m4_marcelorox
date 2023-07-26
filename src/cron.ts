import { Product } from "./interfaces";
import { market } from "./database";
import { schedule } from "node-cron";

export function verifyProductExpiration() {
  const currentDate = new Date();

  const updatedMarket = market.filter(
    (product) => product.expirationDate > currentDate
  );

  market.length = 0;
  market.push(...updatedMarket);
}

schedule("0 1 * * *", () => {
  verifyProductExpiration();
});
