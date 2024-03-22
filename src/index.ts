import express from "express";

const app = express();

const port = process.env.PORT || 4568;

app.get("/ping", (req, res) => {
  return res.send("pong");
});

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
