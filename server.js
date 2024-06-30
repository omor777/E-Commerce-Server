import express from "express";
import connectDb from "./db.js";
import routes from "./routes/index.js";
const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

app.use(routes);

app.get("/", (_req, res) => {
  res.json({ success: true });
});

app.use((err, _req, res, _next) => {
  console.log(err);
  const message = err.message ? err.message : "Server Error Occurred";
  const status = err.status ? err.status : 500;
  res.status(status).json({ message });
});

connectDb("mongodb://localhost:27017/e-commerce-db")
  .then(() => {
    console.log("connect to db");
    app.listen(port, () => {
      console.log("Server is running on port " + port);
    });
  })
  .catch((e) => {
    console.log(e);
  });
