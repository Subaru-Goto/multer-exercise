import "dotenv/config";
import express from "express";
import { profileRouter } from "./routes/profilePic.js";
import { catRouter } from "./routes/catPic.js";
import { picsRouter } from "./routes/allPics.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = 8001;

app.use(express.static("public"));
app.use("/upload-profile-pic", profileRouter);
app.use("/upload-cat-pics", catRouter);
app.use("/get-pics", picsRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

