import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 5000;
const host = process.env.HOST;

//-------------- MIDDLEWARE ---------------//
app.use(
  cors({
    origin: "https://jesselessa-weather-app-react-tailwind.netlify.app",
    methods: "GET",
    optionsSuccessStatus: 204,
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
  res.json({ error: "Error 404 - Page not found" });
});

//------------- START SERVER ---------------//
app.listen(PORT, () => {
  console.log(`Server listening at http://${host}:${PORT}`);
});
