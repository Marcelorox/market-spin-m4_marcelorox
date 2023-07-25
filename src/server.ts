import { uuid } from "uuidv4";
import express from "express";

const app = express();

app.use(express.json());

app.post("/", (req, res) => {
  console.log(req.body);

  const newUser = {
    id: uuid(),
    ...req.body,
  };

  return res.status(201).json(newUser);
});

app.listen(3000, () => {
  console.log("Server is runnig in port 3000");
});
