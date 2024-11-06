import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT;
const host = process.env.HOST;

//-------------- MIDDLEWARES ---------------//
app.use(express.json());

// Configure CORS
app.use(
  cors({
    origin: "https://jesselessa-weather-app-react-tailwind.netlify.app",
    methods: ["GET"],
    optionsSuccessStatus: 204, // 204 = success but server doesn't return any data in response (contrary to status code 200)
  })
);

//---------------- ROUTES ------------------//

//* Get data from any city
app.get("/data/:city", (req, res) => {
  const city = req.params.city;
  const apiKey = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => res.json(data))
    .catch((error) => {
      console.log(error);
      return res.json(error);
    });
});

//* Handle errors
app.get("*", (_req, res) => {
  res.json({ error: "Error 404 - Not found" });
});

//------------- START SERVER ---------------//
app.listen(PORT, () => {
  console.log(`Server listening at http://${host}:${PORT}`);
});
