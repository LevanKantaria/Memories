import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from './routes/posts.js'

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
app.use('/posts',postRoutes)

const CONNECTION_URL =
"mongodb+srv://123:123@cluster0.q2hsj3i.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {  useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log("server running on port" + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
