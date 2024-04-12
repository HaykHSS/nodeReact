import mongoose from "mongoose";
import express from "express";
import path from "path";
import errorHandler from "./src/middlewares/error-handler";
import authRouter from "./src/auth/auth.router";
import productRouter from "./src/product/product.router";
import purchaseRouter from "./src/purchase/purchase.router";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const staticFilesPath = path.join(__dirname, "src", "ui", "dist");
const indexPath = path.join(staticFilesPath, "index.html");

const app = express();
app.use(express.json());

app.use(express.static(staticFilesPath));

// app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/purchase", purchaseRouter);

app.get("*", (req, res) => {
  res.sendFile(indexPath, (err) => {
    if (err) {
      // Handle error
      console.error("Error sending index.html:", err);
      res.status(500).send("Internal Server Error");
    }
  });
});

app.use(errorHandler);

const start = (): void => {
  app.listen(PORT, async () => {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Server started on port ${PORT}`);
  });
};

start();
