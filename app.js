import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";

const app = express();

app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);


mongoose
  .connect(
    "mongodb+srv://admin:llEjNsMLtYhVLNk6@cluster0.grcvxu6.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() => console.log("connected to database and listening on port 5000"))
  .catch((err) => console.log(err));
