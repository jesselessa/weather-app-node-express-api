import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

//-------------- MIDDLEWARES ---------------//
app.use(cors());

//---------------- ROUTES ------------------//

//* Get data from any city
app.get("/data/:city", (req, res) => {
  const city = req.params.city;
  const apiKey = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error - Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.json({ error: "Error fetching data from OpenWeatherMap API" });
    });
});

//* Handle errors
app.get("*", (_req, res) => {
  res.json({ error: "Error 404 - Page not found" });
});

//------------- START SERVER ---------------//
app.listen(port, () => {
  console.log(`Server listening at http://${host}:${port}`);
});
