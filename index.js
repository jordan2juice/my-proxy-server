require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable all CORS requests
app.use(cors());
app.get("/", async (req, res) => {
  res.json({ message: "Waking up server." });
});

app.get("/search", async (req, res) => {
  try {
    // Extract query parameters from client request
    const { query } = req.query;

    // Define Spoonacular API URL
    const spoonacularAPI = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}&query=${query}`;

    // Forward request to Spoonacular API
    const response = await axios.get(spoonacularAPI);

    // Send back the data received from Spoonacular API to the client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error("Error while calling Spoonacular API:", error);
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
