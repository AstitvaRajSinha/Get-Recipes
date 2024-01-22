const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index.ejs", { data: "API Response." });
});
app.post("/", async function (req, res) {
    try {
      const ingredients = req.body.ingredients;
      console.log(ingredients);
      const number = req.body.number;
      console.log(number);
      const ignorePantry = req.body.ignorePantry;
      console.log(ignorePantry);
      const url =
        "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" +
        ingredients +
        "&number=" +
        number +
        "&ignorePantry=" +
        ignorePantry +
        "&apiKey=0e70170c98034ae7894c243f460040ad";
      const response = await axios.get(url);
      const result = response.data;
      res.render("new.ejs", {
        data: result,
      });

    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("new.ejs", {
        error: "no activities that match",
      });
    

  }


});

// app.get("/", async (req, res) => {
//     try {
//       const response = await axios.get(url);
//       console.log(response);
//       const result = response;
//       console.log(result);
//       res.render("index.ejs", { data: JSON.stringify(result) });
//     } catch (error) {
//       console.error("Failed to make request:", error.message);
//       res.render("index.ejs", {
//         error: error.message,
//       });
//     }
//   });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
