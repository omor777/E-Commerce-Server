import express from "express";
import connectDb from "./db.js";
import { authenticate } from "./middleware/authenticate.js";
import routes from "./routes/index.js";
const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded());

app.use(routes);

app.get("/", (req, res) => {
  
  console.log(req.body);
  res.json({ success: true });
});

app.get("/api/v1/private", authenticate, (req, res) => {
  res.json({ message: "private route" });
});
app.get("/api/v1/public", (_req, res) => {
  res.json({ message: "public route" });
});

app.use((err, _req, res, _next) => {
  console.log(err, "global------------------->");
  const message = err.message ? err.message : "Server Error Occurred";
  const status = err.status ? err.status : 500;
  return res.status(status).json({ message });
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
