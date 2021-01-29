import express from "express";
import bodyParser from "body-parser";
import { indexRouter } from "./routes";

const app = express();
app.use(bodyParser.json({ type: "*/*" }));

app.get("/api/ping", (_, res) => {
  res.status(200).send({ pong: true });
});

app.use(indexRouter);

app.get("*", (_, res) => {
  res.status(400).send({ error: "Not Found" });
});

export { app };
