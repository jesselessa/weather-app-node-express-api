import * as dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();
const port = process.env.PORT;

//-------------- MIDDLEWARES ---------------//

//---------------- ROUTES ------------------//

//------------- START SERVER ---------------//
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
